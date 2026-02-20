import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-40 bg-obsidian relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
           {...({
             initial: { opacity: 0, scale: 0.9 },
             whileInView: { opacity: 1, scale: 1 },
             viewport: { once: true },
             transition: { duration: 1 }
           } as any)}
        >
          <h2 className="text-5xl md:text-8xl font-serif text-white mb-8">
            Step Into <br/> 
            <span className="text-gold italic">Elite Living.</span>
          </h2>
          <button className="bg-white text-obsidian px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors duration-300 cursor-hover shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(214,179,106,0.3)]">
            Begin Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;