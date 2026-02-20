import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LegalProps {
  title: string;
  type: 'privacy' | 'terms';
}

const Legal: React.FC<LegalProps> = ({ title, type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="bg-obsidian min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-gold mb-12 transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Return Home</span>
        </Link>

        <motion.div
          {...({
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 }
          } as any)}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-12 border-b border-white/10 pb-8">
            {title}
          </h1>

          <div className="prose prose-invert prose-lg text-white/70 font-light prose-headings:font-serif prose-headings:text-white prose-a:text-gold">
            <p className="text-xl text-white leading-relaxed mb-8">
              Effective Date: October 24, 2024
            </p>
            
            {type === 'privacy' ? (
              <>
                <p>
                  At ELITE TENANCY, we are committed to maintaining the trust and confidence of our visitors and clients. This Privacy Policy outlines how we treat data that we collect from visitors to our website and users of our services.
                </p>
                
                <h3>1. Information Collection</h3>
                <p>
                  We collect information to provide better services to all our users. This includes information you provide to us directly (such as your name, email address, and property preferences) and information we get from your use of our services.
                </p>
                
                <h3>2. Use of Information</h3>
                <p>
                  We use the information we collect to operate, maintain, and improve our services, to develop new services, and to protect ELITE TENANCY and our users. We may use your email address to inform you about our services, such as letting you know about upcoming changes or improvements.
                </p>

                <h3>3. Data Security</h3>
                <p>
                  We work hard to protect ELITE TENANCY and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We implement bank-grade encryption and security protocols.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to ELITE TENANCY. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications. By accessing or using our Services, you agree to be bound by these Terms.
                </p>

                <h3>1. Exclusive Service</h3>
                <p>
                  Our platform provides premium tenancy and property management services. We reserve the right to refuse service to anyone for any reason at any time to maintain the exclusivity and quality of our community.
                </p>

                <h3>2. User Responsibilities</h3>
                <p>
                  You are responsible for your use of the Services and for any content you provide, including compliance with applicable laws, rules, and regulations. You should only provide content that you are comfortable sharing with others.
                </p>

                <h3>3. Intellectual Property</h3>
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of ELITE TENANCY and is protected by international copyright laws.
                </p>
              </>
            )}

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-sm opacity-50">
                For any questions regarding these terms, please contact our legal team at legal@elitetenancy.com.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;