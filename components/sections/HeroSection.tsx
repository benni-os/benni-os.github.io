// components/sections/HeroSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const swapWords = ['Autonomous', 'Sovereign', 'Production', 'The Future'];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % swapWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [swapWords.length]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg pt-20">
      {/* Video Background with 3D Parallax Scale */}
      <motion.video
        style={{ scale: videoScale }}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
      >
        <source src="videos/hero-bg.mp4" type="video/mp4" />
      </motion.video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/80 to-bg pointer-events-none" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 container mx-auto px-6 max-w-6xl flex flex-col items-center text-center py-12">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 flex items-center gap-2.5 px-4 py-2 rounded-full border border-c1/40 bg-bg1/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,224,0.15)]"
        >
          <div className="w-2 h-2 rounded-full bg-c1 animate-pulse shadow-[0_0_10px_#00ffe0]" />
          <span className="font-mono text-xs text-c1 uppercase tracking-widest font-semibold">
            Autonomous AI Infrastructure &middot; Production 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
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

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-txt2 font-mono text-sm md:text-base max-w-2xl leading-relaxed bg-bg1/60 p-4 rounded-xl border border-white/10 backdrop-blur-md"
        >
          Benni OS is the <strong className="text-txt">operating layer</strong> for autonomous AI agents &mdash; persistent memory, multi-agent coordination, sovereign inference and native tooling. <strong className="text-c1">Zero cloud bill. Production from day one.</strong>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#platform"
            className="px-8 py-3.5 rounded-xl bg-c1 text-black font-bold text-sm shadow-[0_0_24px_rgba(0,255,224,0.35)] hover:bg-c1d hover:shadow-[0_0_40px_rgba(0,255,224,0.6)] hover:-translate-y-0.5 transition-all"
          >
            Explore Platform &rarr;
          </a>
          <a
            href="https://github.com/benni-os"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-txt font-bold text-sm hover:border-c1/50 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
          >
            GitHub Source
          </a>
        </motion.div>

        {/* Metrics Bar with 3D Card Shadow */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/15 bg-bg1/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="text-center">
            <div className="text-2xl font-black text-txt">41<span className="text-c1">+</span></div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">MCP Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">7</div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">Servers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">11</div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-txt">99.2<span className="text-c3">%</span></div>
            <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">Uptime</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
