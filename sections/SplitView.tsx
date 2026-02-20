import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SplitView: React.FC = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  return (
    <section id="about" className="h-[80vh] flex flex-col md:flex-row bg-obsidian overflow-hidden">
      {/* Owner Side (Left) */}
      <motion.div
        className="relative h-1/2 md:h-full overflow-hidden cursor-hover border-r border-obsidian"
        {...({
          animate: {
            width: window.innerWidth >= 768 ? (hoveredSide === 'left' ? '65%' : hoveredSide === 'right' ? '35%' : '50%') : '100%',
            opacity: hoveredSide === 'right' ? 0.6 : 1
          },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        } as any)}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/services')}
      >
        <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 group-hover:bg-black/20" />
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
          alt="For Owners" 
          className="w-full h-full object-cover scale-105"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center p-12 md:p-20">
          <motion.div
            {...({
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              transition: { delay: 0.2 }
            } as any)}
          >
            <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">For Owners</h3>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Maximize <br/> Yield.
            </h2>
            <p className="text-white/70 max-w-sm mb-8 leading-relaxed opacity-0 md:opacity-100 transition-opacity duration-300" style={{ opacity: hoveredSide === 'left' ? 1 : (hoveredSide === null ? 0.7 : 0) }}>
              Entrust your portfolio to a management team that thinks like an investment firm.
            </p>
            <div className="flex items-center gap-2 text-white border-b border-white/30 w-fit pb-1 group cursor-pointer">
              <span className="uppercase tracking-widest text-xs">Owner Portal</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tenant Side (Right) */}
      <motion.div
        className="relative h-1/2 md:h-full overflow-hidden cursor-hover"
        {...({
          animate: {
            width: window.innerWidth >= 768 ? (hoveredSide === 'right' ? '65%' : hoveredSide === 'left' ? '35%' : '50%') : '100%',
            opacity: hoveredSide === 'left' ? 0.6 : 1
          },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        } as any)}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        onClick={() => navigate('/properties')}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" 
          alt="For Tenants" 
          className="w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-center p-12 md:p-20 items-end text-right">
          <motion.div
             {...({
               initial: { opacity: 0, y: 20 },
               whileInView: { opacity: 1, y: 0 },
               transition: { delay: 0.2 }
             } as any)}
          >
            <h3 className="text-gold uppercase tracking-widest text-xs font-bold mb-4">For Tenants</h3>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Live <br/> Exceptionally.
            </h2>
             <p className="text-white/70 max-w-sm ml-auto mb-8 leading-relaxed opacity-0 md:opacity-100 transition-opacity duration-300" style={{ opacity: hoveredSide === 'right' ? 1 : (hoveredSide === null ? 0.7 : 0) }}>
              Access the city's most exclusive residences with a white-glove service experience.
            </p>
             <div className="flex items-center gap-2 text-white border-b border-white/30 w-fit ml-auto pb-1 group cursor-pointer">
              <span className="uppercase tracking-widest text-xs">Find a Home</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SplitView;