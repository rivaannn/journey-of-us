import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Menu, X, Heart } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';

const navLinks = [
  { name: 'Beranda', path: '/home' },
  { name: 'Perjalanan', path: '/timeline' },
  { name: 'Galeri', path: '/gallery' },
  { name: 'Surat', path: '/letters' },
  { name: 'Cerita Kita', path: '/story' },
  { name: 'Permainan', path: '/fun' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScroll(20);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300',
          scrolled ? 'pt-4' : 'pt-6'
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
            scrolled 
              ? "bg-white/80 backdrop-blur-md shadow-lg border border-white/20 w-full max-w-5xl" 
              : "bg-transparent w-full max-w-7xl"
          )}
        >
          <Link to="/" className="text-2xl font-serif font-bold text-primary flex items-center gap-2 group">
            <span className="tracking-widest text-xl flex items-center gap-2">
              <span>🐼</span>
              <div className="relative">
                <Heart className="w-6 h-6 fill-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span>🐨</span>
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-primary',
                    isActive ? 'text-primary' : 'text-foreground/60'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white shadow-sm rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Tombol Menu Mobile */}
          <button
            className="md:hidden p-2 text-foreground bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/80 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Overlay Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 bg-secondary rounded-full text-foreground hover:rotate-90 transition-transform duration-300"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'text-3xl font-serif font-bold transition-all hover:text-primary hover:scale-110 inline-block',
                      location.pathname === link.path ? 'text-primary' : 'text-foreground/40'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex items-center gap-2 text-primary/60"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium tracking-widest uppercase">5 Tahun Kita</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
