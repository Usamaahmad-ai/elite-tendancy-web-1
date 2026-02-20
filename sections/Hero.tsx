import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Layer - High Res Night Skyline */}
      <motion.div 
        style={{ y, scale: 1.1 } as any}
        {...({
          animate: { scale: 1.15 },
          transition: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }
        } as any)}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-obsidian/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2400&auto=format&fit=crop" 
          alt="Luxury Skyline" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          {...({
            initial: { opacity: 0, y: 100 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
          } as any)}
        >
          <h2 className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6">
            Beyond Property Management
          </h2>
        </motion.div>

        <motion.h1
          {...({
            initial: { opacity: 0, y: 100, filter: 'blur(20px)' },
            animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
            transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
          } as any)}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-white leading-[0.9]"
        >
          Where Exceptional <br />
          <span className="italic text-white/80">Living Begins.</span>
        </motion.h1>

        <motion.div
          {...({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 1, delay: 1 }
          } as any)}
          className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="bg-gold text-obsidian px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors duration-300 cursor-hover">
            Explore Properties
          </button>
          <button className="border border-white/20 backdrop-blur-sm text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 cursor-hover">
            Owner Services
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        {...({
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 2, duration: 1 }
        } as any)}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <ChevronDown className="text-gold animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;