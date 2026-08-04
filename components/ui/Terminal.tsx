// components/ui/Terminal.tsx
'use client';

import { useEffect, useState, useRef } from 'react';

interface TermLine {
  cls: string;
  t: string;
}

const TERM_LINES: TermLine[] = [
  { cls: 'text-txt3', t: '// Benni Master OS -- control-plane boot sequence' },
  { cls: 'text-c3 font-semibold', t: '[OK] benni-master-brain       :3000  MASTER OS CORE' },
  { cls: 'text-c3 font-semibold', t: '[OK] jarvas-2-execution-engine :3001  RUNNING (SA-93)' },
  { cls: 'text-c3 font-semibold', t: '[OK] benni-memory-mcp        :3002  LIVE' },
  { cls: 'text-c3 font-semibold', t: '[OK] benni-ops-gateway       :3003  LIVE' },
  { cls: 'text-c3 font-semibold', t: '[OK] benni-inference-engine  :8080  LIVE (C++/CUDA)' },
  { cls: 'text-txt3', t: '' },
  { cls: 'text-c1 font-bold', t: '> run_create_plan({ mission: "ship" })' },
  { cls: 'text-txt', t: '  Master OS State: ACTIVE' },
  { cls: 'text-txt', t: '  JARVAS-2 Swarm:  BRAVO Formation (4 active)' },
  { cls: 'text-txt', t: '  Memory Vector:   12,847 vectors indexed' },
  { cls: 'text-txt3', t: '' },
  { cls: 'text-c2 font-bold', t: '> dispatch_swarm({ target: "tier-1" })' },
  { cls: 'text-gold font-semibold', t: '  [!] Master Brain: ALPHA formation deployed' },
  { cls: 'text-gold font-semibold', t: '  [!] Revenue loop: FOXTROT active' },
  { cls: 'text-txt3', t: '' },
  { cls: 'text-c1 font-bold', t: '> status' },
  { cls: 'text-c3 font-bold', t: '  BENNI MASTER OS OPERATIONAL' }
];

const TELEMETRY_POOL = [
  { cls: 'text-txt3', t: '[TICK] master-os:gc  freed 847 vectors  +14ms' },
  { cls: 'text-c1',  t: '[TICK] jarvas-2:swarm  task_complete  rev+$0.12' },
  { cls: 'text-c3',  t: '[TICK] master-os:heartbeat  latency:1.8ms  OK' },
  { cls: 'text-c2',  t: '[TICK] mcp:router  dispatched 41 tools  ready' },
  { cls: 'text-gold',t: '[TICK] ops:gateway  decision_ledger  checkpoint_saved' },
  { cls: 'text-txt', t: '[TICK] inference:cuda  tps:142.8 tok/s  gpu:38%' }
];

export default function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const termBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let currentText = '';
    let intervalId: NodeJS.Timeout;

    function typeLine() {
      if (lineIdx >= TERM_LINES.length) {
        intervalId = setInterval(() => {
          const rand = TELEMETRY_POOL[Math.floor(Math.random() * TELEMETRY_POOL.length)];
          setLines((prev) => [...prev, rand]);
          if (termBodyRef.current) {
            termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
          }
        }, 3500);
        return;
      }

      const target = TERM_LINES[lineIdx];
      if (charIdx < target.t.length) {
        currentText += target.t[charIdx++];
        setLines((prev) => {
          const next = [...prev];
          if (next.length > lineIdx) {
            next[lineIdx] = { cls: target.cls, t: currentText };
          } else {
            next.push({ cls: target.cls, t: currentText });
          }
          return next;
        });
        if (termBodyRef.current) {
          termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
        }
        setTimeout(typeLine, 14);
      } else {
        lineIdx++;
        charIdx = 0;
        currentText = '';
        setTimeout(typeLine, target.t === '' ? 50 : 120);
      }
    }

    const timer = setTimeout(typeLine, 300);

    return () => {
      clearTimeout(timer);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="w-full max-w-[500px] bg-bg2/95 border border-c1/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,224,0.15)] relative">
      {/* Top Header Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-c1/15 bg-c1/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-[10px] font-semibold text-txt2 mx-auto tracking-widest uppercase">
          benni master os &mdash; control-plane
        </span>
      </div>

      {/* Terminal Body */}
      <div
        ref={termBodyRef}
        className="p-5 font-mono text-xs leading-relaxed h-[340px] overflow-y-auto relative scrollbar-none"
      >
        {lines.map((line, idx) => (
          <div key={idx} className={`whitespace-pre-wrap break-all ${line.cls}`}>
            {line.t}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-c1 animate-pulse ml-1 align-middle shadow-[0_0_8px_#00ffe0]" />
      </div>
    </div>
  );
}
