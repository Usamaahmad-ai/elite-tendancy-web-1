import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Users, CheckCircle, BarChart3, Star, Key, Building2, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    title: "Precision Tenant Matching",
    description: "Our proprietary AI-driven vetting process analyzes over 50 data points to ensure only the top 1% of qualified applicants enter your portfolio. We look beyond credit scores to assess financial stability and rental history integrity.",
    icon: Users
  },
  {
    title: "White-Glove Property Care",
    description: "24/7 concierge-level maintenance with proactive asset preservation protocols. We employ a dedicated team of artisan contractors who treat your property with the respect it commands.",
    icon: Star
  },
  {
    title: "Automated Revenue",
    description: "Dynamic pricing models and automated collection systems maximizing yield. Our algorithms adjust rental rates based on micro-market fluctuations to ensure zero vacancy without leaving money on the table.",
    icon: TrendingUp
  },
  {
    title: "Absolute Compliance",
    description: "Real-time legal framework adjustments keeping your assets fully protected. Our legal team monitors local, state, and federal regulations to insulate you from liability.",
    icon: Shield
  },
  {
    title: "Investor Analytics",
    description: "Institutional-grade reporting dashboards for real-time portfolio transparency. Access cash flow statements, occupancy rates, and ROI projections from our secure mobile portal.",
    icon: BarChart3
  },
  {
    title: "Luxury Concierge",
    description: "Lifestyle management services that retain high-value tenants longer. From private chef bookings to housekeeping, we provide an ecosystem of services that make leaving impossible.",
    icon: CheckCircle
  }
];

const methodology = [
  { step: "01", title: "Consultation", desc: "We align on your financial goals and asset strategy." },
  { step: "02", title: "Onboarding", desc: "Digital assimilation of your portfolio into our secure ecosystem." },
  { step: "03", title: "Optimization", desc: "Immediate implementation of revenue-enhancing protocols." },
  { step: "04", title: "Scale", desc: "Strategic reinvestment and portfolio expansion planning." },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
         <div className="container mx-auto relative z-10">
            <motion.div
               {...({
                 initial: { opacity: 0, y: 30 },
                 animate: { opacity: 1, y: 0 },
                 transition: { duration: 0.8 }
               } as any)}
               className="max-w-4xl"
            >
               <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-6">
                  World-Class Management
               </span>
               <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-8">
                  The Art of <br/> <span className="text-white/30 italic">Asset Elevation.</span>
               </h1>
               <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                  We don't just manage properties; we cultivate wealth. Our service suite is designed for the modern investor who demands efficiency, transparency, and superior returns.
               </p>
            </motion.div>
         </div>
      </section>

      {/* Main Grid */}
      <section className="py-24 bg-graphite/20 border-t border-white/5">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {servicesList.map((service, index) => (
                  <motion.div
                     key={index}
                     {...({
                       initial: { opacity: 0, y: 20 },
                       whileInView: { opacity: 1, y: 0 },
                       viewport: { once: true },
                       transition: { delay: index * 0.1, duration: 0.5 }
                     } as any)}
                     className="bg-obsidian border border-white/5 p-8 md:p-10 hover:border-gold/30 transition-all duration-300 group cursor-hover"
                  >
                     <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform duration-300">
                        <service.icon size={24} />
                     </div>
                     <h3 className="text-2xl font-serif text-white mb-4">{service.title}</h3>
                     <p className="text-white/50 leading-relaxed text-sm">{service.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Methodology */}
      <section className="py-32 bg-obsidian relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20">
               <h2 className="text-4xl md:text-6xl font-serif text-white">Our <br/>Methodology</h2>
               <p className="text-white/40 max-w-sm text-right mt-6 md:mt-0">A systematic approach to maximizing asset value.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
               {methodology.map((item, idx) => (
                  <div key={idx} className="border-t border-white/20 pt-8 group cursor-hover hover:border-gold transition-colors duration-500">
                     <span className="text-gold font-mono text-sm mb-4 block">{item.step}</span>
                     <h3 className="text-2xl font-serif text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                     <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white/5 border-t border-white/10">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif text-white mb-8">Ready to elevate your portfolio?</h2>
            <Link to="/contact">
               <button className="bg-gold text-obsidian px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                  Request Proposal
               </button>
            </Link>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;