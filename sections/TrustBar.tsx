import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Assets Managed', value: '$2.5B+' },
  { label: 'Premium Units', value: '4,500' },
  { label: 'Occupancy Rate', value: '99.2%' },
  { label: 'Cities', value: '12' },
];

const TrustBar: React.FC = () => {
  return (
    <section className="bg-obsidian border-b border-white/5 py-12 md:py-20 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-sapphire/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 divide-x-0 md:divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              {...({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1, duration: 0.8 }
              } as any)}
              className="flex flex-col items-center justify-center text-center group cursor-hover"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-white mb-2 group-hover:text-gold transition-colors duration-500">
                {stat.value}
              </h3>
              <p className="text-xs uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors duration-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;