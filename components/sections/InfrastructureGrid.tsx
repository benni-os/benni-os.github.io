// components/sections/InfrastructureGrid.tsx
'use client';

import { motion } from 'framer-motion';

const METRICS = [
  { label: "JARVAS-2 Latency", value: "12ms", status: "Optimal", color: "text-c3", chartColor: "#00ff88", delay: 0 },
  { label: "Active Agents", value: "42", status: "Scaling", color: "text-c1", chartColor: "#00ffe0", delay: 0.2 },
  { label: "API Requests/s", value: "1,204", status: "High", color: "text-c2", chartColor: "#7c5cfc", delay: 0.4 }
];

// Componente visual do gráfico de linha desenhado
const Sparkline = ({ color, delay }: { color: string, delay: number }) => (
  <svg className="w-full h-16 overflow-visible mt-4" preserveAspectRatio="none" viewBox="0 0 100 30">
    <motion.path
      d="M0 25 Q 15 25, 25 15 T 50 20 T 75 5 T 100 10"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    />
    <motion.circle 
      cx="100" cy="10" r="2" fill={color} 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }}
      transition={{ delay: delay + 1.4 }}
      className="animate-pulse"
    />
  </svg>
);

export default function InfrastructureGrid() {
  return (
    <section className="relative w-full py-16 bg-bg border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-left">
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
              transition={{ duration: 0.5, delay: metric.delay }}
              className="p-6 rounded-xl bg-bg2 border border-white/5 shadow-inner"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-xs text-txt2">{metric.label}</span>
                <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-current ${metric.color}`}>
                  {metric.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-txt font-mono">
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
