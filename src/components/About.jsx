import React from 'react';
import {
  FaPaintBrush,
  FaPalette,
  FaFilm,
  FaAward,
  FaUsers,
  FaRocket,
  FaHeart,
  FaArrowRight,
  FaBolt
} from 'react-icons/fa';

const skills = [
  { icon: FaPaintBrush, title: 'Hyperrealism', description: 'Mastery in lifelike, immersive realism' },
  { icon: FaPalette, title: 'Murals', description: 'Narrative-driven large-scale artworks' },
  {
    icon: FaBolt,
    title: 'Speed Painting Live Performance',
    description: 'Dynamic art created in real-time.'
  },
  { icon: FaFilm, title: 'Film Direction', description: 'Cinematic visual storytelling' },
];

const highlights = [
  { icon: FaAward, number: '6+', label: 'National Awards' },
  { icon: FaUsers, number: '100+', label: 'Students Mentored' },
  { icon: FaRocket, number: '50+', label: 'Projects Completed' },
  { icon: FaHeart, number: '6', label: 'Years Experience' },
];

const About = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Contact section not found!');
    }
  };

  return (
    <section
      id="about"
      className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-24 overflow-hidden"
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .group:hover .group-hover\\:animate-wiggle {
          animation: wiggle 0.4s ease-in-out;
        }
      `}</style>

      {/* Background Blurs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-24 left-20 w-[28rem] h-[28rem] bg-amber-500 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-24 right-16 w-[20rem] h-[20rem] bg-amber-600 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center mb-4">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase px-6 py-2 border border-amber-400/40 rounded-full bg-amber-500/10">
              The Journey
            </span>
          </div>
          <h2 className="text-6xl font-serif font-bold text-white leading-tight">
            About{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
              Me
            </span>
          </h2>
        </div>

        {/* Image & Stats */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Image */}
          <div className="w-full h-full mx-auto lg:mx-0 group">
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-amber-500/10 transform hover:scale-105 transition-all duration-500 ease-out">
              <img
                src="/Profile2.jpg"
                loading="lazy"
                alt="Azad portrait"
                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-600/20 rounded-full blur-xl animate-pulse delay-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Text & Highlights */}
          <div className="space-y-8 h-full flex flex-col justify-between">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-justify">
              <p className="transform translate-y-4 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">
                I’m <span className="text-amber-400 font-bold text-xl animate-pulse">Azad</span> — a visual artist and creative director blending storytelling and technique. With{' '}
                <span className="text-amber-400 font-semibold">6+ years</span> of experience across hyperrealism, digital formats, and large-scale visuals, I explore the soul of visual narrative.
              </p>
              <p className="transform translate-y-4 opacity-0 animate-[slideUp_0.8s_ease-out_0.4s_forwards]">
                From national stages to Punjabi cinema, my work weaves emotional resonance with cultural depth. I believe art should challenge perception and stir emotion.
              </p>
              <p className="transform translate-y-4 opacity-0 animate-[slideUp_0.8s_ease-out_0.6s_forwards]">
                As a mentor and leader, I’ve guided over 100+ budding artists—shaping not just work, but movements.
              </p>

              <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/40 p-6 rounded-2xl border border-amber-500/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-500">
                <p className="text-amber-300 italic text-lg font-medium leading-relaxed">
                  "Art is not what you see, but what you make others see. Every creation is a bridge between imagination and reality."
                </p>
              </div>
            </div>

            {/* Highlight Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map(({ icon: Icon, number, label }, index) => (
                <div
                  key={index}
                  className="bg-black/40 backdrop-blur-md p-6 rounded-2xl text-center border border-gray-600/40 shadow-md hover:shadow-amber-500/10 hover:scale-105 hover:border-amber-500/40 transition-all duration-500 transform group"
                >
                  <Icon
                    className="text-amber-400 text-3xl mx-auto mb-2 group-hover:animate-wiggle transition-transform duration-300"
                    role="img"
                    aria-label={label}
                  />
                  <div className="text-white text-2xl font-bold tracking-wider group-hover:text-amber-300 transition-colors duration-300">{number}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="text-center">
          <h3 className="text-4xl font-serif font-bold text-white mb-4">
            Core{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
              Expertise
            </span>
          </h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-12">
            I bridge fine arts and digital innovation to craft evocative, immersive experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="group bg-gray-800/80 p-8 rounded-2xl border border-gray-700/50 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-500 text-center transform hover:scale-105 flex flex-col items-center justify-center min-h-[200px]"
              >
                <Icon
                  className="text-amber-400 text-4xl mb-3 transition-transform duration-300 group-hover:animate-wiggle"
                  role="img"
                  aria-label={title}
                />
                <h4 className="text-white text-2xl font-bold leading-snug text-center px-2">
                  {title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed text-center mt-2 px-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-white mb-4">
              Ready to Begin Your{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
                Creative Journey?
              </span>
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Let's collaborate and shape something unforgettable — with passion, skill, and vision.
            </p>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-900 px-7 py-3 rounded-lg font-semibold shadow-lg mt-8 w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            >
              <FaHeart className="text-lg transition-transform duration-300 group-hover:animate-wiggle" />
              <span>Let’s Create Together</span>
              <FaArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:animate-wiggle" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
