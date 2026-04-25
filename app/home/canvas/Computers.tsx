import { Suspense, memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";

const ComputerModel = ({ isMobile }: { isMobile: boolean }) => {
  const { scene } = useGLTF("desktop_pc/scene.gltf", true);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      // Gentle slight rotation back and forth
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh>
      <hemisphereLight
        intensity={5.15}
        groundColor="black"
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <group ref={groupRef}>
        <primitive
          object={scene}
          scale={isMobile ? 0.35 : 0.75}
          position={isMobile ? [0, 2, -0.2] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </group>
    </mesh>
  );
};

const MemoizedComputerModel = memo(ComputerModel);

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="always"
      shadows={false}
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: false }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enableDamping
          dampingFactor={0.1}
          maxPolarAngle={1.57}
          minPolarAngle={1.57}
        />
        <MemoizedComputerModel isMobile={false} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
