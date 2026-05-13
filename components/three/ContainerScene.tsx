"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const CHARCOAL = "#1F2126";
const CHARCOAL_DEEP = "#0E0E10";
const GOLD = "#FFC10A";

/* ---------- Corrugated normal-ish texture using procedural canvas ---------- */
function useCorrugationTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    // Base color
    ctx.fillStyle = "#1F2126";
    ctx.fillRect(0, 0, c.width, c.height);
    // Soft vertical corrugation gradient bands
    const bandW = 18;
    for (let x = 0; x < c.width; x += bandW) {
      const grad = ctx.createLinearGradient(x, 0, x + bandW, 0);
      grad.addColorStop(0,   "rgba(255,255,255,0.04)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.18)");
      grad.addColorStop(1,   "rgba(255,255,255,0.04)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, bandW, c.height);
    }
    // Top + bottom rails
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, c.width, 10);
    ctx.fillRect(0, c.height - 10, c.width, 10);
    // Faint serial top-right
    ctx.fillStyle = "rgba(255,255,255,0.32)";
    ctx.font = "14px ui-monospace, monospace";
    ctx.textBaseline = "top";
    ctx.fillText("XGR · 2026 · 40FT-HC", c.width - 240, 18);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------- Brand logo loaded from the official PNG ---------- */
function useLogoTexture() {
  const tex = useLoader(THREE.TextureLoader, "/logo-xgroup-white.png");
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
  }, [tex]);
  return tex;
}

/* ---------- Door panel texture: corrugated + locking bars ---------- */
function useDoorTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#1F2126";
    ctx.fillRect(0, 0, c.width, c.height);
    // Vertical corrugation
    const bandW = 14;
    for (let x = 0; x < c.width; x += bandW) {
      const grad = ctx.createLinearGradient(x, 0, x + bandW, 0);
      grad.addColorStop(0,   "rgba(255,255,255,0.04)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.2)");
      grad.addColorStop(1,   "rgba(255,255,255,0.04)");
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, bandW, c.height);
    }
    // Locking bars (real container hardware)
    ctx.fillStyle = "#0a0a0c";
    [120, 372].forEach((x) => {
      ctx.fillRect(x, 50, 14, c.height - 100);
      // Gold handles
      ctx.fillStyle = GOLD;
      ctx.fillRect(x - 6, 200, 26, 14);
      ctx.fillRect(x - 6, 300, 26, 14);
      ctx.fillStyle = "#0a0a0c";
    });

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/* ---------- Curated products inside ---------- */
function Products({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((c, i) => {
      c.position.y = Math.sin(t * 0.7 + i * 1.3) * 0.03 - 0.4;
      c.rotation.y = t * 0.12 + i;
    });
  });

  const items: Array<{ pos: [number, number, number]; size: [number, number, number]; color: string }> = [
    { pos: [-0.9, -0.4, 0],   size: [0.5, 0.5, 0.4], color: "#3a3d44" },
    { pos: [-0.2, -0.4, 0.2], size: [0.28, 0.95, 0.28], color: "#FFC10A" },
    { pos: [0.5, -0.4, -0.1], size: [0.42, 0.42, 0.48], color: "#5a5f67" },
    { pos: [1.0, -0.4, 0.15], size: [0.38, 0.18, 0.45], color: "#FFC10A" },
  ];

  return (
    <group ref={groupRef} visible={visible}>
      {items.map((it, i) => (
        <mesh key={i} position={it.pos} castShadow receiveShadow>
          <boxGeometry args={it.size} />
          <meshStandardMaterial color={it.color} roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Container body + doors ---------- */
function ContainerModel({ open }: { open: boolean }) {
  const corrTex = useCorrugationTexture();
  const doorTex = useDoorTexture();
  const logoTex = useLogoTexture();
  const groupRef = useRef<THREE.Group>(null);
  const doorL = useRef<THREE.Group>(null);
  const doorR = useRef<THREE.Group>(null);

  // Door animation only — no auto-rotate (keeps the logo readable)
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // Subtle breathing bob, no rotation
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.015;
    }
    const target = open ? Math.PI * 0.72 : 0;
    if (doorL.current) {
      doorL.current.rotation.y += (-target - doorL.current.rotation.y) * 0.08;
    }
    if (doorR.current) {
      doorR.current.rotation.y += (target - doorR.current.rotation.y) * 0.08;
    }
  });

  // Real 40ft High Cube: 12.19m × 2.6m × 2.44m
  // Scaled: L 5.6, H 1.4, W 1.32 (approximately to scale)
  const L = 5.6;
  const H = 1.4;
  const W = 1.32;

  // Materials
  const matSide = useMemo(
    () => new THREE.MeshStandardMaterial({ map: corrTex, roughness: 0.68, metalness: 0.35 }),
    [corrTex]
  );
  const matEnds = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CHARCOAL, roughness: 0.75, metalness: 0.3 }),
    []
  );
  const matInside = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CHARCOAL_DEEP, roughness: 0.95, metalness: 0, side: THREE.BackSide }),
    []
  );
  const matDoor = useMemo(
    () => new THREE.MeshStandardMaterial({ map: doorTex, roughness: 0.68, metalness: 0.32 }),
    [doorTex]
  );
  // The logo plane material — uses the actual PNG with alpha
  const matLogo = useMemo(
    () => new THREE.MeshStandardMaterial({
      map: logoTex,
      transparent: true,
      roughness: 0.55,
      metalness: 0.25,
      side: THREE.DoubleSide,
    }),
    [logoTex]
  );
  const matRail = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.4, metalness: 0.6, emissive: GOLD, emissiveIntensity: 0.18 }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Inside walls (so the interior is dark) */}
      <mesh material={matInside} position={[0, H / 2, 0]}>
        <boxGeometry args={[L - 0.04, H - 0.04, W - 0.04]} />
      </mesh>

      {/* TOP — flat charcoal */}
      <mesh position={[0, H, 0]} material={matEnds}>
        <boxGeometry args={[L, 0.03, W]} />
      </mesh>
      {/* BOTTOM */}
      <mesh position={[0, 0.015, 0]} material={matEnds}>
        <boxGeometry args={[L, 0.03, W]} />
      </mesh>

      {/* LONG SIDES — corrugated, both faces same texture */}
      <mesh position={[0, H / 2, W / 2]} material={matSide}>
        <boxGeometry args={[L, H, 0.03]} />
      </mesh>
      <mesh position={[0, H / 2, -W / 2]} material={matSide} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[L, H, 0.03]} />
      </mesh>

      {/* X-GROUP LOGO PLANES — official PNG, slightly proud of the side */}
      <mesh position={[0, H / 2, W / 2 + 0.016]} material={matLogo}>
        <planeGeometry args={[1.8, 0.9]} />
      </mesh>
      <mesh position={[0, H / 2, -W / 2 - 0.016]} rotation={[0, Math.PI, 0]} material={matLogo}>
        <planeGeometry args={[1.8, 0.9]} />
      </mesh>

      {/* BACK WALL (no doors) */}
      <mesh position={[-L / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} material={matSide}>
        <boxGeometry args={[W, H, 0.03]} />
      </mesh>

      {/* DOORS (front end) */}
      <group ref={doorL} position={[L / 2, H / 2, -W / 4]}>
        <mesh position={[0, 0, W / 4]} material={matDoor}>
          <boxGeometry args={[0.03, H * 0.96, W / 2]} />
        </mesh>
      </group>
      <group ref={doorR} position={[L / 2, H / 2, W / 4]}>
        <mesh position={[0, 0, -W / 4]} material={matDoor}>
          <boxGeometry args={[0.03, H * 0.96, W / 2]} />
        </mesh>
      </group>

      {/* Gold side rails (top + bottom of long sides) */}
      {[H - 0.012, 0.025].map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, W / 2 + 0.018]} material={matRail}>
            <boxGeometry args={[L - 0.02, 0.025, 0.005]} />
          </mesh>
          <mesh position={[0, y, -W / 2 - 0.018]} material={matRail}>
            <boxGeometry args={[L - 0.02, 0.025, 0.005]} />
          </mesh>
        </group>
      ))}

      {/* Bottom chassis frame (subtle, dark) */}
      <mesh position={[0, -0.01, 0]} material={matEnds}>
        <boxGeometry args={[L - 0.1, 0.04, W - 0.1]} />
      </mesh>

      {/* Interior gold light when open */}
      {open && (
        <pointLight position={[L / 2 - 0.7, H / 2, 0]} color={GOLD} intensity={4} distance={4} decay={1.5} />
      )}

      {/* Products inside */}
      <group position={[L / 4, H / 2 + 0.05, 0]}>
        <Products visible={open} />
      </group>
    </group>
  );
}

/* ---------- Scene ---------- */
export default function ContainerScene({ activeSector = 0 }: { activeSector?: number }) {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full h-full" data-cursor="rotate">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4.5, 2.3, 5.5], fov: 32 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#0a0a0c"]} />

          {/* 3-point lighting setup */}
          <ambientLight intensity={0.35} />
          <directionalLight
            position={[5, 7, 4]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0005}
          />
          <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#FFC10A" />
          <directionalLight position={[0, -2, 4]} intensity={0.2} color="#7C9BC8" />

          {/* Environment for subtle reflections */}
          <Environment preset="studio" background={false} />

          <group rotation={[0, 0.35, 0]} position={[0, 0, 0]}>
            <ContainerModel open={open} />
          </group>

          {/* Soft contact shadow under the container */}
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.5}
            scale={10}
            blur={2.5}
            far={3}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 2.1}
            rotateSpeed={0.55}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* UI overlay */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-5 pointer-events-none z-10">
        <span className={`mono-data text-[10px] uppercase tracking-[0.22em] text-graphite transition-opacity duration-500 ${showHint ? "opacity-100" : "opacity-40"}`}>
          DRAG TO ROTATE
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto mono-data text-[10px] uppercase tracking-[0.22em] text-gold inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 hover:bg-gold hover:text-charcoal transition-colors"
        >
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${open ? "bg-gold" : "bg-graphite"}`} />
          {open ? "Doors open" : "Open doors"}
        </button>
      </div>
    </div>
  );
}
