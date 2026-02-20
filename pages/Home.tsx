import React from 'react';
import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import Services from '../sections/Services';
import SplitView from '../sections/SplitView';
import PropertyShowcase from '../sections/PropertyShowcase';
import Insights from '../sections/Insights';
import Contact from '../sections/Contact';
import FinalCTA from '../sections/FinalCTA';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <PropertyShowcase />
      <SplitView />
      <Insights />
      <Contact />
      <FinalCTA />
    </>
  );
};

export default Home;