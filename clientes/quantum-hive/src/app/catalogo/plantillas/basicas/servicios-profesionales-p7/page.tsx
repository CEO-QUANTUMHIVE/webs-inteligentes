"use client";

import React from "react";

export default function GriflanStudioNativePage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#111111] m-0 p-0">
      <iframe
        src="/templates/griflan/index.html"
        title="Griflan Creative Studio — Quantum Hive Edition"
        className="w-full h-full border-0 m-0 p-0 block"
        style={{ width: "100vw", height: "100vh" }}
      />
    </div>
  );
}
