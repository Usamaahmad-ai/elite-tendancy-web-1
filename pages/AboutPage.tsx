import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Globe, Users, History, Shield } from 'lucide-react';

const stats = [
   { label: "Founded", value: "2018" },
   { label: "Assets", value: "$2.5B" },
   { label: "Cities", value: "12" },
   { label: "Team", value: "85+" },
];

const values = [
   { title: "Integrity", desc: "We operate with radical transparency in an opaque industry." },
   { title: "Precision", desc: "Every detail matters. Excellence is the only acceptable standard." },
   { title: "Innovation", desc: "We leverage technology to outperform traditional models." },
];

const teamImages = [
   'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000',
   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000',
   'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000'
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen pt-20">
       
       {/* Hero */}
       <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
             alt="Office" 
             className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 text-center px-6">
             <motion.h1 
               {...({
                 initial: { opacity: 0, y: 30 },
                 animate: { opacity: 1, y: 0 },
                 transition: { duration: 0.8 }
               } as any)}
               className="text-5xl md:text-8xl font-serif text-white mb-6"
             >
                Our <span className="text-gold italic">Legacy.</span>
             </motion.h1>
             <p className="text-white/80 text-xl max-w-2xl mx-auto">
                Redefining the standards of luxury real estate management through technology and human-centric service.
             </p>
          </div>
       </section>

       {/* Story */}
       <section className="py-32 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
             <div>
                <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-6">Who We Are</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
                   Bridging the gap between <br/>institutional reliability and <br/>boutique hospitality.
                </h2>
                <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light">
                   <p>
                      Elite Tenancy was founded on a simple premise: high-value assets deserve high-performance management. Traditional property management was reactive, opaque, and outdated. We built a system that is proactive, transparent, and driven by data.
                   </p>
                   <p>
                      Today, we manage over $2.5 billion in assets across major metropolitan hubs, serving a clientele that includes sovereign wealth funds, family offices, and discerning individual investors.
                   </p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                   <div key={idx} className="bg-white/5 border border-white/5 p-8 text-center hover:border-gold/30 transition-colors duration-300">
                      <div className="text-4xl font-serif text-white mb-2">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gold">{stat.label}</div>
                   </div>
                ))}
             </div>
          </div>
       </section>

       {/* Values */}
       <section className="py-32 bg-graphite/20 border-y border-white/5">
          <div className="container mx-auto px-6">
             <div className="text-center mb-20">
                <h2 className="text-4xl font-serif text-white">Our Core Values</h2>
             </div>
             <div className="grid md:grid-cols-3 gap-12">
                {values.map((val, idx) => (
                   <div key={idx} className="text-center group cursor-hover">
                      <div className="w-16 h-16 mx-auto bg-obsidian border border-white/10 rounded-full flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                         {idx === 0 ? <Shield /> : idx === 1 ? <Award /> : <Globe />}
                      </div>
                      <h3 className="text-2xl font-serif text-white mb-4">{val.title}</h3>
                      <p className="text-white/50">{val.desc}</p>
                   </div>
                ))}
             </div>
          </div>
       </section>

       {/* Team Teaser */}
       <section className="py-32 px-6">
          <div className="container mx-auto text-center">
             <h2 className="text-4xl font-serif text-white mb-12">The Leadership</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {[0, 1, 2].map((i) => (
                   <div key={i} className="group cursor-hover">
                      <div className="aspect-[3/4] overflow-hidden mb-6 bg-graphite grayscale group-hover:grayscale-0 transition-all duration-500">
                         <img 
                            src={teamImages[i]}
                            alt="Team Member"
                            className="w-full h-full object-cover"
                         />
                      </div>
                      <h3 className="text-xl font-serif text-white">
                         {i === 0 ? 'Alexander Sterling' : i === 1 ? 'Victoria Chen' : 'Marcus Thorne'}
                      </h3>
                      <p className="text-gold text-xs uppercase tracking-widest mt-1">
                         {i === 0 ? 'Founder & CEO' : i === 1 ? 'Head of Operations' : 'Chief Investment Officer'}
                      </p>
                   </div>
                ))}
             </div>
          </div>
       </section>

       {/* CTA */}
       <section className="py-24 bg-white/5 border-t border-white/10">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif text-white mb-8">Join the elite.</h2>
            <Link to="/contact">
               <button className="bg-gold text-obsidian px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300">
                  Partner With Us
               </button>
            </Link>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;