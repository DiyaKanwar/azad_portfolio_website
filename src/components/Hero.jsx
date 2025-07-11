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
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Additional artistic gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-slate-800/60"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-gray-900/40 to-slate-950/90"></div>

        {/* Artistic floating orbs - larger and more dynamic */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl animate-pulse delay-1000 opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/3 rounded-full blur-[100px] animate-pulse delay-2000"></div>

        {/* Artist's palette-inspired organic shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-500/5 rounded-[40%_60%_70%_30%] blur-2xl animate-morph opacity-70"></div>
        <div className="absolute bottom-32 left-16 w-40 h-24 bg-gradient-to-tr from-yellow-500/8 to-amber-600/6 rounded-[60%_40%_30%_70%] blur-xl animate-morph-reverse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-36 bg-gradient-to-bl from-amber-300/12 to-orange-400/8 rounded-[50%_50%_80%_20%] blur-lg animate-morph-slow opacity-50"></div>

        {/* Paint stroke inspired elements */}
        <div className="absolute top-16 left-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-sm animate-brush-stroke opacity-60"></div>
        <div className="absolute bottom-24 right-1/3 w-48 h-1 bg-gradient-to-l from-transparent via-yellow-500/15 to-transparent blur-sm animate-brush-stroke-reverse opacity-50"></div>

        {/* Amber Glow at Cursor */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(245, 158, 11, 0.15) 0%, 
              rgba(243, 201, 105, 0.1) 15%, 
              rgba(245, 158, 11, 0.05) 30%, 
              rgba(245, 158, 11, 0.02) 45%, 
              transparent 60%)`
          }}
        />

        {/* Enhanced Aurora Waves - more artistic with paint-like flow */}
        <div className="absolute inset-0 animate-aurora-move">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-[#f3c96920] to-transparent blur-3xl opacity-50 rotate-12 transform scale-150"></div>
        </div>
        <div className="absolute inset-0 animate-aurora-reverse">
          <div className="absolute w-full h-full bg-gradient-to-l from-transparent via-[#f59e0b20] to-transparent blur-3xl opacity-40 -rotate-12 transform scale-125"></div>
        </div>
        <div className="absolute inset-0 animate-aurora-slow">
          <div className="absolute w-full h-full bg-gradient-to-br from-transparent via-[#fbbf2415] to-transparent blur-2xl opacity-30 rotate-45"></div>
        </div>

        {/* Artist canvas texture overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(245,158,11,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(251,191,36,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 50% 10%, rgba(245,158,11,0.15) 0%, transparent 40%)`,
          filter: 'blur(1px)'
        }}></div>

        {/* Artistic floating particles - more organic */}
        <div className="absolute inset-0">
          {[
            { top: '15%', left: '10%', size: 'w-4 h-4', delay: '0s', shape: 'rounded-full' },
            { top: '25%', left: '80%', size: 'w-6 h-6', delay: '1s', shape: 'rounded-[60%_40%]' },
            { top: '45%', left: '20%', size: 'w-3 h-3', delay: '2s', shape: 'rounded-full' },
            { top: '65%', left: '70%', size: 'w-5 h-5', delay: '3s', shape: 'rounded-[40%_60%]' },
            { top: '80%', left: '30%', size: 'w-4 h-4', delay: '4s', shape: 'rounded-full' },
            { top: '35%', left: '60%', size: 'w-7 h-7', delay: '2.5s', shape: 'rounded-[70%_30%]' },
            { top: '55%', left: '85%', size: 'w-2 h-2', delay: '1.5s', shape: 'rounded-full' },
            { top: '75%', left: '15%', size: 'w-3 h-5', delay: '3.5s', shape: 'rounded-[50%_50%_80%_20%]' },
          ].map((particle, i) => (
            <div
              key={i}
              className={`absolute ${particle.size} ${particle.shape} bg-gradient-to-br from-amber-400/25 to-orange-500/15 blur-lg animate-float-particle opacity-40`}
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: `${8 + i}s`
              }}
            />
          ))}

          {/* Artist's signature sparkles */}
          {[
            { top: '20%', left: '70%', delay: '0s' },
            { top: '60%', left: '25%', delay: '2s' },
            { top: '40%', left: '80%', delay: '4s' },
            { top: '85%', left: '60%', delay: '1s' },
          ].map((sparkle, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-amber-300 animate-sparkle opacity-60"
              style={{
                top: sparkle.top,
                left: sparkle.left,
                animationDelay: sparkle.delay,
                boxShadow: '0 0 4px rgba(245,158,11,0.8)'
              }}
            />
          ))}
        </div>

        {/* Artistic depth layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,158,11,0.1)_0%,transparent_50%)] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(251,191,36,0.08)_0%,transparent_60%)] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-gray-950/20 z-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Visual Artist Badge */}
        <div className="inline-block mb-8 group animate-float-in">
          <div className="relative px-8 py-3 rounded-full text-sm font-medium tracking-[0.3em] 
                          backdrop-blur-xl bg-slate-900/40 border border-amber-400/30 text-amber-300 
                          transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-300/30 
                          hover:bg-amber-950/20 cursor-default">

            {/* Main Text */}
            <span className="relative z-10 group-hover:text-[#FBBF24] transition-colors duration-300">
              VISUAL ARTIST
            </span>

            {/* Subtle Background Glow on Hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-400/20 
                            opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-md pointer-events-none"></div>
          </div>
        </div>

        {/* Name */}
        <div className="mb-12 animate-title-emerge">
          <h1 className="relative mb-6">
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-200 font-bold animate-gradient-text"
              style={{
                fontFamily: "'Lateef', serif",
                fontSize: 'clamp(6rem, 12vw, 12rem)',
                lineHeight: '0.8',
                textShadow: '0 0 40px rgba(245,158,11,0.4), 0 0 80px rgba(243,201,105,0.2), 0 20px 40px rgba(0,0,0,0.7)'
              }}
            >
              آزاد
            </span>
            <span
              className="absolute top-3 left-3 block text-amber-900/60 font-bold -z-10"
              style={{
                fontFamily: "'Lateef', serif",
                fontSize: 'clamp(6rem, 12vw, 12rem)',
                filter: 'blur(2px)'
              }}
            >
              آزاد
            </span>
          </h1>

          <div className="relative">
            <span
              className="block text-white font-light tracking-[0.4em] opacity-90 animate-subtitle-glow"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                textShadow: '0 0 20px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              AZAD
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-2xl md:text-3xl mb-16 text-gray-200 font-light max-w-4xl mx-auto leading-relaxed animate-desc-fade-in"
          style={{
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
            lineHeight: '1.6'
          }}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-yellow-300 to-orange-300 font-medium animate-gradient-text">
            Transforming fleeting memory
          </span>{' '}
          into form, and{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-[#fbbf24] to-amber-400 font-medium animate-gradient-text-reverse">
            emotion into color with each brushstroke, a moment, a vision, a story unfolding.
          </span>
        </p>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-cta-rise">
          <a
            href="#gallery"
            className="group relative px-12 py-5 
                     bg-gradient-to-r from-amber-500 to-amber-600 
                     text-gray-900 font-bold text-lg rounded-2xl 
                     hover:from-amber-400 hover:to-amber-500 
                     transition-all duration-500 
                     shadow-md hover:shadow-amber-300/40 
                     transform hover:scale-110 hover:-translate-y-2 
                     border border-amber-400/30"
          >
            <span className="relative z-10 flex items-center justify-center tracking-wide">
              EXPLORE PORTFOLIO
              <svg
                className="ml-4 w-6 h-6 transform group-hover:translate-x-3 group-hover:scale-110 transition-all duration-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>

            <div className="absolute inset-0 bg-gradient-to-r 
                          from-orange-400 to-yellow-400 
                          opacity-0 group-hover:opacity-40 
                          transition-opacity duration-500 
                          rounded-2xl blur-md pointer-events-none">
            </div>
          </a>

          <a
            href="#resume"
            className="group relative px-12 py-5 bg-transparent border-2 border-[#fbbf24]/40 text-[#fbbf24] font-semibold text-lg rounded-2xl hover:border-[#fbbf24] hover:bg-[#fbbf24]/10 transition-all duration-500 backdrop-blur-xl flex items-center justify-center transform hover:scale-110 hover:-translate-y-2 shadow-xl shadow-[#fbbf24]/10 hover:shadow-[#fbbf24]/30"
          >
            <span className="flex items-center tracking-wide">
              DOWNLOAD RESUME
              <svg className="ml-4 w-6 h-6 transform group-hover:translate-y-2 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </a>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-scroll-float">
        <a
          href="#about"
          className="group flex flex-col items-center text-[#fbbf24]/60 hover:text-[#fbbf24] transition-all duration-700 cursor-pointer"
        >
          <div className="relative mb-3 w-7 h-12 border-2 border-[#fbbf24]/40 rounded-full flex items-start justify-center overflow-hidden">
            <div className="w-1 h-3 bg-[#fbbf24] rounded-full animate-scroll-dot mt-2"></div>
          </div>
          <span className="text-xs uppercase tracking-[0.4em] font-medium group-hover:text-[#fbbf24] transition-colors duration-500 animate-pulse">
            DISCOVER MORE
          </span>
        </a>
      </div>

      <style>{`
        @keyframes aurora-move {
          0%, 100% { transform: translateX(-100%) rotate(12deg) scale(150%); }
          50% { transform: translateX(100%) rotate(12deg) scale(150%); }
        }
        
        @keyframes aurora-reverse {
          0%, 100% { transform: translateX(100%) rotate(-12deg) scale(125%); }
          50% { transform: translateX(-100%) rotate(-12deg) scale(125%); }
        }
        
        @keyframes aurora-slow {
          0%, 100% { transform: rotate(45deg) scale(100%); opacity: 0.3; }
          50% { transform: rotate(50deg) scale(110%); opacity: 0.5; }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 70% 30%; transform: rotate(0deg) scale(1); }
          25% { border-radius: 60% 40% 30% 70%; transform: rotate(90deg) scale(1.1); }
          50% { border-radius: 70% 30% 60% 40%; transform: rotate(180deg) scale(0.9); }
          75% { border-radius: 30% 70% 40% 60%; transform: rotate(270deg) scale(1.05); }
        }
        
        @keyframes morph-reverse {
          0%, 100% { border-radius: 60% 40% 30% 70%; transform: rotate(360deg) scale(1); }
          25% { border-radius: 30% 70% 60% 40%; transform: rotate(270deg) scale(0.95); }
          50% { border-radius: 70% 30% 40% 60%; transform: rotate(180deg) scale(1.1); }
          75% { border-radius: 40% 60% 70% 30%; transform: rotate(90deg) scale(0.9); }
        }
        
        @keyframes morph-slow {
          0%, 100% { border-radius: 50% 50% 80% 20%; transform: scale(1) rotate(0deg); }
          50% { border-radius: 20% 80% 50% 50%; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes brush-stroke {
          0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
          50% { transform: translateX(0%) scaleX(1); opacity: 1; }
          100% { transform: translateX(100%) scaleX(0); opacity: 0; }
        }
        
        @keyframes brush-stroke-reverse {
          0% { transform: translateX(100%) scaleX(0); opacity: 0; }
          50% { transform: translateX(0%) scaleX(1); opacity: 1; }
          100% { transform: translateX(-100%) scaleX(0); opacity: 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes title-emerge {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes subtitle-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5); }
          50% { text-shadow: 0 0 30px rgba(255,255,255,0.4), 0 10px 30px rgba(0,0,0,0.5); }
        }
        
        @keyframes desc-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes cta-rise {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scroll-float {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes scroll-dot {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-text-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.2; }
          25% { transform: translateY(-30px) translateX(10px) scale(1.2); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(-15px) scale(0.8); opacity: 0.6; }
          75% { transform: translateY(-40px) translateX(20px) scale(1.1); opacity: 0.3; }
        }
        
        .animate-aurora-move { animation: aurora-move 25s ease-in-out infinite; }
        .animate-aurora-reverse { animation: aurora-reverse 30s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 40s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 8s ease-in-out infinite; }
        .animate-morph { animation: morph 15s ease-in-out infinite; }
        .animate-morph-reverse { animation: morph-reverse 18s ease-in-out infinite; }
        .animate-morph-slow { animation: morph-slow 25s ease-in-out infinite; }
        .animate-brush-stroke { animation: brush-stroke 12s ease-in-out infinite; }
        .animate-brush-stroke-reverse { animation: brush-stroke-reverse 14s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 3s ease-in-out infinite; }
        .animate-float-in { animation: float-in 1s ease-out 0.5s both; }
        .animate-title-emerge { animation: title-emerge 1.2s ease-out 1s both; }
        .animate-subtitle-glow { animation: subtitle-glow 3s ease-in-out infinite; }
        .animate-desc-fade-in { animation: desc-fade-in 1s ease-out 1.8s both; }
        .animate-cta-rise { animation: cta-rise 1s ease-out 2.2s both; }
        .animate-scroll-float { animation: scroll-float 2s ease-in-out infinite; }
        .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
        .animate-gradient-text { 
          background-size: 200% 200%; 
          animation: gradient-text 4s ease-in-out infinite; 
        }
        .animate-gradient-text-reverse { 
          background-size: 200% 200%; 
          animation: gradient-text-reverse 4s ease-in-out infinite; 
        }
      `}</style>
    </section>
  );
};
<div className="absolute inset-0 mix-blend-soft-light opacity-5 z-10 pointer-events-none"
     style={{
       backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAABU6rVJAAAACXBIWXMAAAsSAAALEgHS3X78AAAAvElEQVR4nO3YQQ7CMAwF0Z3Tf//G2LApXwxlT93iZqRx3ZBiJ9zKxHgECBAgQIPAfwPv1F3cOejbR9aX3H7kSPK7ZP4fdUCeub7R6cJKH7Er3M7xptpAX+19RUcKN3tAkYoYlxhM52WUJRGUMSHERNEjBDRoxAoY4XEPGLFyjBKOMeUUMSHERNEjBDRoxAoY4XEPGLFyjBKOMeUUMSEb/AL/xwb45tGNhgAAAABJRU5ErkJggg==")`,
       backgroundSize: '100px 100px'
     }}
></div>


export default Hero;