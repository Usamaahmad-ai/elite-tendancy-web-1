import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BedDouble, Bath, Square, ArrowRight, Filter, Check } from 'lucide-react';
import { Property } from '../types';
import { properties } from '../data/properties';
import { Link } from 'react-router-dom';

const locations = ['All', 'NY', 'CA', 'FL'];
const types = ['All', 'Penthouse', 'Villa', 'Loft', 'Estate'];
const amenitiesList = ['Concierge', 'Smart Home', 'Private Pool', 'Waterfront'];

const PropertyShowcase: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchLoc = activeLocation === 'All' || p.location.includes(activeLocation);
      const matchType = activeType === 'All' || p.type === activeType;
      const matchPrice = p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1];
      const matchAmenities = selectedAmenities.every(a => p.amenities.includes(a));
      return matchLoc && matchType && matchPrice && matchAmenities;
    });
  }, [activeLocation, activeType, priceRange, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <section id="properties" className="relative min-h-screen bg-graphite flex flex-col justify-center py-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-obsidian via-graphite to-obsidian opacity-80" />
      
      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-4">
              Curated Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">
              Signature <span className="text-white/30">Residences</span>
            </h2>
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 uppercase text-xs tracking-widest hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 group"
          >
            <Filter size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            {isFilterOpen ? 'Close Filters' : 'Refine Search'}
          </button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              {...({
                initial: { height: 0, opacity: 0 },
                animate: { height: 'auto', opacity: 1 },
                exit: { height: 0, opacity: 0 }
              } as any)}
              className="bg-obsidian/50 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden mb-12"
            >
              <div className="p-8 grid md:grid-cols-4 gap-8">
                {/* Location */}
                <div>
                  <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Location</h4>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => setActiveLocation(loc)}
                        className={`px-4 py-2 text-xs border transition-all ${
                          activeLocation === loc 
                            ? 'bg-white text-obsidian border-white' 
                            : 'text-white border-white/20 hover:border-white'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div>
                  <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Property Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {types.map(type => (
                      <button
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-4 py-2 text-xs border transition-all ${
                          activeType === type 
                            ? 'bg-white text-obsidian border-white' 
                            : 'text-white border-white/20 hover:border-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Monthly Budget</h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between text-white text-sm font-mono">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="10000" 
                      max="60000" 
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-gold bg-white/10 h-1 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 text-xs border flex items-center gap-2 transition-all ${
                          selectedAmenities.includes(amenity)
                            ? 'bg-gold/20 text-gold border-gold' 
                            : 'text-white border-white/20 hover:border-white'
                        }`}
                      >
                        {selectedAmenities.includes(amenity) && <Check size={10} />}
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Horizontal Draggable Carousel */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pl-6 md:pl-[max(2rem,calc((100vw-1280px)/2))] pb-12 hide-scrollbar cursor-grab active:cursor-grabbing no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
             <motion.div 
               {...({
                 initial: { opacity: 0 },
                 animate: { opacity: 1 }
               } as any)}
               className="w-full text-center py-20 text-white/40 italic font-serif text-xl"
             >
               No residences match your current criteria.
             </motion.div>
          )}
        </AnimatePresence>
        
        {/* Spacer for right padding */}
        <div className="w-8 shrink-0" />
      </div>

      {/* Scroll Indicator */}
      <div className="container mx-auto px-6 mt-8 flex justify-between items-center text-white/30 text-xs tracking-widest">
        <span>{filteredProperties.length} Residence{filteredProperties.length !== 1 && 's'} Available</span>
        <div className="flex items-center gap-2">
          <span>Scroll to Explore</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </section>
  );
};

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="block">
      <motion.div
        {...({
          layout: true,
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.9 },
          transition: { duration: 0.5 }
        } as any)}
        className="relative w-[85vw] md:w-[450px] aspect-[3/4] shrink-0 group cursor-hover snap-center"
      >
        <div className="w-full h-full overflow-hidden relative border border-white/5 bg-obsidian">
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-transparent transition-colors duration-700 z-10" />
          
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Floating Type Badge */}
          <div className="absolute top-6 left-6 z-20">
             <span className="bg-obsidian/80 backdrop-blur-md text-gold text-[10px] uppercase tracking-widest px-4 py-2 border border-gold/20 shadow-lg">
               {property.type}
             </span>
          </div>

          {/* Details Panel - Expanding */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian via-obsidian/95 to-transparent pt-24 pb-8 px-8 z-20">
             <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">{property.title}</h3>
             
             <div className="flex items-center gap-2 text-white/60 mb-4">
                 <MapPin size={14} className="text-gold" />
                 <span className="text-xs uppercase tracking-wider">{property.location}</span>
             </div>
             
             {/* Animated Specs Reveal */}
             <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
               <div className="overflow-hidden">
                  <div className="pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <div className="flex items-center justify-between text-white/80 text-xs mb-4">
                          <span className="flex items-center gap-2"><BedDouble size={14} className="text-gold/70"/> {property.beds} Beds</span>
                          <span className="flex items-center gap-2"><Bath size={14} className="text-gold/70"/> {property.baths} Baths</span>
                          <span className="flex items-center gap-2"><Square size={14} className="text-gold/70"/> {property.specs.split('•').pop()?.trim()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                      {property.amenities.map((am, i) => (
                          <span key={i} className="text-[10px] text-white/50 border border-white/10 px-2 py-1">{am}</span>
                      ))}
                      </div>
                  </div>
               </div>
             </div>

             <div className="flex justify-between items-center mt-4">
                <p className="text-gold font-serif text-xl italic">{property.price}</p>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-gold group-hover:text-obsidian group-hover:border-gold transition-all duration-300">
                    <ArrowRight size={16} />
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyShowcase;