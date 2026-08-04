// components/sections/CompanySection.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function CompanySection() {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setEyePos({ x: x * 18, y: y * 12 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="company" className="relative w-full py-28 bg-bg2/90 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* MARVEL-STYLE HUMANOID DIGITAL AI SENTINEL INTERFACE */}
        <div 
          ref={cardRef}
          className="relative h-72 md:h-[400px] w-full flex items-center justify-center border border-c1/30 bg-bg/95 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,224,0.12)] group"
        >
          {/* Cybernetic HUD Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,224,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
          
          {/* Glowing Circular HUD Rings */}
          <div className="absolute w-[320px] h-[320px] border border-c1/20 rounded-full animate-spin-slow border-dashed" style={{ animationDuration: '30s' }} />
          <div className="absolute w-[220px] h-[220px] border border-c2/30 rounded-full border-dashed" />

          {/* HUMANOID DIGITAL FACE SILHOUETTE */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {/* Mind Gem Core */}
            <div className="w-4 h-4 bg-c1 rotate-45 mb-4 shadow-[0_0_16px_#00ffe0] animate-pulse" />

            {/* Glowing Humanoid Eyes Container */}
            <div className="flex items-center gap-12 mb-6">
              {/* Left Eye */}
              <div className="w-12 h-6 border-2 border-c1 rounded-full flex items-center justify-center bg-c1/10 shadow-[0_0_15px_#00ffe0]">
                <div 
                  className="w-3.5 h-3.5 bg-c1 rounded-full shadow-[0_0_10px_#00ffe0] transition-transform duration-75"
                  style={{ transform: `translate3d(${eyePos.x}px, ${eyePos.y}px, 0)` }}
                />
              </div>
              {/* Right Eye */}
              <div className="w-12 h-6 border-2 border-c1 rounded-full flex items-center justify-center bg-c1/10 shadow-[0_0_15px_#00ffe0]">
                <div 
                  className="w-3.5 h-3.5 bg-c1 rounded-full shadow-[0_0_10px_#00ffe0] transition-transform duration-75"
                  style={{ transform: `translate3d(${eyePos.x}px, ${eyePos.y}px, 0)` }}
                />
              </div>
            </div>

            {/* Jawline Vector Path */}
            <svg className="w-32 h-12 overflow-visible" viewBox="0 0 100 40">
              <path d="M0 0 L 25 35 L 50 40 L 75 35 L 100 0" fill="none" stroke="#00ffe0" strokeWidth="1.5" opacity="0.6" />
            </svg>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-c1 tracking-widest uppercase bg-bg/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-c1/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-c1 animate-ping" />
            Benni Sentinel AI &middot; Castanhal Node (-1.295, -47.925)
          </div>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-txt mb-6 tracking-tight">
            Sovereign Infrastructure
          </h2>
          <ul className="space-y-6 font-mono text-sm text-txt2">
            <li className="flex gap-4">
              <span className="text-c2 font-bold text-base">01</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Global Origin</span>
                Built in Castanhal, Pará, Brazil. Operating globally without intermediaries or vendor lock-in.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-c2 font-bold text-base">02</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Lean Architecture</span>
                Code optimized for sub-millisecond local execution. Zero unnecessary abstractions or bloatware.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-c2 font-bold text-base">03</span>
              <div>
                <span className="block text-txt font-bold mb-1 uppercase tracking-widest text-xs">Mission</span>
                Absolute autonomy and deployment of enterprise-grade AI agent swarms.
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
