import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NavItem } from '../types';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.nav
      {...({
        initial: { y: -100 },
        animate: { y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      } as any)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled || location.pathname !== '/'
          ? 'bg-obsidian/80 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative text-sm uppercase tracking-widest transition-colors duration-300 py-2 group cursor-hover ${
                location.pathname === item.href ? 'text-white' : 'text-platinum/70 hover:text-white'
              }`}
            >
              {item.label}
              <span 
                className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} 
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/contact">
            <button className="bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/10 text-platinum px-6 py-3 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-hover group">
              Book Consultation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white cursor-hover"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <motion.div
          {...({
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 }
          } as any)}
          className="absolute top-full left-0 w-full bg-obsidian border-b border-white/10 p-8 flex flex-col gap-6 md:hidden h-screen"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-lg font-serif text-platinum/80 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact">
            <button className="w-full bg-gold text-obsidian py-4 font-bold uppercase tracking-widest mt-4">
              Book Consultation
            </button>
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;