import { useState, useEffect } from 'react';
import PageTransition from '../components/ui/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw, Trophy } from 'lucide-react';
import { cardImages } from '../data/fun';

// Duplikasi dan acak kartu
const generateCards = () => {
  const shuffled = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ ...card, uniqueId: index, isFlipped: false, isMatched: false }));
  return shuffled;
};

export default function Fun() {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Cek kecocokan
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].name === cards[second].name) {
        setCards(prev => prev.map((card, index) => 
          index === first || index === second ? { ...card, isMatched: true } : card
        ));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, index) => 
            index === first || index === second ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  // Cek kondisi menang
  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setIsWon(true);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    setCards(prev => prev.map((card, i) => 
      i === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const initializeGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <SectionTitle
          title="Permainan Memori"
          subtitle="Temukan pasangan kenangan manis kita!"
          className="mb-12"
        />

        <div className="max-w-2xl mx-auto">
          {/* Informasi Game */}
          <div className="flex justify-between items-center mb-8 bg-white/50 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="font-medium">Langkah: {moves}</span>
            </div>
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Ulangi
            </button>
          </div>

          {/* Grid Permainan */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.uniqueId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="aspect-square"
              >
                <button
                  onClick={() => handleCardClick(index)}
                  className={`w-full h-full rounded-lg md:rounded-xl transition-all duration-500 transform preserve-3d relative ${
                    card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Depan (Tersembunyi) */}
                  <div 
                    className={`absolute inset-0 bg-primary/10 border-2 border-primary/20 rounded-lg md:rounded-xl flex items-center justify-center backface-hidden ${
                      card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <Heart className="w-4 h-4 md:w-6 md:h-6 text-primary/30" />
                  </div>

                  {/* Belakang (Terungkap) */}
                  <div 
                    className={`absolute inset-0 bg-white border-2 border-primary rounded-lg md:rounded-xl overflow-hidden backface-hidden rotate-y-180 ${
                      card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <img 
                      src={card.src} 
                      alt="Memory" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pesan Menang */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 text-center p-6 bg-primary/10 rounded-2xl border border-primary/20"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Yey! Kamu Menang! 🎉</h3>
                <p className="text-muted-foreground">Sama seperti kamu memenangkan hatiku.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
