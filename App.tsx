import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Legal from './pages/Legal';
import ServicesPage from './pages/ServicesPage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/privacy" element={<Legal title="Privacy Policy" type="privacy" />} />
        <Route path="/terms" element={<Legal title="Terms of Service" type="terms" />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-obsidian min-h-screen text-platinum selection:bg-gold/30 selection:text-white">
      <HashRouter>
        {/* Non-touch devices get custom cursor */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <Navbar />

        <main>
          <AnimatedRoutes />
        </main>

        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;