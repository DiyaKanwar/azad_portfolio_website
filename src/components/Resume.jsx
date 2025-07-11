import React from 'react';
import {
  FaDownload,
  FaBriefcase,
  FaGraduationCap,
  FaPalette,
  FaTools,
} from 'react-icons/fa';

const Resume = () => (
  <section
    id="resume"
    className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-20 overflow-hidden"
  >
    {/* Glowing background elements */}
    <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
      <div className="absolute top-24 left-20 w-[28rem] h-[28rem] bg-amber-500 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-24 right-16 w-[20rem] h-[20rem] bg-amber-600 rounded-full blur-[120px] animate-pulse delay-1000" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <span className="inline-block uppercase text-amber-400 text-sm font-bold tracking-widest px-6 py-2 border border-amber-400/40 rounded-full bg-amber-500/10 mb-5">
          Professional Journey
        </span>
        <h2 className="text-5xl sm:text-6xl font-serif font-extrabold text-white mb-4">
          My{' '}
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-transparent bg-clip-text">
            Resume
          </span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
          A comprehensive overview of my professional experience, education, and artistic expertise.
        </p>
        <a
          href="/Akaash_Azad_CV.pdf"
          download
          className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 px-7 py-3 rounded-lg font-semibold shadow-lg mt-8 hover:scale-105 transition-transform duration-300"
          aria-label="Download CV"
        >
          <FaDownload className="text-lg" />
          Download CV
        </a>

      </div>

      {/* Main Content */}
      <div className="space-y-16">
        {/* Professional Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <FaBriefcase className="text-amber-400 text-2xl" />
            </div>
            <h3 className="text-3xl font-semibold text-white">Professional Experience</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                role: 'Event Coordinator',
                org: 'Chandigarh University',
                period: '2024 – Present',
                desc: 'Leading fine arts events, mentoring students, and judging national-level competitions with focus on creative excellence.',
              },
              {
                role: 'Freelance Visual Artist',
                org: 'Self-Employed',
                period: '2014 – Present',
                desc: 'Creating hyperrealism artworks, large-scale murals, and delivering Speed Painting Live Performances at national festivals.',
              },
              {
                role: 'Assistant Art Director',
                org: 'Punjabi Film Industry',
                period: '2022 – 2025',
                desc: 'Contributing to visual storytelling and innovative set design for acclaimed films including Lekh, Jind Mahi, and Akaal.',
              },
            ].map(({ role, org, period, desc }, i) => (
              <article
                key={i}
                className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-2xl hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
              >
                <h4 className="text-xl font-semibold text-white mb-2">{role}</h4>
                <p className="text-amber-400 font-medium mb-3">
                  {org} <span className="text-gray-400">| {period}</span>
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Education & Skills Combined */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-14 auto-rows-fr items-stretch max-w-6xl mx-auto">
          {/* Education */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <FaGraduationCap className="text-amber-400 text-[1.85rem]" />
              </div>
              <h3 className="text-3xl font-semibold text-white">Education</h3>
            </div>

            <div className="space-y-6 flex-grow flex flex-col">
              {[
                {
                  degree: 'B.Sc. in Animation, VFX & Gaming',
                  inst: 'Chandigarh University',
                  period: '2021 – 2024',
                  desc: 'Specialized in 2D animation, visual effects, and digital painting.',
                },
                {
                  degree: 'B.A. in Journalism & Advanced Communication',
                  inst: 'ISBM University',
                  period: '2018 – 2021',
                  desc: 'Focused on multimedia journalism, visual communication, and digital storytelling techniques.',
                },
              ].map(({ degree, inst, period, desc }, i) => (
                <article
                  key={i}
                  className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full"
                >
                  <h4 className="text-xl font-semibold text-white mb-2">{degree}</h4>
                  <p className="text-amber-400 font-medium mb-3">
                    {inst} <span className="text-gray-400">| {period}</span>
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">{desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <FaTools className="text-amber-400 text-2xl" />
              </div>
              <h3 className="text-3xl font-semibold text-white">Skills & Expertise</h3>
            </div>

            <div className="space-y-6 flex-grow flex flex-col">
              {[
                {
                  category: 'Visual Arts',
                  icon: <FaPalette className="text-amber-400 text-xl" />,
                  skills: ['Hyperrealism Drawing', 'Digital Painting', 'Mural Art', 'Speed Painting Live Performance', 'Portrait Art', 'Calligraphy'],
                },
                {
                  category: 'Technical Skills',
                  icon: <FaTools className="text-amber-400 text-xl" />,
                  skills: ['3D Animation', 'Set Design', 'Art Direction', 'Digital illustration'],
                },
              ].map(({ category, icon, skills }, i) => (
                <article
                  key={i}
                  className="bg-gray-800/80 border border-gray-700/50 p-6 rounded-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {icon}
                    <h4 className="text-xl font-semibold text-white">{category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium text-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>



      </div>
    </div>
  </section>
);

export default Resume;
