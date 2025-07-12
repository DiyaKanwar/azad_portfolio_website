import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 max-w-full overflow-x-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* Soft background gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-slate-800/60"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-gray-900/40 to-slate-950/90"></div>

        {/* Faint floating orb */}
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl animate-fade-pulse opacity-50"></div>

        {/* Faint brush stroke */}
        <div className="absolute top-16 left-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-amber-400/15 to-transparent blur-sm animate-brush-stroke opacity-30"></div>

        {/* Aurora layer */}
        <div className="absolute inset-0 animate-aurora-move">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-[#f3c96920] to-transparent blur-3xl opacity-40 rotate-12 scale-150"></div>
        </div>

        {/* Mouse Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 158, 11, 0.15) 0%, rgba(243, 201, 105, 0.1) 15%, rgba(245, 158, 11, 0.05) 30%, rgba(245, 158, 11, 0.02) 45%, transparent 60%)`
          }}
        />

        {/* Sparkles */}
        {[
          { top: '20%', left: '70%', delay: '0s' },
          { top: '60%', left: '25%', delay: '1.5s' },
          { top: '85%', left: '60%', delay: '3s' },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-300 rounded-full animate-sparkle opacity-60"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              boxShadow: '0 0 4px rgba(245,158,11,0.8)',
            }}
          />
        ))}

        {/* Single idle-style floating particle */}
        <div className="absolute top-[55%] left-[35%] w-5 h-5 bg-gradient-to-br from-amber-400/20 to-orange-500/10 blur-lg rounded-[50%_50%_80%_20%] animate-float-slow opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="inline-block mb-8 group">
          <div className="relative px-8 py-3 rounded-full text-sm font-medium tracking-[0.3em] backdrop-blur-xl bg-slate-900/40 border border-amber-400/30 text-amber-300 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-300/30 hover:bg-amber-950/20 cursor-default">
            <span className="relative z-10 group-hover:text-[#FBBF24] transition-colors duration-300">
              VISUAL ARTIST
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-md pointer-events-none"></div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="relative mb-6">
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-200 font-bold"
              style={{
                fontFamily: "'Lateef', serif",
                fontSize: 'clamp(6rem, 12vw, 12rem)',
                lineHeight: '0.8',
                textShadow: '0 0 40px rgba(245,158,11,0.4), 0 0 80px rgba(243,201,105,0.2), 0 20px 40px rgba(0,0,0,0.7)'
              }}
            >
              آزاد
            </span>
          </h1>
          <div className="relative">
            <span
              className="block text-white font-light tracking-[0.4em] opacity-90"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 0 20px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              AZAD
            </span>
          </div>
        </div>

        <p className="text-2xl md:text-3xl mb-16 text-gray-200 font-light max-w-4xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            lineHeight: '1.6'
          }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-yellow-300 to-orange-300 font-medium">
            Transforming fleeting memory
          </span>{' '}
          into form, and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-[#fbbf24] to-amber-400 font-medium">
            emotion into color with each brushstroke, a moment, a vision, a story unfolding.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <a
            href="#gallery"
            className="group relative px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-amber-500 transition-all duration-500 shadow-md hover:shadow-amber-300/40 transform hover:scale-110 hover:-translate-y-2 border border-amber-400/30"
          >
            EXPLORE PORTFOLIO
          </a>
          <a
            href="#resume"
            className="group relative px-12 py-5 bg-transparent border-2 border-[#fbbf24]/40 text-[#fbbf24] font-semibold text-lg rounded-2xl hover:border-[#fbbf24] hover:bg-[#fbbf24]/10 transition-all duration-500 backdrop-blur-xl flex items-center justify-center transform hover:scale-110 hover:-translate-y-2 shadow-xl shadow-[#fbbf24]/10 hover:shadow-[#fbbf24]/30"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <a
          href="#about"
          className="group flex flex-col items-center text-[#fbbf24]/60 hover:text-[#fbbf24] transition-all duration-700 cursor-pointer"
        >
          <div className="relative mb-3 w-7 h-12 border-2 border-[#fbbf24]/40 rounded-full flex items-start justify-center overflow-hidden">
            <div className="w-1 h-3 bg-[#fbbf24] rounded-full animate-scroll-dot mt-2"></div>
          </div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium group-hover:text-[#fbbf24] transition-colors duration-500">
            DISCOVER MORE
          </span>
        </a>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes aurora-move {
          0%, 100% { transform: translateX(-100%) rotate(12deg) scale(150%); }
          50% { transform: translateX(100%) rotate(12deg) scale(150%); }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
        }

        @keyframes brush-stroke {
          0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
          50% { transform: translateX(0%) scaleX(1); opacity: 0.5; }
          100% { transform: translateX(100%) scaleX(0); opacity: 0; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes fade-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }

        @keyframes scroll-dot {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }

        .animate-aurora-move { animation: aurora-move 25s ease-in-out infinite; }
        .animate-brush-stroke { animation: brush-stroke 12s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-fade-pulse { animation: fade-pulse 10s ease-in-out infinite; }
        .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
