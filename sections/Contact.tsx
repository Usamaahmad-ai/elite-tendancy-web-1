import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-obsidian relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Text Content */}
          <motion.div
            {...({
              initial: { opacity: 0, x: -50 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 }
            } as any)}
          >
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">
               Get in Touch
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Begin Your <br /> <span className="text-white/30 italic">Legacy.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-md">
              Whether you are an owner seeking yield maximization or a resident looking for your next sanctuary, we are here to serve.
            </p>

            <div className="space-y-8">
               <div className="group flex items-start gap-6 cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-gold group-hover:bg-gold group-hover:text-obsidian transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-xl mb-1 group-hover:text-gold transition-colors">Global Headquarters</h4>
                    <p className="text-white/40 text-sm">51 Cornfield<br/>Dewsbury, West Yorkshire, WF13 3UZ</p>
                  </div>
               </div>

               <div className="group flex items-start gap-6 cursor-pointer">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-gold group-hover:bg-gold group-hover:text-obsidian transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-xl mb-1 group-hover:text-gold transition-colors">Private Concierge</h4>
                    <p className="text-white/40 text-sm">vip@elitetenancy.com</p>
                  </div>
               </div>

               <div className="group flex items-start gap-6 cursor-pointer">
                   <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-gold group-hover:bg-gold group-hover:text-obsidian transition-all duration-300">
                     <Phone size={20} />
                   </div>
                   <div>
                     <h4 className="text-white font-serif text-xl mb-1 group-hover:text-gold transition-colors">Direct Line</h4>
                     <p className="text-white/40 text-sm">+44 7446192577</p>
                   </div>
               </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
             {...({
               initial: { opacity: 0, y: 50 },
               whileInView: { opacity: 1, y: 0 },
               viewport: { once: true },
               transition: { duration: 0.8, delay: 0.2 }
             } as any)}
             className="bg-graphite/20 backdrop-blur-xl border border-white/10 p-8 md:p-12 relative"
          >
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <ArrowRight className="text-white -rotate-45" size={48} />
             </div>

             <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">First Name</label>
                      <input type="text" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="John" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Last Name</label>
                      <input type="text" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="Doe" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Email Address</label>
                   <input type="email" className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 hover:border-white/30" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Interest</label>
                   <select className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none cursor-pointer">
                      <option className="bg-obsidian">Property Management</option>
                      <option className="bg-obsidian">Tenant Application</option>
                      <option className="bg-obsidian">Investment Opportunities</option>
                   </select>
                </div>
                <div className="space-y-2 pt-4">
                   <label className="text-[10px] uppercase tracking-widest text-gold/80 font-bold">Message</label>
                   <textarea rows={3} className="w-full bg-obsidian/50 border-b border-white/10 py-3 text-white focus:border-gold transition-colors outline-none placeholder-white/10 resize-none hover:border-white/30" placeholder="Tell us about your needs..."></textarea>
                </div>
                
                <button type="button" className="w-full bg-white text-obsidian py-4 mt-8 font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500 flex items-center justify-center gap-2 group">
                   Request Consultation
                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact;