import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import { Mail, X, Heart } from 'lucide-react';
import { letters } from '../data/letters';

export default function Letters() {
  const [selectedLetter, setSelectedLetter] = useState<typeof letters[0] | null>(null);

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <SectionTitle
          title="Surat Cinta"
          subtitle="Kata-kata dari hatiku untukmu."
          className="mb-16"
        />

        {/* Grid Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              onClick={() => setSelectedLetter(letter)}
              className="bg-white p-8 rounded-xl shadow-sm border border-primary/10 cursor-pointer relative overflow-hidden group"
            >
              {/* Dekorasi Amplop */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-primary/20" />
              
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-serif font-bold text-xl mb-2">{letter.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">{letter.date}</p>
              <p className="text-sm text-foreground/60 italic">"{letter.preview}"</p>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-primary font-medium">Baca selengkapnya &rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal untuk Membaca Surat */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fffbf0] w-full max-w-lg p-8 md:p-12 rounded-sm shadow-2xl relative"
                style={{
                  backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
                  backgroundSize: '100% 2rem',
                  lineHeight: '2rem',
                }}
              >
                {/* Tombol Tutup */}
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 text-foreground/50 hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Isi Surat */}
                <div className="font-serif text-lg md:text-xl text-foreground/80">
                  <div className="flex justify-between items-baseline mb-8 border-b border-foreground/10 pb-4">
                    <h2 className="font-bold text-2xl text-primary">{selectedLetter.title}</h2>
                    <span className="text-sm text-muted-foreground">{selectedLetter.date}</span>
                  </div>
                  
                  <p className="whitespace-pre-wrap mb-8">
                    {selectedLetter.content}
                  </p>

                  <div className="flex justify-end mt-8">
                    <div className="flex flex-col items-center">
                      <span className="font-cursive text-xl">Dengan penuh cinta,</span>
                      <Heart className="w-4 h-4 fill-primary text-primary mt-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
