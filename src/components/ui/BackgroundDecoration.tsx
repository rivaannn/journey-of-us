import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Music, Sparkles } from 'lucide-react';

const icons = [Heart, Star, Music, Sparkles, Heart];

export default function BackgroundDecoration() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gumpalan Gradien Lembut */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[100px] animate-pulse delay-2000" />

      {/* Ikon Mengambang */}
      {Array.from({ length: 15 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        const size = 10 + Math.random() * 20;

        return (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            initial={{ x: `${initialX}vw`, y: `${initialY}vh`, opacity: 0 }}
            animate={{
              y: [
                `${initialY}vh`,
                `${(initialY + 20) % 100}vh`,
                `${(initialY - 20 + 100) % 100}vh`,
                `${initialY}vh`,
              ],
              x: [
                `${initialX}vw`,
                `${(initialX + 10) % 100}vw`,
                `${(initialX - 10 + 100) % 100}vw`,
                `${initialX}vw`,
              ],
              opacity: [0, 0.4, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon size={size} fill="currentColor" />
          </motion.div>
        );
      })}

      {/* Efek Pengikut Mouse (Halus) */}
      <motion.div
        className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
    </div>
  );
}
