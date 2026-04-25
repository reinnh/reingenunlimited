"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

const NUM_STARS = 5000;

type PointsRef = THREE.Points<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;

const Stars = () => {
  const ref = useRef<PointsRef | null>(null);

  // ✅ Generate once (critical for performance)
  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(NUM_STARS * 3), {
      radius: 1.2,
    });

    return new Float32Array(positions);
  }, []);
  // ✅ Animate rotation safely
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;
