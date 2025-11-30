import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import { Heart, Quote } from 'lucide-react';

export default function Home() {
  return (
    <PageTransition>
      {/* Bagian Hero */}
      <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden px-4 md:px-6">
        {/* Latar Belakang Dekoratif Hero */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-20 h-20 md:w-32 md:h-32 bg-rose-300/20 rounded-full blur-2xl md:blur-3xl animate-bounce delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-40 md:h-40 bg-blue-300/20 rounded-full blur-2xl md:blur-3xl animate-bounce delay-700" />
        </div>
        
        <div className="container mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-6 md:mb-8 relative inline-block"
          >
            <div className="absolute inset-0 bg-primary/10 blur-xl md:blur-2xl rounded-full" />
            <Heart className="w-16 h-16 md:w-32 md:h-32 text-primary fill-primary/20 mx-auto relative z-10 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-primary mb-4 md:mb-6 drop-shadow-sm leading-tight">
              Lima Tahun Kita
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 font-light tracking-wide px-4">
              Setiap perjalanan panjang dimulai dengan satu langkah, dan aku memilih untuk melangkahkan kaki bersamamu, lagi dan lagi.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 md:mt-12"
          >
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-primary/0 via-primary to-primary/0 mx-auto" />
            <span className="text-xs md:text-sm text-primary font-medium mt-4 block">Gulir untuk menjelajah kisah kita</span>
          </motion.div>
        </div>
      </section>

      {/* Bagian Kutipan Spesial */}
      <section className="py-20 md:py-32 px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <Quote className="w-10 h-10 md:w-16 md:h-16 text-primary/20 mx-auto mb-6 md:mb-8" />
             <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-foreground leading-snug md:leading-tight mb-6 md:mb-8 drop-shadow-sm px-2">
               "Masa lalu saya adalah milik saya, masa lalu kamu adalah milik kamu, tapi masa depan adalah milik kita."
             </h2>
             <div className="flex items-center justify-center gap-4">
               <div className="h-px w-8 md:w-12 bg-primary/30" />
               <p className="text-sm md:text-lg text-primary font-medium uppercase tracking-widest">B.J. Habibie</p>
               <div className="h-px w-8 md:w-12 bg-primary/30" />
             </div>
           </motion.div>
        </div>
      </section>

      {/* Bagian Hitung Mundur */}
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8">Menuju Tak Terbatas</h2>
          <div className="flex justify-center gap-8 text-primary">
            <div className="text-center">
              <span className="text-4xl md:text-6xl font-bold block">∞</span>
              <span className="text-xs md:text-sm uppercase tracking-widest mt-2">Cinta Abadi</span>
            </div>
          </div>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted-foreground px-4">
            Setiap detik bersamamu adalah anugerah. Aku tak sabar menanti hari esok bersamamu.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
