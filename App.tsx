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
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ContactPage from './pages/ContactPage';
import { AnimatePresence } from 'framer-motion';
import RoleGuard from './components/RoleGuard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import TenantDashboard from './pages/dashboards/TenantDashboard';
import LandlordDashboard from './pages/dashboards/LandlordDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Listings from './pages/landlord/Listings';
import NewListing from './pages/landlord/NewListing';
import PostsManager from './pages/admin/PostsManager';
import PostEditor from './pages/admin/PostEditor';

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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route path="/tenant/dashboard" element={<RoleGuard allow={['tenant']}><TenantDashboard /></RoleGuard>} />
        <Route path="/landlord/dashboard" element={<RoleGuard allow={['landlord']}><LandlordDashboard /></RoleGuard>} />
        <Route path="/landlord/listings" element={<RoleGuard allow={['landlord']}><Listings /></RoleGuard>} />
        <Route path="/landlord/listings/new" element={<RoleGuard allow={['landlord']}><NewListing /></RoleGuard>} />
        <Route path="/admin/dashboard" element={<RoleGuard allow={['admin', 'owner']}><AdminDashboard /></RoleGuard>} />
        <Route path="/admin/cms/posts" element={<RoleGuard allow={['admin', 'owner']}><PostsManager /></RoleGuard>} />
        <Route path="/admin/cms/posts/new" element={<RoleGuard allow={['admin', 'owner']}><PostEditor /></RoleGuard>} />
        <Route path="/admin/cms/posts/:id/edit" element={<RoleGuard allow={['admin', 'owner']}><PostEditor /></RoleGuard>} />

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
