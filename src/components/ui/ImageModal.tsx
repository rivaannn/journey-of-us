import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  selectedImage: {
    id: number;
    image: string;
    title: string;
    date: string;
  } | null;
  onClose: () => void;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
}

export default function ImageModal({ selectedImage, onClose, onNext, onPrev }: ImageModalProps) {
  if (!selectedImage) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90 z-[10000]"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tombol Navigasi */}
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 group p-4 rounded-full transition-all z-[10000] hidden md:flex items-center justify-center hover:bg-white/5"
        >
          <ChevronLeft className="w-12 h-12 text-white/40 group-hover:text-white transition-all duration-300 group-hover:-translate-x-2" />
        </button>
        
        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 group p-4 rounded-full transition-all z-[10000] hidden md:flex items-center justify-center hover:bg-white/5"
        >
          <ChevronRight className="w-12 h-12 text-white/40 group-hover:text-white transition-all duration-300 group-hover:translate-x-2" />
        </button>
        
        <motion.div
          key={selectedImage.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl max-h-[90vh] w-full bg-transparent flex flex-col items-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          <div className="mt-6 text-center text-white">
            <h3 className="text-3xl font-serif font-bold mb-2 tracking-wide">{selectedImage.title}</h3>
            <p className="text-white/60 text-lg font-light tracking-widest uppercase">{selectedImage.date}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
