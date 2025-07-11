import React from 'react';
import {
  faAward,
  faMedal,
  faPaintBrush,
  faStar,
  faTrophy,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const achievements = [
  {
    id: 1,
    title: 'Gold – Poster Making',
    year: '2022–23',
    description: '1st place at 36th AIU National Youth Festival, competing with top artists nationwide.',
    icon: faMedal,
    category: 'Competition',
   
  },
  {
    id: 2,
    title: 'Artist Achievement Award',
    year: '2023',
    description: 'Recognized by Chandigarh University for innovation in fine arts.',
    icon: faAward,
    category: 'Recognition',
    
  },
  {
    id: 3,
    title: 'Speed Painting Live Performance – Khan Saab',
    year: '2023',
    description: 'Performed live speed painting with Punjabi singer Khan Saab.',
    icon: faPaintBrush,
    category: 'Performance',
   
  },
  {
    id: 4,
    title: 'Gold – Clay Modeling',
    year: '2022–23',
    description: '1st place at AIU National & North-Zone Youth Festivals.',
    icon: faTrophy,
    category: 'Competition',
    
  },
  {
    id: 5,
    title: 'Gold – Still Life',
    year: '2023–24',
    description: 'Won at Punjab Youth Festival for realistic representation.',
    icon: faStar,
    category: 'Competition',
    
  },
  {
    id: 6,
    title: 'Bronze – Collage Making',
    year: '2024–25',
    description: '3rd place at 38th AIU National Youth Festival.',
    icon: faCrown,
    category: 'Competition',
    
  },
];

const Achievements = () => (
  <section
    id="achievements"
    className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 overflow-hidden"
  >
    {/* Glowing background elements - matching Resume */}
    <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
      <div className="absolute top-24 left-20 w-[28rem] h-[28rem] bg-amber-500 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-24 right-16 w-[20rem] h-[20rem] bg-amber-600 rounded-full blur-[120px] animate-pulse delay-1000" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Header */}
     <div className="text-center mb-16 max-w-3xl mx-auto">
  {/* Badge */}
  <span className="inline-block uppercase text-amber-400 text-sm font-bold tracking-widest px-6 py-2 border border-amber-400/40 rounded-full bg-amber-500/10 mb-5">
    Achievements
  </span>
  {/* Main Heading */}
  <h2 className="text-5xl sm:text-6xl font-serif font-extrabold text-white leading-tight">
    Awards &{' '}
    <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
      Recognitions
    </span>
  </h2>
  {/* Description */}
  <p className="mt-5 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
    A selection of accolades honoring dedication, creativity, and excellence across artistic and cultural platforms.
  </p>
</div>

      {/* Achievements Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map(({ id, title, year, description, icon, category }) => (
          <article
            key={id}
            className="relative group bg-gray-800/80 p-6 rounded-2xl border border-amber-500/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

           
            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wide text-amber-400 bg-amber-500/10 border border-amber-400/20 rounded-full px-2 py-0.5 select-none">
              {category}
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border border-amber-400/30 rounded-full">
                <FontAwesomeIcon icon={icon} className="text-amber-400 text-3xl" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
              <p className="text-amber-400 font-medium text-sm mb-3">{year}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {[
          { number: '10+', label: 'Total Awards' },
          { number: '6+', label: 'Gold Medals' },
          { number: '3+', label: 'National Festivals' },
          { number: '2024', label: 'Latest Recognition' },
        ].map(({ number, label }, idx) => (
          <div key={idx}>
            <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
              {number}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide mt-1 select-none">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Achievements;
