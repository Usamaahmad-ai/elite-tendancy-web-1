import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
       const element = document.querySelector(href);
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
    } else {
       navigate('/');
       setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
       }, 100);
    }
  };

  return (
    <footer className="bg-obsidian pt-24 pb-12 border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
           <div className="mb-12 md:mb-0">
             <div className="mb-8">
               <Logo isFooter />
             </div>
             <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                Defining the future of luxury tenancy and asset management through technology, precision, and unparalleled service.
             </p>
           </div>

           <div className="flex gap-16">
              <div>
                 <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
                 <ul className="space-y-4">
                    <li><Link to="/services" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Services</Link></li>
                    <li><Link to="/properties" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Properties</Link></li>
                    <li><Link to="/about" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">About</Link></li>
                    <li><Link to="/insights" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Insights</Link></li>
                    <li><Link to="/contact" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Contact</Link></li>
                 </ul>
              </div>
              <div>
                 <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Legal</h4>
                 <ul className="space-y-4">
                    <li><Link to="/privacy" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Privacy Policy</Link></li>
                    <li><Link to="/terms" className="text-white/60 hover:text-gold text-sm transition-colors cursor-hover">Terms of Service</Link></li>
                 </ul>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
           <p className="text-white/20 text-xs mb-4 md:mb-0">© 2024 Elite Tenancy. All rights reserved.</p>
           
           <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-gold transition-colors cursor-hover"><Facebook size={18}/></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors cursor-hover"><Twitter size={18}/></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors cursor-hover"><Instagram size={18}/></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors cursor-hover"><Linkedin size={18}/></a>
           </div>

           <button onClick={scrollToTop} className="fixed bottom-8 right-8 w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 rounded-full z-40 cursor-hover">
              <ArrowUp size={20} />
           </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;