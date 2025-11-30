import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination, Autoplay } from 'swiper/modules';
import PageTransition from '../components/ui/PageTransition';
import ImageModal from '../components/ui/ImageModal';
import { Grid, Layers, ZoomIn } from 'lucide-react';
import { memories } from '../data/gallery';
import { useKeyDown } from '../hooks/useKeyDown';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

// Import gaya Swiper
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Gallery() {
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Penanganan Navigasi
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % memories.length : null));
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + memories.length) % memories.length : null));
  }, []);

  // Navigasi Keyboard
  useKeyDown('ArrowRight', () => { if (selectedIndex !== null) handleNext(); });
  useKeyDown('ArrowLeft', () => { if (selectedIndex !== null) handlePrev(); });
  useKeyDown('Escape', () => setSelectedIndex(null));

  // Kunci Scroll Body saat Modal Terbuka
  useBodyScrollLock(selectedIndex !== null);

  const selectedImage = selectedIndex !== null ? memories[selectedIndex] : null;

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Bagian Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">Kenangan Kita</h1>
            <p className="text-muted-foreground">Momen-momen indah perjalanan kita yang terabadikan.</p>
          </div>
          
          {/* Tombol Ganti Tampilan */}
          <div className="flex bg-secondary/50 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('slider')}
              className={`p-2 rounded-md transition-all ${viewMode === 'slider' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Konten Galeri */}
        {viewMode === 'slider' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm md:max-w-md mx-auto py-10"
          >
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Navigation, Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full aspect-[3/4] rounded-2xl shadow-xl"
            >
              {memories.map((memory, index) => (
                <SwiperSlide
                  key={memory.id}
                  onClick={() => setSelectedIndex(index)}
                  className="flex flex-col items-center justify-center rounded-2xl shadow-xl bg-white p-2 cursor-pointer"
                >
                  <div className="w-full h-full rounded-xl overflow-hidden relative group">
                    <img 
                      src={memory.image} 
                      alt={memory.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                      <ZoomIn className="w-8 h-8 mb-2 opacity-80" />
                      <h3 className="text-2xl font-serif font-bold">{memory.title}</h3>
                      <p className="text-sm opacity-80">{memory.date}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Geser untuk melihat momen favorit kita
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 md:columns-3 gap-6 space-y-6"
          >
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedIndex(index)}
                className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group relative cursor-pointer"
              >
                <img 
                  src={memory.image} 
                  alt={memory.title} 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <ZoomIn className="w-8 h-8 mb-2 opacity-80" />
                  <h3 className="text-xl font-bold">{memory.title}</h3>
                  <p className="text-sm">{memory.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Komponen Modal Gambar */}
        <ImageModal 
          selectedImage={selectedImage}
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </PageTransition>
  );
}
