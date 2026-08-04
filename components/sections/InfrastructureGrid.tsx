// components/sections/InfrastructureGrid.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

const METRICS = [
  { label: "JARVAS-2 Latency", value: "12ms", status: "Optimal", color: "text-c3", chartColor: "#00ff88", delay: 0 },
  { label: "Active Agents", value: "42", status: "Scaling", color: "text-c1", chartColor: "#00ffe0", delay: 0.2 },
  { label: "API Requests/s", value: "1,204", status: "High", color: "text-c2", chartColor: "#7c5cfc", delay: 0.4 }
];

const Sparkline = ({ color, delay }: { color: string, delay: number }) => (
  <svg className="w-full h-16 overflow-visible mt-4" preserveAspectRatio="none" viewBox="0 0 100 30">
    <motion.path
      d="M0 25 Q 15 25, 25 15 T 50 20 T 75 5 T 100 10"
      fill="none"
      stroke={color}
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    />
    <motion.circle 
      cx="100" cy="10" r="3" fill={color} 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }}
      transition={{ delay: delay + 1.4 }}
      className="animate-ping"
    />
  </svg>
);

export default function InfrastructureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 60;
      targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };

    const updateDroneCamera = () => {
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      if (videoWrapperRef.current) {
        const rotY = mouseX * 0.12;
        const rotX = -mouseY * 0.1;
        videoWrapperRef.current.style.transform = `perspective(1000px) translate3d(${mouseX}px, ${mouseY}px, 0px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.15)`;
      }

      animId = requestAnimationFrame(updateDroneCamera);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateDroneCamera);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} id="infrastructure" className="relative w-full py-24 bg-transparent border-b border-white/5 overflow-hidden isolation-isolate">
      
      {/* DRONE-STYLE INTERACTIVE PANNING VIDEO LAYER */}
      <div 
        ref={videoWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-transform duration-75 ease-out"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <motion.div style={{ y: videoY }} className="w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 mix-blend-screen scale-110"
          >
            <source src="videos/infra-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Seamless Edge Masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-transparent to-bg/90 pointer-events-none z-[1]" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="mb-12 text-left">
          <h2 className="text-3xl md:text-5xl font-black text-txt tracking-tight">
            Infrastructure <span className="text-c3">Telemetry</span>
          </h2>
          <p className="mt-2 text-txt2 font-mono text-sm">
            Continuous real-time metrics across all 7 self-hosted nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METRICS.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.4, delay: metric.delay }}
              className="p-6 rounded-2xl bg-bg2/90 backdrop-blur-xl border border-white/15 shadow-2xl hover:border-c1/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-txt2">{metric.label}</span>
                <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-current bg-white/5 ${metric.color}`}>
                  {metric.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-txt font-mono group-hover:text-c1 transition-colors">
                {metric.value}
              </div>
              <Sparkline color={metric.chartColor} delay={metric.delay} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
