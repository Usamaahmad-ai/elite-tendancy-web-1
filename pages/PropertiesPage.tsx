import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, ArrowRight, Filter, Check } from 'lucide-react';
import { Property } from '../types';

const PropertiesPage: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  
  const filteredProperties = useMemo(() => {
    return filterType === 'All' ? properties : properties.filter(p => p.type === filterType);
  }, [filterType]);

  const types = ['All', 'Penthouse', 'Villa', 'Loft', 'Estate'];

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      
      {/* Header */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="container mx-auto">
          <motion.div
             {...({
               initial: { opacity: 0, y: 20 },
               animate: { opacity: 1, y: 0 }
             } as any)}
             className="flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div>
               <h1 className="text-5xl md:text-8xl font-serif text-white mb-4">Curated <span className="text-white/30 italic">Living.</span></h1>
               <p className="text-white/60 max-w-xl">
                 An exclusive collection of the world's most desirable residences, managed with uncompromising standards.
               </p>
            </div>
          </motion.div>

          {/* Filters */}
          <div className="mt-16 flex flex-wrap gap-4">
             {types.map((type) => (
                <button
                   key={type}
                   onClick={() => setFilterType(type)}
                   className={`px-6 py-2 border rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${
                      filterType === type 
                      ? 'bg-gold text-obsidian border-gold font-bold' 
                      : 'text-white/60 border-white/20 hover:border-white hover:text-white'
                   }`}
                >
                   {type}
                </button>
             ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
             <AnimatePresence mode="popLayout">
                {filteredProperties.map((property) => (
                   <PropertyGridItem key={property.id} property={property} />
                ))}
             </AnimatePresence>
          </div>
          
          {filteredProperties.length === 0 && (
             <div className="text-center py-20 text-white/40">No properties found matching your criteria.</div>
          )}
        </div>
      </section>

      {/* Private Office CTA */}
      <section className="py-32 bg-graphite border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl font-serif text-white mb-6">Off-Market Opportunities</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10">
               Our Private Office manages a discrete portfolio of unlisted assets for ultra-high-net-worth individuals. Access is by invitation or application only.
            </p>
            <Link to="/contact">
               <button className="border border-gold text-gold px-8 py-3 uppercase tracking-widest text-xs hover:bg-gold hover:text-obsidian transition-all duration-300">
                  Contact Private Office
               </button>
            </Link>
         </div>
      </section>
    </div>
  );
};

const PropertyGridItem: React.FC<{ property: Property }> = ({ property }) => {
   return (
      <Link to={`/property/${property.id}`} className="group cursor-hover block">
         <motion.div
            {...({
              layout: true,
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.9 }
            } as any)}
            className="w-full"
         >
            <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-graphite">
               <div className="absolute top-4 left-4 z-10 bg-obsidian/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-gold border border-gold/20">
                  {property.type}
               </div>
               <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div>
               <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif text-white group-hover:text-gold transition-colors duration-300">{property.title}</h3>
                  <span className="text-gold italic font-serif">{property.price}</span>
               </div>
               <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider mb-4">
                  <MapPin size={12} />
                  {property.location}
               </div>
               <div className="flex items-center gap-6 text-white/70 text-sm pt-4 border-t border-white/10">
                  <span className="flex items-center gap-2"><BedDouble size={14} className="text-white/40"/> {property.beds}</span>
                  <span className="flex items-center gap-2"><Bath size={14} className="text-white/40"/> {property.baths}</span>
                  <span className="flex items-center gap-2"><Square size={14} className="text-white/40"/> {property.sqft} sqft</span>
               </div>
            </div>
         </motion.div>
      </Link>
   );
};

export default PropertiesPage;