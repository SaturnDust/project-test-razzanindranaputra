'use client'
import { useEffect, useState } from "react";

export default function Header() {

  return (
    <section className="relative w-full h-[500px] bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* text headline */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl mb-2">Ideas</h1>
        <p className="text-lg">Where all our great things begin</p>
      </div>

      {/* overlay diagonal */}
     <div
      className="absolute bottom-[-0.5px] left-0 w-full h-[130px] bg-[#fefefe] z-10"
      style={{
        clipPath: 'polygon(100% 0%, 100% 0%, 1000% 100%, 0% 100%)',
      }}
    />
    </section>
  );
}
