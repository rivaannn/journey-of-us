import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import { Calendar, Heart } from 'lucide-react';
import { milestones } from '../data/timeline';

export default function Timeline() {
  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <SectionTitle 
          title="Garis Waktu Kita" 
          subtitle="Menelusuri tahun-tahun indah dalam cerita kita." 
          className="mb-16"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Garis Vertikal */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 transform md:-translate-x-1/2" />

          {/* Daftar Pencapaian */}
          <div className="space-y-8 md:space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Gelembung Tanggal */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full transform -translate-x-1/2 mt-6 z-10" />

                {/* Kartu Konten */}
                <div className="ml-10 md:ml-0 md:w-1/2 p-5 md:p-6 bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm font-medium">{item.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary/60 text-xs md:text-sm">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Spasi untuk Layout Bergantian */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
