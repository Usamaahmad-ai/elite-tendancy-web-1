import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  isFooter?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", isFooter = false }) => {
  const strokeColor = "#D6B36A"; // Gold
  const duration = 1.5;

  const pathVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: duration, 
        ease: "easeInOut" 
      }
    }
  };

  const textVariants: any = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: duration * 0.5 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {/* Icon Mark */}
      <motion.div 
        className={`relative ${isFooter ? 'w-10 h-10' : 'w-10 h-10 md:w-11 md:h-11'}`}
        {...({
          whileHover: "hover",
          initial: "hidden",
          animate: "visible"
        } as any)}
      >
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Frame */}
          <motion.rect 
            x="2" y="2" width="46" height="46" 
            stroke={strokeColor} 
            strokeWidth="1"
            {...({ variants: pathVariants } as any)}
          />
          
          {/* Architectural E */}
          <motion.path 
            d="M15 12V38" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinecap="square"
            {...({ variants: pathVariants } as any)}
          />
          <motion.path 
            d="M15 12H35" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinecap="square"
            {...({ variants: pathVariants } as any)}
          />
          <motion.path 
            d="M15 25H30" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinecap="square"
            {...({ variants: pathVariants } as any)}
          />
          <motion.path 
            d="M15 38H35" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            strokeLinecap="square"
            {...({ variants: pathVariants } as any)}
          />

          {/* Decorative Dot/Accent */}
          <motion.circle 
            cx="38" cy="12" r="1.5" 
            fill={strokeColor}
            {...({
              initial: { scale: 0, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: duration, duration: 0.3 }
            } as any)}
          />
        </svg>

        {/* Shine Effect Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%]"
          {...({
            variants: {
              hover: {
                translateX: "150%",
                transition: { duration: 0.6, ease: "easeInOut" }
              }
            }
          } as any)}
        />
      </motion.div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex overflow-hidden">
          {['E', 'L', 'I', 'T', 'E'].map((letter, i) => (
            <motion.span
              key={i}
              {...({
                custom: i,
                variants: textVariants,
                initial: "hidden",
                animate: "visible"
              } as any)}
              className={`font-serif ${isFooter ? 'text-xl' : 'text-lg md:text-xl'} tracking-[0.2em] font-bold text-white group-hover:text-gold transition-colors duration-500`}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        {!isFooter && (
          <motion.span 
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 2, duration: 1 }
            } as any)}
            className="text-[8px] uppercase tracking-[0.4em] text-gold/60 pl-[2px]"
          >
            Tenancy
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default Logo;