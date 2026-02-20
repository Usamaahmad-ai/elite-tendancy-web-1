import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, CheckCircle, BarChart3, Star, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Precision Tenant Matching",
    description: "AI-driven vetting ensuring only the top 1% of qualified applicants enter your portfolio.",
    icon: Users
  },
  {
    title: "White-Glove Property Care",
    description: "24/7 concierge-level maintenance with proactive asset preservation protocols.",
    icon: Star
  },
  {
    title: "Automated Revenue",
    description: "Dynamic pricing models and automated collection systems maximizing yield.",
    icon: TrendingUp
  },
  {
    title: "Absolute Compliance",
    description: "Real-time legal framework adjustments keeping your assets fully protected.",
    icon: Shield
  },
  {
    title: "Investor Analytics",
    description: "Institutional-grade reporting dashboards for real-time portfolio transparency.",
    icon: BarChart3
  },
  {
    title: "Luxury Concierge",
    description: "Lifestyle management services that retain high-value tenants longer.",
    icon: CheckCircle
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-obsidian relative">
      <div className="container mx-auto px-6">
        <div className="mb-24 max-w-4xl">
          <motion.div 
            {...({
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true }
            } as any)}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-gold"></div>
            <span className="text-gold text-xs font-bold uppercase tracking-widest">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            {...({
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.2 }
            } as any)}
            className="text-4xl md:text-7xl font-serif text-white leading-[1.1]"
          >
            Elevating the Standard of <br/><span className="text-white/20 italic">Property Management.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} item={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ item: ServiceItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      {...({
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1, duration: 0.6 }
      } as any)}
      className="group relative min-h-[320px] bg-graphite/20 p-8 border border-white/5 hover:border-gold/20 transition-all duration-500 cursor-hover flex flex-col justify-between overflow-hidden"
    >
      {/* Background Index Number */}
      <div className="absolute -top-6 -right-6 text-[150px] font-serif text-white/[0.02] group-hover:text-gold/[0.05] transition-colors duration-500 leading-none select-none pointer-events-none">
        {index + 1}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
           <div className="w-14 h-14 bg-obsidian/50 border border-white/10 rounded-sm flex items-center justify-center group-hover:border-gold/50 group-hover:text-gold transition-colors duration-500 text-white/50 backdrop-blur-md">
            <item.icon size={24} strokeWidth={1.5} />
           </div>
           <ArrowUpRight className="text-white/20 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
        </div>
        
        <h3 className="text-2xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
          {item.title}
        </h3>
        
        <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300 pr-4">
          {item.description}
        </p>
      </div>

      <div className="relative z-10 w-full h-[1px] bg-white/5 mt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
      </div>
    </motion.div>
  );
};

export default Services;