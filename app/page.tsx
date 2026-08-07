'use client';

import { useEffect, useRef } from 'react';

const layers = [
  ['01', 'Command layer', 'Route intent into plans, decisions and measurable execution.'],
  ['02', 'Memory fabric', 'Turn every interaction, artifact and result into compounding intelligence.'],
  ['03', 'Revenue layer', 'Connect autonomous work to outcomes with feedback loops that improve.'],
];

export default function Home() {
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = visual.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const orb = node.querySelector<HTMLElement>('.authority-orb');
    const move = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      if (orb) orb.style.transform = `rotateX(${58 - y * 8}deg) rotateZ(${-22 + x * 8}deg)`;
    };
    const leave = () => { if (orb) orb.style.transform = ''; };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', leave);
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <main>
      <header className="site-header container">
        <a className="brand" href="#top" aria-label="Benni OS home"><span className="brand-mark">B</span><span>Benni OS</span></a>
        <nav><a href="#system">System</a><a href="#agents">Agent mesh</a><a href="#trust">Trust</a></nav>
        <span className="live-status"><i />Operational layer</span>
      </header>

      <section className="hero container" id="top">
        <div className="hero-copy"><p className="eyebrow">Autonomous infrastructure</p><h1>The operating system for <em>autonomous work.</em></h1><p className="hero-lede">Benni OS orchestrates agents, tools and decisions in one sovereign control plane — turning complex operations into a system that can think, act and improve.</p><a className="primary-cta" href="#community">Enter the operator community <span>↗</span></a></div>
        <div className="hero-visual" ref={visual} aria-label="Benni OS autonomous control plane visualization"><div className="glow" /><div className="signal-card signal-one"><small><i />Agent mesh</small><strong>Coordinating in real time</strong></div><div className="signal-card signal-two"><small>Control plane</small><strong>One system. Every operation.</strong></div><div className="signal-card signal-three"><small>System state</small><strong>Adaptive by design</strong></div><div className="authority-orb"><div className="orb-core" /><i className="orb-node node-one" /><i className="orb-node node-two" /><i className="orb-node node-three" /></div></div>
      </section>

      <section className="proof-strip container"><div><b>Agent-native</b><span>Built for autonomous execution</span></div><div><b>LLM-native</b><span>Intelligence at the operating layer</span></div><div><b>Sovereign</b><span>Your context, under your control</span></div><div><b>Composable</b><span>Tools become a connected system</span></div></section>

      <section className="section container" id="system"><div className="section-heading"><div><p className="eyebrow">01 / The system</p><h2>From isolated tools to operational gravity.</h2></div><p>The hard part is not adding another agent. It is giving every agent the context, controls and feedback loop to operate as one.</p></div><div className="capability-grid">{layers.map(([number, title, text]) => <article className="capability-card" key={number}><span className="card-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="section container agent-section" id="agents"><div><p className="eyebrow">02 / Agent mesh</p><h2>One intelligence. Many specialized minds.</h2><p className="section-copy">Every agent has a role, a boundary and a shared operating picture — so autonomy stays powerful and observable.</p></div><div className="layer-stack"><div><b>JARVAS-2</b><span>Dispatch & execution</span></div><div><b>Control Plane</b><span>Policy & orchestration</span></div><div><b>Memory Fabric</b><span>Context & evidence</span></div><div><b>MONOMO</b><span>Human command surface</span></div></div></section>

      <section className="trust-band container" id="trust"><h2>Autonomy without the black box.</h2><p>Every action has a reason, a boundary and a trace. Move fast, keep the operator in control and let evidence compound.</p></section>
      <section className="section container community" id="community"><p className="eyebrow">03 / The operator network</p><h2>Build the next operating layer with us.</h2><p className="section-copy">Join the community shaping systems where intelligence is not a feature — it is the foundation.</p></section>
      <footer className="site-footer container"><a className="brand" href="#top"><span className="brand-mark">B</span><span>Benni OS</span></a><span>Autonomous work, orchestrated.</span><span>© 2026 Benni OS</span></footer>
    </main>
  );
}