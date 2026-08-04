// components/ui/Cursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3.5 h-3.5 bg-c1 rounded-full pointer-events-none z-[100] mix-blend-screen hidden md:block shadow-[0_0_12px_#00ffe0]"
      animate={{
        x: mousePosition.x - 7,
        y: mousePosition.y - 7,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 1400,
        damping: 38,
        mass: 0.1,
      }}
    >
      <div className="absolute inset-0 bg-c1 rounded-full animate-ping opacity-30" />
    </motion.div>
  );
}
