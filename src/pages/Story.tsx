import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import { Star, Coffee, Music, MapPin } from 'lucide-react';
import { chapters } from '../data/story';
import { useTimeElapsed } from '../hooks/useTimeElapsed';

const iconMap: Record<string, React.ReactNode> = {
  'Coffee': <Coffee className="w-6 h-6" />,
  'Star': <Star className="w-6 h-6" />,
  'Music': <Music className="w-6 h-6" />,
  'MapPin': <MapPin className="w-6 h-6" />,
};

export default function Story() {
  const timeElapsed = useTimeElapsed('2020-11-10T00:00:00');

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <SectionTitle
          title="Cerita Kita"
          subtitle="Setiap kisah cinta itu indah, tapi kisah kita adalah favoritku."
          className="mb-20"
        />

        <div className="max-w-3xl mx-auto space-y-24">
          {/* Daftar Bab */}
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Nomor Bab Dekoratif */}
              <div className="absolute -top-10 -left-4 md:-left-20 text-9xl font-serif font-bold text-primary/5 select-none z-0">
                {index + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-secondary rounded-full text-primary">
                    {iconMap[chapter.iconName]}
                  </div>
                  <h2 className="text-3xl font-serif font-bold">{chapter.title}</h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-loose text-justify">
                  {chapter.content}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Bagian Statistik */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-12 border-t border-primary/10"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8 md:mb-12">Waktu Bersama</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 text-center">
              {[
                { label: "Tahun", value: timeElapsed.years },
                { label: "Bulan", value: timeElapsed.months },
                { label: "Hari", value: timeElapsed.days },
                { label: "Jam", value: timeElapsed.hours },
                { label: "Menit", value: timeElapsed.minutes },
                { label: "Detik", value: timeElapsed.seconds },
              ].map((stat, i) => (
                <div key={i} className="p-3 md:p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-primary/5">
                  <span className="block text-2xl md:text-4xl font-bold text-primary mb-1 md:mb-2 tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-6 md:mt-8">
               <p className="text-sm md:text-lg text-primary/80 font-medium animate-pulse px-4">
                 ...dan masih terus bertambah setiap detiknya ❤️
               </p>
            </div>
          </motion.div>

          {/* Catatan Kaki */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pt-12"
          >
            <p className="text-2xl font-serif italic text-primary">Bersambung...</p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
