// components/sections/MarqueeStrip.tsx
'use client';

import { motion } from 'framer-motion';

const TECH_STACK = [
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
  return (
    <section className="relative w-full py-6 overflow-hidden bg-bg1 border-y border-white/5 flex items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen pointer-events-none"
      >
        <source src="videos/particles-loop.mp4" type="video/mp4" />
      </video>

      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* Track */}
      <div className="flex w-fit relative z-0">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-c1 shadow-[0_0_8px_#00ffe0]" />
              <span className="font-mono text-xs text-txt2 uppercase tracking-wider">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
