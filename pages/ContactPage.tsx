import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import L from 'leaflet';

const ContactPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Only initialize if the container exists and map hasn't been created yet
    if (mapContainerRef.current && !mapInstanceRef.current) {
      
      // Coordinates for 51 Cornfield, Dewsbury, West Yorkshire, WF13 3UZ
      const HQ_COORDS: [number, number] = [53.6835, -1.6450]; 

      const map = L.map(mapContainerRef.current, {
        center: HQ_COORDS,
        zoom: 15,
        scrollWheelZoom: false, // Prevent scroll hijacking
        zoomControl: false, 
      });

      // Dark Matter Tiles (Premium Look)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Custom Gold Icon using SVG string
      const goldIcon = L.divIcon({
        className: 'bg-transparent border-none',
        html: `<div class="flex items-center justify-center w-12 h-12 -ml-6 -mt-12 filter drop-shadow-[0_0_8px_rgba(214,179,106,0.5)]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#D6B36A" stroke="#070B14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                   <circle cx="12" cy="10" r="3" fill="#070B14"/>
                 </svg>
               </div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48]
      });

      L.marker(HQ_COORDS, { icon: goldIcon })
        .addTo(map)
        .bindPopup(
          `<div class="font-sans min-w-[150px] p-1">
             <h3 class="font-serif font-bold text-gold text-sm mb-1 tracking-widest uppercase">Global HQ</h3>
             <p class="text-xs text-white/80 leading-relaxed">51 Cornfield<br/>Dewsbury, West Yorkshire<br/>WF13 3UZ</p>
           </div>`
        )
        .openPopup();

      // Custom Zoom Control Position
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-obsidian min-h-screen pt-20">
       <section className="py-24 px-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Text Content */}
            <motion.div
              {...({
                initial: { opacity: 0, x: -50 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8 }
              } as any)}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                Begin Your <br /> <span className="text-white/30 italic">Legacy.</span>
              </h1>
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
                 animate: { opacity: 1, y: 0 },
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

      {/* Interactive Map Section */}
      <section className="h-[500px] w-full bg-graphite relative border-t border-white/5">
        <div id="map" ref={mapContainerRef} className="w-full h-full z-0 outline-none" />
        
        {/* Map Overlay Text */}
        <div className="absolute bottom-8 left-8 z-[500] pointer-events-none hidden md:block">
           <div className="bg-obsidian/80 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] text-white/50 uppercase tracking-widest">
              Live Global Tracking
           </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;