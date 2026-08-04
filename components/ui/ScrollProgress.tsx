// components/ui/ScrollProgress.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-c1 via-c2 to-c3 origin-left z-50 shadow-[0_0_10px_#00ffe0]"
      style={{ scaleX }}
    />
  );
}
