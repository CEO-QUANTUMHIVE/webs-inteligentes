"use client";

import React from "react";

export default function EngineStudioPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#000000] m-0 p-0">
      <iframe
        src="/templates/engine-studio/index.html"
        title="Engine Studio — Quantum Hive Edition"
        className="w-full h-full border-0 m-0 p-0 block"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}
