"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const CHARCOAL = "#1F2126";
const CHARCOAL_DARK = "#111111";
const GOLD = "#FFC10A";

/* ---------- Wheel — cylinder with gold hub ---------- */
function Wheel({ x, z, speed, radius = 0.42 }: { x: number; z: number; speed: number; radius?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.x -= dt * speed * 8;
  });
  return (
    <group ref={ref} position={[x, radius, z]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.32, 28]} />
        <meshStandardMaterial color={CHARCOAL_DARK} roughness={0.7} metalness={0.25} />
      </mesh>
      {/* Gold hub cap */}
      <mesh position={[0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.03, 18]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[-0.17, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.13, 0.13, 0.03, 18]} />
        <meshStandardMaterial color={GOLD} roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

/* ---------- Embossed X mark texture on container side ---------- */
function useXTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 256;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#1F2126";
    ctx.fillRect(0, 0, c.width, c.height);

    // Subtle horizontal ridges (corrugated look)
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      const y = (i / 18) * c.height;
      ctx.moveTo(0, y);
      ctx.lineTo(c.width, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      const y = (i / 18) * c.height + 1;
      ctx.moveTo(0, y);
      ctx.lineTo(c.width, y);
      ctx.stroke();
    }

    // Embossed X mark — center
    const cx = c.width / 2;
    const cy = c.height / 2;
    const s = 70;
    // Outer X charcoal (lighter for emboss)
    ctx.strokeStyle = "#E4E2DD";
    ctx.lineWidth = 4;
    ctx.lineCap = "square";
    // Top V
    ctx.beginPath();
    ctx.moveTo(cx - s, cy - s);
    ctx.lineTo(cx, cy + s * 0.4);
    ctx.lineTo(cx + s, cy - s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.6, cy - s);
    ctx.lineTo(cx, cy + s * 0.15);
    ctx.lineTo(cx + s * 0.6, cy - s);
    ctx.stroke();
    // Gold top inner chevron
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.3, cy - s);
    ctx.lineTo(cx, cy - s * 0.45);
    ctx.lineTo(cx + s * 0.3, cy - s);
    ctx.stroke();
    // Bottom V
    ctx.strokeStyle = "#E4E2DD";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - s, cy + s);
    ctx.lineTo(cx, cy - s * 0.4);
    ctx.lineTo(cx + s, cy + s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.6, cy + s);
    ctx.lineTo(cx, cy - s * 0.15);
    ctx.lineTo(cx + s * 0.6, cy + s);
    ctx.stroke();
    // Gold bottom inner chevron
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.3, cy + s);
    ctx.lineTo(cx, cy + s * 0.45);
    ctx.lineTo(cx + s * 0.3, cy + s);
    ctx.stroke();

    // "GROUP" wordmark
    ctx.fillStyle = "#E4E2DD";
    ctx.font = "bold 38px Poppins, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("GROUP", cx + s + 28, cy);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------- The full truck rig ---------- */
function Truck({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const tex = useXTexture();

  // Idle suspension bob
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 6) * 0.012;
  });

  // Materials
  const matCharcoal = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CHARCOAL, roughness: 0.6, metalness: 0.35 }),
    []
  );
  const matCharcoalDark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CHARCOAL_DARK, roughness: 0.7, metalness: 0.4 }),
    []
  );
  const matContainerSide = useMemo(
    () => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.2 }),
    [tex]
  );
  const matWindow = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#0a0a0c", roughness: 0.15, metalness: 0.9, emissive: "#88aaff", emissiveIntensity: 0.05 }),
    []
  );
  const matHeadlight = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 1.4, roughness: 0.2, metalness: 0.5 }),
    []
  );
  const matGoldStripe = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.5, roughness: 0.4, metalness: 0.6 }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* ===== Container (the trailer body) ===== */}
      <group position={[-1.4, 0.42, 0]}>
        {/* Main body */}
        <mesh material={matContainerSide} position={[0, 1.0, 0]}>
          <boxGeometry args={[5.0, 2.0, 1.8]} />
        </mesh>
        {/* Corner casts (gold) */}
        {[[-2.5, 0.01, 0.9], [2.5, 0.01, 0.9], [-2.5, 2.0, 0.9], [2.5, 2.0, 0.9],
          [-2.5, 0.01, -0.9], [2.5, 0.01, -0.9], [-2.5, 2.0, -0.9], [2.5, 2.0, -0.9]].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} material={matGoldStripe}>
            <boxGeometry args={[0.14, 0.14, 0.14]} />
          </mesh>
        ))}
        {/* Bottom rail */}
        <mesh material={matCharcoalDark} position={[0, 0.04, 0]}>
          <boxGeometry args={[4.95, 0.08, 1.82]} />
        </mesh>
      </group>

      {/* ===== Trailer chassis ===== */}
      <mesh material={matCharcoalDark} position={[-1.4, 0.32, 0]}>
        <boxGeometry args={[5.0, 0.18, 1.5]} />
      </mesh>

      {/* ===== Cab ===== */}
      <group position={[2.0, 0.42, 0]}>
        {/* Main cab body */}
        <mesh material={matCharcoal} position={[0, 1.0, 0]}>
          <boxGeometry args={[1.6, 1.6, 1.8]} />
        </mesh>
        {/* Sloped hood */}
        <mesh material={matCharcoal} position={[1.0, 0.6, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.7, 0.7, 1.7]} />
        </mesh>
        {/* Windshield */}
        <mesh material={matWindow} position={[0.55, 1.35, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.9, 0.7, 1.6]} />
        </mesh>
        {/* Side windows */}
        <mesh material={matWindow} position={[-0.2, 1.4, 0.91]}>
          <boxGeometry args={[1.0, 0.6, 0.02]} />
        </mesh>
        <mesh material={matWindow} position={[-0.2, 1.4, -0.91]}>
          <boxGeometry args={[1.0, 0.6, 0.02]} />
        </mesh>
        {/* Gold stripe along the cab */}
        <mesh material={matGoldStripe} position={[0, 0.55, 0.91]}>
          <boxGeometry args={[1.55, 0.04, 0.005]} />
        </mesh>
        <mesh material={matGoldStripe} position={[0, 0.55, -0.91]}>
          <boxGeometry args={[1.55, 0.04, 0.005]} />
        </mesh>
        {/* Headlights */}
        <mesh material={matHeadlight} position={[1.36, 0.65, 0.6]}>
          <boxGeometry args={[0.04, 0.16, 0.22]} />
        </mesh>
        <mesh material={matHeadlight} position={[1.36, 0.65, -0.6]}>
          <boxGeometry args={[0.04, 0.16, 0.22]} />
        </mesh>
        {/* Grille */}
        <mesh material={matCharcoalDark} position={[1.36, 0.45, 0]}>
          <boxGeometry args={[0.03, 0.3, 1.4]} />
        </mesh>
        {/* Exhaust stacks */}
        <mesh material={matCharcoalDark} position={[-0.5, 2.0, 0.7]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        </mesh>
        <mesh material={matCharcoalDark} position={[-0.5, 2.0, -0.7]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 12]} />
        </mesh>
      </group>

      {/* ===== Wheels ===== */}
      {/* Cab wheels — front + drive */}
      <Wheel x={2.55} z={0.85} speed={progress} />
      <Wheel x={2.55} z={-0.85} speed={progress} />
      <Wheel x={1.45} z={0.85} speed={progress} />
      <Wheel x={1.45} z={-0.85} speed={progress} />
      {/* Trailer wheels */}
      <Wheel x={-2.6} z={0.85} speed={progress} />
      <Wheel x={-2.6} z={-0.85} speed={progress} />
      <Wheel x={-3.4} z={0.85} speed={progress} />
      <Wheel x={-3.4} z={-0.85} speed={progress} />
    </group>
  );
}

/* ---------- Road and ground ---------- */
function Ground({ progress }: { progress: number }) {
  const dashRef = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (dashRef.current) {
      dashRef.current.position.x -= dt * (3 + progress * 8);
      if (dashRef.current.position.x < -3) dashRef.current.position.x += 3;
    }
  });
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[60, 6]} />
        <meshStandardMaterial color="#0a0a0c" roughness={1} />
      </mesh>
      {/* Lane dashes */}
      <group ref={dashRef}>
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh key={i} position={[(i - 15) * 1.5 - 12, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.8, 0.08]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ---------- Scene ---------- */
export default function TruckScene({ progress = 0 }: { progress?: number }) {
  // Truck X position driven by scroll progress: -8 → +8
  const truckX = -8 + progress * 16;
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 2.6, 8.5], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0a0a0c"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 10, 5]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-6, 4, -3]} intensity={0.35} color={GOLD} />
        <hemisphereLight args={["#FFC10A", "#0a0a0c", 0.18]} />

        <Ground progress={progress} />
        <group position={[truckX, 0, 0]}>
          <Truck progress={progress} />
        </group>

        {/* Soft fog to ease the edges */}
        <fog attach="fog" args={["#0a0a0c", 14, 24]} />
      </Suspense>
    </Canvas>
  );
}
