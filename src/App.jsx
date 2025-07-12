import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Resume from './components/Resume';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      AOS.init({ duration: 800, once: true });
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-amber-500/20 selection:text-amber-200">
      <Navbar isScrolled={isScrolled} />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Resume />
        <Achievements />
        <Contact />
      </main>
       <Footer /> 
    </div>
  );
};

export default App;
