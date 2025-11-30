import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';


export default function Intro() {
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-4">
              5 Tahun Tentang Kita
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
              Sebuah perjalanan cinta, senyum, dan kenangan.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            className="group relative px-8 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <span>Masuk Ke Dunia Kami</span>
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            <div className="absolute inset-0 rounded-full ring-2 ring-primary/50 animate-ping opacity-20" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
