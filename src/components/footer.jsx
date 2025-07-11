// same imports and start
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = (e) => {
    e.preventDefault();
    const heroSection = document.getElementById('hero') ||
      document.getElementById('home') ||
      document.querySelector('[data-section="hero"]') ||
      document.querySelector('.hero') ||
      document.body;

    heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const gmailComposeLink =
    "https://mail.google.com/mail/?view=cm&fs=1&to=azadrangrasiya@gmail.com&su=Let's%20Connect&body=Hi%20Azad,%0A%0AI%20would%20like%20to%20connect%20with%20you%20regarding%20a%20project.";

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 border-t border-gray-800 overflow-hidden" id="footer">
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Branding */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Azad</span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Visual artist blending tradition with digital expression. Exploring themes through light, emotion, and immersive form.
            </p>
            <div className="flex space-x-3 pt-3">
              {[
                { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/azad11/', label: 'LinkedIn' },
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/azad_rang_rasiya/?hl=en', label: 'Instagram' },
                { icon: 'fas fa-envelope', href: gmailComposeLink, label: 'Email' },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   className="text-gray-500 hover:text-amber-400 transition text-xl">
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About', href: '#about' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Resume', href: '#resume' },
                { name: 'Achievements', href: '#achievements' },
                { name: 'Contact', href: '#contact' },
              ].map(({ name, href }) => (
                <li key={name}>
                  <a href={href} className="hover:text-amber-400 transition">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Connect</h4>
            <a href={gmailComposeLink} target="_blank" rel="noopener noreferrer"
               className="flex items-center space-x-3 hover:text-amber-400 transition text-sm mb-4">
              <i className="fas fa-envelope text-amber-400"></i>
              <span>azadrangrasiya@gmail.com</span>
            </a>
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-sm">Available for freelance projects</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {currentYear} Azad. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7M12 3v18" />
            </svg>
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
