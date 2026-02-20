import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, BarChart2 } from 'lucide-react';

const articles = [
   {
      id: 1,
      title: "The Shift to Ultra-Prime: 2024 Market Forecast",
      category: "Market Analysis",
      date: "Oct 24, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop",
      excerpt: "Why institutional capital is flooding into the luxury residential sector, and what it means for individual owners."
   },
   {
      id: 2,
      title: "Sustainable Luxury: The New Tenant Requirement",
      category: "Design Trends",
      date: "Oct 18, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
      excerpt: "LEED certification is no longer optional. How green technology is driving premium rental yields in urban centers."
   },
   {
      id: 3,
      title: "The Art of the Concierge",
      category: "Lifestyle",
      date: "Oct 10, 2024",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
      excerpt: "Beyond opening doors: How modern concierge services create stickiness and reduce turnover in high-end portfolios."
   },
   {
      id: 4,
      title: "Tax Implications of International Ownership",
      category: "Legal",
      date: "Sep 28, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
      excerpt: "Navigating the complex landscape of cross-border real estate investment structures."
   }
];

const InsightsPage: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-20">
       
       {/* Hero */}
       <section className="py-24 px-6 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="container mx-auto max-w-5xl text-center relative z-10">
             <motion.span 
               {...({
                 initial: { opacity: 0 },
                 animate: { opacity: 1 }
               } as any)}
               className="text-gold text-xs font-bold uppercase tracking-widest block mb-6"
             >
                Market Intelligence
             </motion.span>
             <motion.h1 
               {...({
                 initial: { opacity: 0, y: 30 },
                 animate: { opacity: 1, y: 0 }
               } as any)}
               className="text-5xl md:text-7xl font-serif text-white mb-8"
             >
                Strategic <span className="text-white/30 italic">Perspectives.</span>
             </motion.h1>
             <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                Institutional-grade analysis and expert commentary on the global luxury real estate landscape.
             </p>
          </div>
       </section>

       {/* Featured Article */}
       <section className="py-24 px-6">
          <div className="container mx-auto">
             <div className="relative aspect-[21/9] w-full overflow-hidden group cursor-hover mb-12 border border-white/5 bg-graphite">
                {/* Featured Report Image - High Availability Architectural Shot */}
                <img 
                   src="https://images.unsplash.com/photo-1486406146926-c627a92ad11ab?q=80&w=2400&auto=format&fit=crop" 
                   alt="Q4 2024 Global Asset Performance Report" 
                   className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                   loading="eager"
                />
                
                {/* Tech Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-10 opacity-30 group-hover:opacity-50 transition-opacity" />
                
                {/* Scanline Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold/20 z-20 animate-[scan_6s_linear_infinite]" />

                <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full md:w-2/3">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="bg-gold text-obsidian px-3 py-1 text-[10px] uppercase tracking-widest font-bold inline-block">Featured Report</span>
                      <span className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest font-mono">
                         <BarChart2 size={12} className="text-gold" />
                         Real-time Data Active
                      </span>
                   </div>
                   <h2 className="text-3xl md:text-6xl font-serif text-white mb-6 leading-tight">Q4 2024 Global Asset Performance Report</h2>
                   <div className="flex items-center gap-6">
                      <button className="flex items-center gap-3 text-white hover:text-gold transition-all duration-300 group/btn">
                         Read Full Analysis 
                         <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold group-hover/btn:text-obsidian transition-all">
                            <ArrowRight size={16} />
                         </div>
                      </button>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* Articles Grid */}
       <section className="pb-32 px-6">
          <div className="container mx-auto">
             <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                {articles.map((article, idx) => (
                   <motion.div 
                     key={article.id}
                     {...({
                       initial: { opacity: 0, y: 20 },
                       whileInView: { opacity: 1, y: 0 },
                       viewport: { once: true },
                       transition: { delay: idx * 0.1 }
                     } as any)}
                     className="group cursor-hover"
                   >
                      <div className="relative aspect-video overflow-hidden mb-8 border border-white/5 bg-graphite">
                         <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            loading="lazy"
                         />
                         <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-widest mb-4 font-mono">
                         <span className="text-gold font-bold">{article.category}</span>
                         <span className="w-1 h-1 bg-white/20 rounded-full" />
                         <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                         <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-gold transition-colors leading-snug">
                         {article.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>
                      <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* Newsletter */}
       <section className="py-32 bg-graphite/30 border-t border-white/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/20" />
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
             <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Join the Inner Circle.</h2>
             <p className="text-white/50 mb-12 text-lg max-w-xl mx-auto">
                Receive high-precision market briefings and off-market opportunities delivered directly to your inbox.
             </p>
             <form className="flex flex-col md:flex-row gap-0 group border border-white/10 focus-within:border-gold transition-colors">
                <input 
                   type="email" 
                   placeholder="Your professional email" 
                   className="flex-1 bg-obsidian/50 px-8 py-6 text-white outline-none placeholder-white/20 font-light"
                />
                <button className="bg-white text-obsidian px-12 py-6 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold transition-colors whitespace-nowrap">
                   Subscribe
                </button>
             </form>
          </div>
       </section>
    </div>
  );
};

export default InsightsPage;