// components/sections/HeroSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Terminal from '../ui/Terminal';

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const swapWords = ['Live & Evolve', 'Coordinate Swarms', 'Execute Sovereignly', 'Auto-Improve'];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % swapWords.length);
    }, 2800);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 80;
      targetY = (e.clientY / window.innerHeight - 0.5) * 50;
    };

    const updateDroneCamera = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      if (videoWrapperRef.current) {
        const rotY = mouseX * 0.15;
        const rotX = -mouseY * 0.12;
        videoWrapperRef.current.style.transform = `perspective(1000px) translate3d(${mouseX}px, ${mouseY}px, 0px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.18)`;
      }

      animId = requestAnimationFrame(updateDroneCamera);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateDroneCamera);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [swapWords.length]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent pt-24 pb-16 isolation-isolate">
      {/* DRONE-STYLE INTERACTIVE PANNING VIDEO CONTAINER */}
      <div
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-75 ease-out"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35 mix-blend-screen"
        >
          <source src="videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Multi-stage Vignette & Seamless Void Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg/90 pointer-events-none z-[1]" />

      <motion.div style={{ y: contentY }} className="relative z-10 container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        
        {/* Left Column: Focused Core Value Proposition */}
        <div className="lg:col-span-7 text-left">
          
          {/* Status Pill & Target Audience */}
          <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-c1/50 bg-bg1/90 backdrop-blur-xl shadow-[0_0_25px_rgba(0,255,224,0.25)]">
            <div className="w-2 h-2 rounded-full bg-c1 animate-pulse shadow-[0_0_10px_#00ffe0]" />
            <span className="font-mono text-xs text-c1 uppercase tracking-widest font-semibold">
              The AI Agent Operating System &middot; For Engineers &amp; Founders
            </span>
          </div>

          {/* Core Single Idea Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-txt tracking-tight leading-tight drop-shadow-md">
            Where AI Agents{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-c1 via-c2 to-c3 min-w-[280px]">
              {swapWords[textIndex]}
            </span>
          </h1>

          {/* Subheadline: Clear, Sharp, High Contrast */}
          <p className="mt-6 text-txt2 font-mono text-sm md:text-base max-w-xl leading-relaxed bg-bg1/90 p-5 rounded-xl border border-white/20 backdrop-blur-xl shadow-2xl">
            <strong className="text-txt font-semibold">Benni OS</strong> is the unified operating layer for autonomous AI agents — providing persistent memory, multi-agent swarm dispatch, sovereign inference and native MCP control planes. <strong className="text-c1 font-bold">Zero cloud bill. Production-ready from day one.</strong>
          </p>

          {/* Clear Conversion CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#gateway"
              className="px-8 py-3.5 rounded-xl bg-c1 text-black font-bold text-sm shadow-[0_0_30px_rgba(0,255,224,0.5)] hover:bg-c1d hover:shadow-[0_0_50px_rgba(0,255,224,0.8)] hover:-translate-y-1 transition-all"
            >
              Deploy Node &rarr;
            </a>
            <a
              href="https://github.com/benni-os"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl border border-white/25 bg-white/10 backdrop-blur-xl text-txt font-bold text-sm hover:border-c1/60 hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-c1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path></svg>
              View GitHub Source
            </a>
          </div>

          {/* Metrics Bar: Proof Density */}
          <div className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/20 bg-bg1/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
            <div className="text-center">
              <div className="text-2xl font-black text-txt">41<span className="text-c1">+</span></div>
              <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">MCP Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-txt">7</div>
              <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">MCP Servers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-txt">6</div>
              <div className="font-mono text-[10px] text-txt3 uppercase tracking-widest mt-1 font-semibold">Swarms</div>
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
