import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import loveRomantic from '../../assets/music/loveRomantic.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Toggle Putar/Jeda
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Autoplay dicegah:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle Bisu
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Mulai memutar musik saat interaksi pengguna pertama kali
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Putar otomatis mungkin diblokir, tunggu interaksi eksplisit
        });
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Tangani Perubahan Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
      <audio 
        ref={audioRef} 
        loop 
        src={loveRomantic} 
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isPlaying ? 'bg-primary text-primary-foreground' : 'bg-white text-primary border border-primary/20'
        }`}
      >
        {/* Efek berdenyut saat memutar */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
        )}

        {isPlaying ? <Pause className="w-5 h-5 relative z-10" /> : <Play className="w-5 h-5 relative z-10 ml-1" />}
      </motion.button>

      {/* Slider Kontrol Volume */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm overflow-hidden"
          >
            <button onClick={toggleMute} className="text-primary hover:text-primary/80 transition-colors">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
