import React, { useState, useEffect } from 'react';

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { href: "#", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#gallery", label: "Gallery", id: "gallery" },
    { href: "#resume", label: "Resume", id: "resume" },
    { href: "#achievements", label: "Achievements", id: "achievements" },
    { href: "#contact", label: "Contact", id: "contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // If we're at the very top of the page, set home as active
      if (scrollPosition < 50) {
        setActiveSection('home');
        return;
      }

      // Check sections in reverse order (bottom to top)
      const sectionIds = ['contact', 'achievements', 'resume', 'gallery', 'about'];
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
          const elementTop = element.offsetTop - 100; // Account for navbar height
          if (scrollPosition >= elementTop) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      
      // Default to home if no section matches
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setIsMenuOpen(false);
    
    // Immediately set the active section when clicked
    setActiveSection(id);
    
    if (href === "#" || id === "home") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href) || document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? 'bg-gradient-to-b from-gray-800/95 to-gray-900/95 shadow-md shadow-black/20 backdrop-blur-md border-b border-gray-700/20'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 z-10">
              <button
                onClick={() => handleNavClick("#", "home")}
                className="text-2xl sm:text-3xl font-serif font-semibold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent focus:outline-none px-2 py-1"
                aria-label="Go to homepage"
              >
                Azad
              </button>
            </div>

            <div className="hidden lg:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`group relative px-4 py-2 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 focus:outline-none ${
                      activeSection === item.id 
                        ? 'text-amber-400' 
                        : 'text-gray-300 hover:text-amber-400'
                    } hover:bg-gray-800/40`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-amber-400 transition-all duration-300 transform -translate-x-1/2 ${
                      activeSection === item.id
                        ? 'w-3/4 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-2/3 group-hover:opacity-70'
                    }`}></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 rounded-lg text-amber-400 hover:text-white hover:bg-gray-800/70 transition-all duration-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 12h16" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 18h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="bg-gradient-to-b from-gray-800/98 to-gray-900/98 backdrop-blur-xl border-t border-gray-700/30 shadow-xl">
            <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={`w-full text-left px-4 py-3 rounded-sm text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none
                    text-gray-300 hover:text-amber-400 hover:bg-gray-800/40`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
