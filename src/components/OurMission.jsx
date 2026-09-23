import { useEffect, useRef } from 'react';
import { Target } from 'lucide-react';

const OurMission = () => {
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!card || !container || !glow) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -((y - centerY) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      card.style.borderColor = 'rgba(20, 184, 166, 0.8)';
      card.style.boxShadow = '0 25px 60px rgba(13, 148, 136, 0.3)';
      glow.style.opacity = '1';
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-in-out, border-color 0.5s ease, box-shadow 0.5s ease';
      card.style.borderColor = 'rgba(13, 148, 136, 0.5)';
      card.style.boxShadow = '0 20px 50px rgba(13, 148, 136, 0.15)';
      glow.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease-out, border-color 0.1s ease, box-shadow 0.1s ease';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <section className="relative py-16 md:py-24 bg-slate-900 w-full selection:bg-teal-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase italic tracking-tighter mb-12 drop-shadow-md">
          Our Mission
        </h2>
        <div ref={containerRef} className="perspective-container w-full max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
          <div
            ref={cardRef}
            className="card-3d bg-gradient-to-l from-teal-950 via-teal-900 to-slate-950 border-4 border-teal-700/50 shadow-[0_20px_50px_rgba(13,148,136,0.15)] overflow-hidden relative rounded-2xl transition-transform ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              ref={glowRef}
              className="absolute -inset-px opacity-0 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(20, 184, 166, 0.25), transparent 40%)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none" style={{ transform: 'translateZ(-30px)' }}>
              <Target className="h-72 w-72 md:h-96 md:w-96 text-teal-400 animate-pulse" />
            </div>
            <div className="relative z-10 p-8 md:p-14 text-left" style={{ transform: 'translateZ(40px)' }}>
              <p className="text-teal-400 text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-8 text-center drop-shadow">
                CORE OBJECTIVES
              </p>
              <ul className="space-y-6 max-w-4xl mx-auto">
                {[
                  'Deliver quality projects within defined timelines and approved budgets.',
                  'Maintain transparency, trust, and long-term partnerships with government authorities.',
                  'Continuously upgrade technology and adopt best practices in infrastructure development.',
                  'Uphold the highest standards of integrity, safety, and regulatory compliance.',
                  'Leverage modern equipment, skilled manpower, and efficient project management systems.',
                  'Build sustainable and cost-effective infrastructure that benefits society at large.'
                ].map((objective) => (
                  <li key={objective} className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-2">
                    <span className="text-teal-500 group-hover:text-teal-300 font-bold text-lg transition-colors duration-300">▸</span>
                    <p className="text-slate-300 group-hover:text-white text-sm md:text-base leading-relaxed font-medium transition-colors duration-300">
                      {objective}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
