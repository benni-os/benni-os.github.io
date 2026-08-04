// components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const swapWords = ['Autonomous', 'Sovereign', 'Production', 'The Future'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % swapWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [swapWords.length]);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg pt-20">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
      >
        <source src="videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/80 to-bg pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl flex flex-col items-center text-center py-12">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-c1/30 bg-bg1/60 backdrop-blur"
        >
          <div className="w-2 h-2 rounded-full bg-c1 animate-pulse" />
          <span className="font-mono text-xs text-c1 uppercase tracking-widest">
            Autonomous AI Infrastructure &middot; Production 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-txt tracking-tight leading-tight max-w-4xl"
        >
          Built for{' '}
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-c1 via-c2 to-c3 min-w-[280px]">
            {swapWords[textIndex]}
          </span>{' '}
          Agents.
        </motion.h1>

        {/* Subheadline (Terminal Style) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-txt2 font-mono text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Benni OS is the <strong className="text-txt">operating layer</strong> for autonomous AI agents &mdash; persistent memory, multi-agent coordination, sovereign inference and native tooling. <strong className="text-c1">Zero cloud bill. Production from day one.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#platform"
            className="px-8 py-3.5 rounded-xl bg-c1 text-black font-semibold text-sm shadow-[0_0_24px_rgba(0,255,224,0.3)] hover:bg-c1d hover:shadow-[0_0_36px_rgba(0,255,224,0.5)] transition-all"
          >
            Explore Platform &rarr;
          </a>
          <a
            href="https://github.com/benni-os"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur text-txt font-semibold text-sm hover:border-c1/40 hover:bg-white/10 transition-all"
          >
            GitHub Source
          </a>
        </motion.div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/10 bg-bg1/70 backdrop-blur shadow-2xl"
        >
          <div className="text-center">
            <div className="text-2xl font-black text-txt">41<span className="text-c1">+</span></div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1">MCP Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">7</div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1">Servers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">11</div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">99.2<span className="text-c3">%</span></div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1">Uptime</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
