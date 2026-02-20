import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, BedDouble, Bath, Square, Wifi, Car, Shield, ChefHat, ArrowRight, Check } from 'lucide-react';
import { properties } from '../data/properties';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="h-screen bg-obsidian flex items-center justify-center text-white">
        Property not found
      </div>
    );
  }

  // Amenity Icons Mapping (Simple for demo)
  const getAmenityIcon = (amenity: string) => {
    if (amenity.includes('Smart')) return <Wifi size={16} />;
    if (amenity.includes('Garage') || amenity.includes('Parking')) return <Car size={16} />;
    if (amenity.includes('Gated') || amenity.includes('Concierge')) return <Shield size={16} />;
    if (amenity.includes('Kitchen')) return <ChefHat size={16} />;
    return <Check size={16} />;
  };

  return (
    <motion.div 
      {...({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      } as any)}
      className="bg-obsidian min-h-screen pt-20"
    >
      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40">
        <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors bg-obsidian/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft size={16} />
          <span className="uppercase tracking-widest text-[10px]">Back to Collection</span>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
        <motion.img 
          {...({
            initial: { scale: 1.1 },
            animate: { scale: 1 },
            transition: { duration: 1.5, ease: "easeOut" }
          } as any)}
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
          <div className="container mx-auto">
             <motion.span 
               {...({
                 initial: { y: 20, opacity: 0 },
                 animate: { y: 0, opacity: 1 },
                 transition: { delay: 0.3 }
               } as any)}
               className="bg-gold/10 text-gold border border-gold/20 px-4 py-2 uppercase tracking-widest text-xs font-bold mb-4 inline-block backdrop-blur-sm"
             >
               {property.type}
             </motion.span>
             <motion.h1 
               {...({
                 initial: { y: 20, opacity: 0 },
                 animate: { y: 0, opacity: 1 },
                 transition: { delay: 0.4 }
               } as any)}
               className="text-5xl md:text-8xl font-serif text-white mb-6 max-w-4xl leading-tight"
             >
               {property.title}
             </motion.h1>
             <motion.div 
               {...({
                 initial: { y: 20, opacity: 0 },
                 animate: { y: 0, opacity: 1 },
                 transition: { delay: 0.5 }
               } as any)}
               className="flex flex-col md:flex-row items-start md:items-end gap-6 text-white/80"
             >
                <div className="flex items-center gap-2">
                  <MapPin className="text-gold" size={20} />
                  <span className="text-lg tracking-wide">{property.location}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/20 hidden md:block" />
                <div className="text-2xl font-serif text-gold italic">
                  {property.price}
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
             {/* Key Specs Grid */}
             <div className="grid grid-cols-3 gap-4 mb-16 border-b border-white/10 pb-16">
                <div className="p-6 bg-white/5 border border-white/5 text-center">
                   <BedDouble className="mx-auto text-gold mb-4" size={24} />
                   <span className="block text-3xl font-serif text-white mb-1">{property.beds}</span>
                   <span className="text-xs uppercase tracking-widest text-white/40">Bedrooms</span>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 text-center">
                   <Bath className="mx-auto text-gold mb-4" size={24} />
                   <span className="block text-3xl font-serif text-white mb-1">{property.baths}</span>
                   <span className="text-xs uppercase tracking-widest text-white/40">Bathrooms</span>
                </div>
                <div className="p-6 bg-white/5 border border-white/5 text-center">
                   <Square className="mx-auto text-gold mb-4" size={24} />
                   <span className="block text-3xl font-serif text-white mb-1">{property.sqft.toLocaleString()}</span>
                   <span className="text-xs uppercase tracking-widest text-white/40">Sq Ft</span>
                </div>
             </div>

             <div className="mb-16">
               <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">The Residence</h3>
               <p className="text-white/70 text-lg leading-relaxed font-light">
                 {property.description}
               </p>
             </div>

             <div className="mb-16">
               <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-8">Amenities & Features</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
                  {[...property.amenities, ...property.features].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/80">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/5">
                        {getAmenityIcon(item)}
                      </div>
                      <span className="text-sm tracking-wide">{item}</span>
                    </div>
                  ))}
               </div>
             </div>

             {/* Gallery */}
             <div>
               <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-8">Gallery</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {property.gallery.map((img, idx) => (
                   <img 
                    key={idx} 
                    src={img} 
                    alt={`Gallery ${idx}`} 
                    className={`w-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ${idx === 0 ? 'md:col-span-2 h-[400px]' : 'h-[300px]'}`}
                   />
                 ))}
               </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 bg-graphite/30 border border-white/10 p-8 backdrop-blur-md">
                <h3 className="text-2xl font-serif text-white mb-2">Interested?</h3>
                <p className="text-white/50 text-sm mb-8">Schedule a private viewing of {property.title}.</p>
                
                <form className="space-y-4">
                   <input type="text" placeholder="Full Name" className="w-full bg-obsidian border border-white/10 p-4 text-white text-sm outline-none focus:border-gold transition-colors" />
                   <input type="email" placeholder="Email Address" className="w-full bg-obsidian border border-white/10 p-4 text-white text-sm outline-none focus:border-gold transition-colors" />
                   <input type="tel" placeholder="Phone Number" className="w-full bg-obsidian border border-white/10 p-4 text-white text-sm outline-none focus:border-gold transition-colors" />
                   
                   <button className="w-full bg-gold text-obsidian py-4 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 mt-4 flex items-center justify-center gap-2 group">
                      Request Viewing
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </form>
                
                <p className="text-white/30 text-[10px] mt-6 text-center">
                   By submitting, you agree to our Terms of Service and Privacy Policy.
                </p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Similar Properties / Next Property Link could go here */}
    </motion.div>
  );
};

export default PropertyDetails;