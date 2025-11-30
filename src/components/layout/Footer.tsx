import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 mt-auto relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Pesan Kiri */}
          <div className="text-center md:text-left">
            <p className="text-primary font-serif italic text-lg">
              "Selamanya adalah waktu yang lama, tapi aku tidak keberatan menghabiskannya bersamamu."
            </p>
          </div>

          {/* Hak Cipta & Ikon */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 text-primary/60">
              <span className="text-sm">Dibuat dengan</span>
              <Heart className="w-4 h-4 fill-current animate-pulse text-primary" />
              <span className="text-sm">untuk Kita</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 Perjalanan Kita. Semua hak dilindungi.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
