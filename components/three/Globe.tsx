"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- Wireframe sphere with longitude/latitude lines ---------- */
function Wireframe({ radius = 2 }: { radius?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.06;
  });

  const lines = useMemo(() => {
    const arr: Array<{ pts: THREE.Vector3[]; key: string }> = [];
    // Latitude rings
    for (let i = 1; i < 12; i++) {
      const lat = (i / 12 - 0.5) * Math.PI;
      const r = Math.cos(lat) * radius;
      const y = Math.sin(lat) * radius;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r));
      }
      arr.push({ pts, key: `lat-${i}` });
    }
    // Longitude rings
    for (let i = 0; i < 18; i++) {
      const lon = (i / 18) * Math.PI;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(a) * Math.cos(lon) * radius,
            Math.sin(a) * radius,
            Math.cos(a) * Math.sin(lon) * radius
          )
        );
      }
      arr.push({ pts, key: `lon-${i}` });
    }
    return arr;
  }, [radius]);

  return (
    <group ref={ref}>
      {lines.map((l) => (
        <line key={l.key}>
          <bufferGeometry
            attach="geometry"
            onUpdate={(g) => g.setFromPoints(l.pts)}
          />
          <lineBasicMaterial
            attach="material"
            color="#4A4F57"
            transparent
            opacity={0.35}
          />
        </line>
      ))}
    </group>
  );
}

/* ---------- Gold nodes scattered on the surface ---------- */
function Nodes({ radius = 2 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    // 18 deterministic nodes (city-like)
    const cityCoords: Array<[number, number]> = [
      [29.5, -95.4],   // Houston
      [40.7, -74.0],   // NYC
      [25.7, -80.2],   // Miami
      [-23.5, -46.6],  // SP
      [51.9, 4.5],     // Rotterdam
      [45.5, 9.2],     // Milan
      [41.0, 28.9],    // Istanbul
      [25.2, 55.3],    // Dubai
      [19.0, 72.8],    // Mumbai
      [31.2, 121.5],   // Shanghai
      [22.5, 114.1],   // Shenzhen
      [35.7, 139.7],   // Tokyo
      [1.35, 103.8],   // Singapore
      [-33.9, 151.2],  // Sydney
      [55.7, 37.6],    // Moscow
      [-1.3, 36.8],    // Nairobi
      [-34.6, -58.4],  // Buenos Aires
      [37.7, -122.4],  // SF
    ];
    cityCoords.forEach(([lat, lon]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      positions.push(new THREE.Vector3(x, y, z));
    });
    return positions;
  }, [radius]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.06;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#FFC10A" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Animated gold arcs between random node pairs ---------- */
function Arcs({ radius = 2 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pairs = useMemo(() => {
    const pts: Array<[THREE.Vector3, THREE.Vector3]> = [];
    const cities: Array<[number, number]> = [
      [29.5, -95.4], [40.7, -74.0], [25.7, -80.2], [-23.5, -46.6],
      [51.9, 4.5], [45.5, 9.2], [41.0, 28.9], [25.2, 55.3],
      [19.0, 72.8], [31.2, 121.5], [22.5, 114.1], [35.7, 139.7],
    ];
    const toVec = ([lat, lon]: [number, number]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };
    // Deterministic routes
    const routes: Array<[number, number]> = [
      [10, 0], [10, 1], [9, 0], [9, 6], [6, 4], [4, 1], [3, 1], [3, 2], [11, 1], [7, 5], [8, 6],
    ];
    routes.forEach(([a, b]) => {
      pts.push([toVec(cities[a]), toVec(cities[b])]);
    });
    return pts;
  }, [radius]);

  useFrame((_, dt) => {
    if (groupRef.current) groupRef.current.rotation.y += dt * 0.06;
  });

  return (
    <group ref={groupRef}>
      {pairs.map(([a, b], idx) => {
        // Build a curved arc above sphere
        const mid = new THREE.Vector3().lerpVectors(a, b, 0.5);
        const dist = a.distanceTo(b);
        mid.normalize().multiplyScalar(radius + 0.35 + dist * 0.15);
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const points = curve.getPoints(40);
        return (
          <group key={idx}>
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(g) => g.setFromPoints(points)}
              />
              <lineBasicMaterial attach="material" color="#FFC10A" transparent opacity={0.45} />
            </line>
            {/* Traveling particle */}
            <Particle curve={curve} delay={idx * 0.4} />
          </group>
        );
      })}
    </group>
  );
}

function Particle({ curve, delay = 0 }: { curve: THREE.Curve<THREE.Vector3>; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime + delay) % 4) / 4;
    const p = curve.getPoint(t);
    ref.current.position.copy(p);
    const opacity = t < 0.1 || t > 0.9 ? 0 : 1;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshBasicMaterial color="#FFD24A" transparent opacity={1} />
    </mesh>
  );
}

/* ---------- The exported component ---------- */
export default function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <group rotation={[0.25, 0, 0]}>
            <Wireframe radius={2} />
            <Nodes radius={2} />
            <Arcs radius={2} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
