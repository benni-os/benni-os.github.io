// components/sections/HeroSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Terminal from '../ui/Terminal';

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const swapWords = ['Autonomous', 'Sovereign', 'Production', 'The Future'];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % swapWords.length);
    }, 2800);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x: x * 60, y: y * 35 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [swapWords.length]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg pt-24 pb-16 isolation-isolate">
      {/* DRONE-STYLE INTERACTIVE PANNING VIDEO LAYER */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        animate={{
          x: mousePos.x,
          y: mousePos.y * 0.6,
          rotateY: mousePos.x * 0.08,
          rotateX: -mousePos.y * 0.05,
        }}
        style={{
          scale: videoScale,
          y: videoY,
          perspective: 1200,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 25, mass: 0.5 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 mix-blend-screen scale-110"
        >
          <source src="videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dynamic Cursor Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(750px circle at calc(50% + ${mousePos.x * 5}px) calc(50% + ${mousePos.y * 5}px), rgba(0, 255, 224, 0.14), transparent 75%)`
        }}
      />

      {/* Multi-stage Vignette & Seamless Void Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-[2]" style={{ background: 'radial-gradient(circle at center, transparent 35%, rgba(0,0,8,0.85) 90%)' }} />

      <motion.div style={{ y: contentY }} className="relative z-10 container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        
        {/* Left Column: Headline & Content */}
        <div className="lg:col-span-7 text-left">
          {/* Status Pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-c1/40 bg-bg1/80 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,224,0.2)]">
            <div className="w-2 h-2 rounded-full bg-c1 animate-pulse shadow-[0_0_10px_#00ffe0]" />
            <span className="font-mono text-xs text-c1 uppercase tracking-widest font-semibold">
              Autonomous AI Infrastructure &middot; Production 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-txt tracking-tight leading-tight">
            Built for{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-c1 via-c2 to-c3 min-w-[240px]">
              {swapWords[textIndex]}
            </span>{' '}
            Agents.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-txt2 font-mono text-sm md:text-base max-w-xl leading-relaxed bg-bg1/70 p-4 rounded-xl border border-white/15 backdrop-blur-xl shadow-lg">
            Benni OS is the <strong className="text-txt">operating layer</strong> for autonomous AI agents &mdash; persistent memory, multi-agent coordination, sovereign inference and native tooling. <strong className="text-c1">Zero cloud bill. Production from day one.</strong>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#platform"
              className="px-8 py-3.5 rounded-xl bg-c1 text-black font-bold text-sm shadow-[0_0_28px_rgba(0,255,224,0.4)] hover:bg-c1d hover:shadow-[0_0_45px_rgba(0,255,224,0.7)] hover:-translate-y-1 transition-all"
            >
              Explore Platform &rarr;
            </a>
            <a
              href="https://github.com/benni-os"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-txt font-bold text-sm hover:border-c1/50 hover:bg-white/10 hover:-translate-y-1 transition-all"
            >
              GitHub Source
            </a>
          </div>

          {/* Metrics Bar */}
          <div className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/15 bg-bg1/80 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
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
          </div>
        </div>

        {/* Right Column: Live Terminal Component */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <Terminal />
        </div>

      </motion.div>
    </section>
  );
}
