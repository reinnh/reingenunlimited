"use client";

import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html as="div" className="flex flex-col items-center justify-center" role="status">
      <span className="canvas-loader" aria-hidden="true" />
      <p className="text-sm text-[#F1F1F1] font-semibold mt-6">
        {progress.toFixed(0)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
