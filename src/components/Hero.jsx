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
    <section className="relative h-screen flex items-center justify-center overflow-hidden max-w-full overflow-x-hidden">
      {/* Background Image Layer */}
      <div 
  className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain sm:bg-cover"
  style={{
    backgroundImage: 'url("/Herobg.jpg")',
    backgroundAttachment: 'scroll'
  }}
/>


      {/* Background Overlay Effects - Optimized for Performance */}
      {/* Desktop Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block">
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/70 via-transparent to-gray-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-slate-800/50"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-gray-900/40 to-slate-950/70"></div>

        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-amber-500/15 to-orange-500/10 rounded-full blur-2xl animate-breathing opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-bl from-orange-500/10 to-amber-600/8 rounded-full blur-xl animate-breathing opacity-35" style={{ animationDelay: '5s' }}></div>

        {/* Aurora Background Layers */}
        <div className="absolute inset-0 animate-aurora-move">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-[#f3c96930] to-transparent blur-2xl opacity-40 rotate-12 scale-125"></div>
        </div>
        <div className="absolute inset-0 animate-aurora-move-reverse">
          <div className="absolute w-full h-full bg-gradient-to-l from-transparent via-[#fbbf2420] to-transparent blur-xl opacity-30 rotate-[-8deg] scale-110"></div>
        </div>

        {/* Subtle Mouse Glow */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-50 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(245, 158, 11, 0.12) 0%, rgba(243, 201, 105, 0.07) 15%, rgba(245, 158, 11, 0.05) 30%, transparent 55%)`
          }}
        />

        {/* Sparkles */}
        {[
          { top: '15%', left: '75%', delay: '0s', size: 'w-1 h-1' },
          { top: '25%', left: '20%', delay: '1s', size: 'w-0.5 h-0.5' },
          { top: '45%', left: '85%', delay: '2s', size: 'w-1.5 h-1.5' },
          { top: '65%', left: '30%', delay: '3s', size: 'w-1 h-1' },
          { top: '80%', left: '65%', delay: '4s', size: 'w-1 h-1' },
        ].map((s, i) => (
          <div
            key={i}
            className={`absolute ${s.size} bg-amber-300 rounded-full animate-sparkle opacity-70`}
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              boxShadow: '0 0 6px rgba(245,158,11,0.9), 0 0 12px rgba(245,158,11,0.5)'
            }}
          />
        ))}

        {/* Few Light Floaters */}
        <div className="absolute top-[55%] left-[35%] w-5 h-5 bg-gradient-to-br from-amber-400/25 to-orange-500/15 blur-md rounded-[60%_40%_80%_20%] animate-float-slow opacity-50" />
        <div className="absolute top-[25%] right-[30%] w-4 h-4 bg-gradient-to-br from-orange-400/20 to-amber-500/10 blur-md rounded-[80%_20%_60%_40%] animate-float-slow opacity-45" style={{ animationDelay: '3s' }} />
      </div>

      {/* Mobile Glow - lightweight static */}
      <div className="absolute inset-0 z-10 pointer-events-none sm:hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-amber-500/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="inline-block mb-8 group">
          <div className="relative px-10 py-4 rounded-full text-sm font-medium tracking-[0.3em] backdrop-blur-2xl bg-gradient-to-r from-slate-900/60 to-slate-800/50 border border-amber-400/50 text-amber-300 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-300/50 hover:bg-gradient-to-r hover:from-amber-950/40 hover:to-amber-900/30 cursor-default transform hover:scale-105">
            <span className="relative z-10 group-hover:text-[#FBBF24] transition-colors duration-500">
              VISUAL ARTIST
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/30 to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-60 transition-all duration-700 blur-sm pointer-events-none"></div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="relative mb-6 group">
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-100 via-yellow-50 to-orange-100 font-bold drop-shadow-lg transition-all duration-700 group-hover:scale-105"
              style={{
                fontFamily: "'Lateef', serif",
                fontSize: 'clamp(6rem, 12vw, 12rem)',
                lineHeight: '0.8',
                textShadow: '0 0 20px rgba(245,158,11,0.25), 0 0 40px rgba(243,201,105,0.2), 0 10px 20px rgba(0,0,0,0.7)',
                filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.3))'
              }}
            >
              آزاد
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"></div>
          </h1>

          <div className="relative group">
            <span
              className="block text-white font-light tracking-[0.4em] opacity-95 transition-all duration-500 group-hover:opacity-100"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 0 30px rgba(255,255,255,0.4), 0 15px 40px rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
              }}
            >
              AZAD
            </span>
          </div>
        </div>

        <p className="text-2xl md:text-3xl mb-16 text-gray-100 font-light max-w-4xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.9)',
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

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#gallery"
            className="group relative px-14 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-amber-500 transition-all duration-700 shadow-xl hover:shadow-2xl hover:shadow-amber-300/60 transform hover:scale-110 hover:-translate-y-3 border border-amber-400/50 overflow-hidden"
          >
            <span className="relative z-10">EXPLORE PORTFOLIO</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/50 to-yellow-300/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
          <a
            href="#resume"
            className="group relative px-14 py-6 bg-transparent border-2 border-[#fbbf24]/60 text-[#fbbf24] font-semibold text-lg rounded-2xl hover:border-[#fbbf24] hover:bg-[#fbbf24]/20 transition-all duration-700 backdrop-blur-2xl flex items-center justify-center transform hover:scale-110 hover:-translate-y-3 shadow-2xl shadow-[#fbbf24]/20 hover:shadow-[#fbbf24]/50 overflow-hidden"
          >
            <span className="relative z-10">DOWNLOAD RESUME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#fbbf24]/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <a
          href="#about"
          className="group flex flex-col items-center text-[#fbbf24]/80 hover:text-[#fbbf24] transition-all duration-700 cursor-pointer"
        >
          <div className="relative mb-4 w-8 h-14 border-2 border-[#fbbf24]/60 hover:border-[#fbbf24] rounded-full flex items-start justify-center overflow-hidden backdrop-blur-sm bg-black/20 group-hover:bg-black/30 transition-all duration-500">
            <div className="w-1.5 h-4 bg-[#fbbf24] rounded-full animate-scroll-dot mt-2 group-hover:bg-amber-300 transition-colors duration-300"></div>
          </div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium group-hover:text-[#fbbf24] transition-colors duration-500 opacity-90 group-hover:opacity-100">
            DISCOVER MORE
          </span>
        </a>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes aurora-move {
          0%, 100% { transform: translateX(-100%) rotate(12deg) scale(150%); }
          50% { transform: translateX(100%) rotate(12deg) scale(150%); }
        }

        @keyframes aurora-move-reverse {
          0%, 100% { transform: translateX(100%) rotate(-8deg) scale(125%); }
          50% { transform: translateX(-100%) rotate(-8deg) scale(125%); }
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }

        @keyframes brush-stroke {
          0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
          50% { transform: translateX(0%) scaleX(1); opacity: 0.7; }
          100% { transform: translateX(100%) scaleX(0); opacity: 0; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(8px) rotate(5deg); }
          66% { transform: translateY(-25px) translateX(-5px) rotate(-3deg); }
        }

        @keyframes breathing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        @keyframes scroll-dot {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }

        .animate-aurora-move { animation: aurora-move 30s ease-in-out infinite; }
        .animate-aurora-move-reverse { animation: aurora-move-reverse 25s ease-in-out infinite; }
        .animate-brush-stroke { animation: brush-stroke 14s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-breathing { animation: breathing 8s ease-in-out infinite; }
        .animate-scroll-dot { animation: scroll-dot 2.5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;