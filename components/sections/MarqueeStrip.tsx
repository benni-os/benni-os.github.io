// components/sections/MarqueeStrip.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const TECH_STACK = [
  'BENNI INFERENCE ENGINE',
  'C++/CUDA INFERENCE',
  'NEXT.JS 14',
  'FRAMER MOTION',
  'THREE.JS',
  'POSTGRESQL 15',
  'CLOUDFLARE TUNNEL',
  'JARVAS-2 CORE',
  'PYTHON 3.12',
  'MCP FORGE',
  'DOCKER COMPOSE',
  'BEARER AUTH',
];

export default function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative w-full py-7 overflow-hidden bg-bg1 border-y border-white/10 flex items-center isolation-isolate">
      {/* MOTION UI: Background Video */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 mix-blend-screen"
        >
          <source src="videos/particles-loop.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Seamless Edge Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-bg via-bg/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg via-bg/80 to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div className="flex w-fit relative z-0">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 28,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap px-5 py-2.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl shadow-md hover:border-c1/50 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-c1 shadow-[0_0_8px_#00ffe0]" />
              <span className="font-mono text-xs text-txt uppercase tracking-wider font-semibold">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
