import { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    year: "01",
    title: "Early Foundations",
    description:
      "Born and raised in Gujarat in a middle-class farmer family, he developed strong values and determination to build his own business.",
  },
  {
    year: "02",
    title: "Entry into Construction Industry",
    description:
      "Started as a site assistant, gaining practical knowledge in labour management, material coordination, and project execution.",
  },
  {
    year: "03",
    title: "Industry Learning Phase",
    description:
      "Studied government tender systems and project processes. Faced rejection but persisted.",
  },
  {
    year: "04",
    title: "1996 – First Government Contract",
    description:
      "Awarded first contract from Rajkot Municipal Corporation. Delivered successfully with quality and transparency.",
  },
  {
    year: "05",
    title: "Company Expansion",
    description:
      "Hi-Tech Construction expanded into roads, drainage, water supply, and civic infrastructure across multiple states.",
  },
  {
    year: "06",
    title: "Leadership & Team Building",
    description:
      "Built a skilled team and established a strong reputation for ethical and timely project completion.",
  },
  {
    year: "07",
    title: "Today",
    description:
      "Recognized as a reliable government contractor with a long-term growth vision.",
  },
];

export default function FounderTimeline() {
  const [visibleItems, setVisibleItems] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.dataset.index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-16 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-center tracking-tight leading-tight">
            Founder Journey
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            A remarkable journey of determination, innovation, and commitment to infrastructure excellence
          </p>
        </div>

        <div className="relative">
        
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-[#117072] via-[#117072]/50 to-transparent -translate-x-1/2 hidden md:block rounded-full"></div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => {
            const isVisible = visibleItems.includes(index.toString());
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-index={index}
                ref={(el) => (refs.current[index] = el)}
                className={`relative flex flex-col md:flex-row items-center justify-center md:${
                  isLeft ? "justify-start" : "justify-end"
                } mb-8 md:mb-12`}
              >
                {/* Timeline Card */}
                <div
                  className={`w-full md:w-5/12 px-4 md:px-6 transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : isLeft
                      ? "opacity-0 -translate-x-12"
                      : "opacity-0 translate-x-12"
                  }`}
                >
                  <div className="group bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                    
                    {/* Card Top Bar */}
                    <div className="h-1 bg-gradient-to-r from-[#117072] to-[#0d4f4d]"></div>
                    
                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      {/* Year Badge */}
                      <div className="inline-block">
                        <span className="text-sm font-black tracking-widest text-white bg-[#117072] px-3 py-1 rounded-full">
                          {item.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-black mt-4 mb-3 text-slate-900 group-hover:text-[#117072] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
                  {/* Outer Ring */}
                  <div className="w-8 h-8 bg-white border-4 border-[#117072] rounded-full shadow-lg relative">
                    {/* Inner Dot */}
                    <div className="absolute inset-2 bg-[#117072] rounded-full"></div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Accent */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="w-16 h-1 bg-gradient-to-r from-[#117072] to-[#0d4f4d] mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
}