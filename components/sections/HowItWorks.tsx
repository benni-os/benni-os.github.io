// components/sections/HowItWorks.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    id: '01',
    title: 'System Initialization',
    desc: 'Benni Master OS boots the full stack — initializing JARVAS-2 dispatch, memory persistence, and agent formation protocols across all nodes.',
  },
  {
    id: '02',
    title: 'Data Ingestion',
    desc: 'Continuous real-time stream ingestion with sub-10ms processing latency.',
  },
  {
    id: '03',
    title: 'Neural Output',
    desc: 'Sovereign action execution, multi-agent swarm coordination, and dynamic horizontal scaling.',
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={containerRef} id="how" className="relative w-full py-28 bg-bg border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <motion.div style={{ y: parallaxY }} className="mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Operation <span className="text-c2">Protocol</span>
          </h2>
          <p className="mt-4 text-txt2 font-mono text-sm">
            <span className="text-c1">{'>'}</span> Runtime pipeline status: Nominal &middot; 3-Phase Execution
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Conduit Line with Depth Parallax */}
          <div className="absolute left-6 md:left-[50px] top-0 bottom-0 w-[1px] bg-white/10">
            <motion.div 
              className="w-full bg-gradient-to-b from-c1 via-c2 to-c3 shadow-[0_0_12px_#00ffe0]"
              style={{ height: pathHeight }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {STEPS.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                className="relative flex items-start gap-8 md:gap-16 group"
                style={{ perspective: 1000 }}
              >
                {/* Orbital Ring / Node with 3D Depth */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-[100px] md:h-[100px] bg-bg1 border border-white/15 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,255,224,0.08)] group-hover:border-c1/60 group-hover:shadow-[0_0_35px_rgba(0,255,224,0.3)] transition-all duration-500">
                  <span className="font-mono text-c1 text-xs md:text-sm font-bold tracking-widest group-hover:scale-110 transition-transform">
                    {step.id}
                  </span>
                  {/* Pulsing Central Node */}
                  <div className="absolute w-1.5 h-1.5 bg-c1 rounded-full animate-ping opacity-60" />
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-6">
                  <h3 className="text-xl md:text-2xl font-bold text-txt mb-2 group-hover:text-c1 transition-colors">{step.title}</h3>
                  <p className="text-txt2 font-mono text-sm leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
