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
  const [activeItem, setActiveItem] = useState(0);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [tiltValues, setTiltValues] = useState({});

  const refs = useRef([]);

  /* =========================================================
     INTERSECTION OBSERVER
     ========================================================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;

            setVisibleItems((prev) => {
              if (prev.includes(index)) {
                return prev;
              }

              return [...prev, index];
            });

            setActiveItem(Number(index));
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    refs.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     3D MOUSE TILT
     ========================================================= */

  const handleMouseMove = (event, index) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 3;
    const rotateX = ((centerY - y) / centerY) * 3;

    setTiltValues((prev) => ({
      ...prev,
      [index]: {
        rotateX,
        rotateY,
      },
    }));
  };

  const resetTilt = (index) => {
    setTiltValues((prev) => ({
      ...prev,
      [index]: {
        rotateX: 0,
        rotateY: 0,
      },
    }));

    setHoveredItem(null);
  };

  return (
    <section
      className="
        relative
        py-16
        md:py-28
        bg-gradient-to-b
        from-slate-50
        via-white
        to-slate-100
        text-slate-900
        overflow-hidden
        perspective-3d
      "
    >

      {/* =====================================================
          BACKGROUND DEPTH
          ===================================================== */}

      <div
        className="
          absolute
          top-20
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#117072]/5
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-[-150px]
          w-[400px]
          h-[400px]
          rounded-full
          bg-[#117072]/5
          blur-3xl
          pointer-events-none
        "
      />


      <div
        className="
          max-w-6xl
          mx-auto
          px-4
          md:px-6
          relative
          z-10
          preserve-3d
        "
      >

        {/* ===================================================
            SECTION TITLE
            =================================================== */}

        <div
          className="
            text-center
            mb-10
            md:mb-16
            reveal-3d
            visible
          "
        >

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              uppercase
              text-center
              tracking-tight
              leading-tight
            "
          >
            Founder Journey
          </h2>

          <p
            className="
              text-slate-600
              text-sm
              md:text-base
              max-w-2xl
              mx-auto
              mt-4
            "
          >
            A remarkable journey of determination, innovation, and commitment to infrastructure excellence
          </p>

          {/* Accent */}

          <div
            className="
              w-16
              h-1
              bg-gradient-to-r
              from-[#117072]
              to-[#0d4f4d]
              mx-auto
              mt-6
              rounded-full
            "
          />

        </div>


        {/* ===================================================
            TIMELINE
            =================================================== */}

        <div className="relative preserve-3d">

          {/* =================================================
              DESKTOP TIMELINE BASE LINE
              ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-0
              w-[2px]
              h-full
              bg-slate-200
              -translate-x-1/2
              hidden
              md:block
            "
          />


          {/* =================================================
              DESKTOP ACTIVE TIMELINE LINE
              ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-0
              w-[3px]
              bg-gradient-to-b
              from-[#117072]
              via-[#117072]/70
              to-[#117072]/20
              -translate-x-1/2
              hidden
              md:block
              rounded-full
              transition-all
              duration-700
              ease-out
            "
            style={{
              height: `${Math.min(
                ((activeItem + 1) / timelineData.length) * 100,
                100
              )}%`,
            }}
          />


          {/* =================================================
              TIMELINE ITEMS
              ================================================= */}

          {timelineData.map((item, index) => {
            const isVisible = visibleItems.includes(index.toString());

            const isLeft = index % 2 === 0;

            const isActive = activeItem === index;

            const tilt = tiltValues[index] || {
              rotateX: 0,
              rotateY: 0,
            };

            return (
              <div
                key={index}
                data-index={index}
                ref={(el) => (refs.current[index] = el)}
                className={`
                  relative
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  justify-center
                  mb-8
                  md:mb-14
                  last:mb-0
                  preserve-3d

                  transition-all
                  duration-700
                  ease-out

                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >

                {/* =================================================
                    CARD
                    ================================================= */}

                <div
                  className={`
                    w-full
                    md:w-5/12
                    ${
                      isLeft
                        ? "md:mr-auto"
                        : "md:ml-auto"
                    }
                    px-1
                    md:px-4
                    preserve-3d
                  `}
                >

                  <div
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseMove={(event) =>
                      handleMouseMove(event, index)
                    }
                    onMouseLeave={() =>
                      resetTilt(index)
                    }
                    className="
                      relative
                      group
                      bg-white
                      border
                      border-slate-200
                      rounded-2xl
                      overflow-hidden
                      cursor-default
                      preserve-3d
                      transition-all
                      duration-500
                      ease-out
                    "
                    style={{
                      transform: `
                        perspective(1200px)
                        rotateX(${tilt.rotateX}deg)
                        rotateY(${tilt.rotateY}deg)
                        translateZ(${
                          hoveredItem === index ? "15px" : "0px"
                        })
                        translateY(${
                          hoveredItem === index ? "-6px" : "0px"
                        })
                      `,

                      boxShadow:
                        hoveredItem === index
                          ? "0 30px 60px rgba(15, 23, 42, 0.16)"
                          : "0 8px 24px rgba(15, 23, 42, 0.07)",
                    }}
                  >

                    {/* =================================================
                        CARD DEPTH LAYER
                        ================================================= */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#0d4f4d]
                        rounded-2xl
                        translate-x-1.5
                        translate-y-1.5
                        -z-10
                        opacity-10
                      "
                    />


                    {/* =================================================
                        TOP ACCENT
                        ================================================= */}

                    <div
                      className="
                        h-1
                        w-full
                        bg-gradient-to-r
                        from-[#117072]
                        to-[#0d4f4d]
                      "
                    />


                    {/* =================================================
                        CARD CONTENT
                        ================================================= */}

                    <div
                      className="
                        p-6
                        md:p-8
                        relative
                        preserve-3d
                      "
                    >

                      {/* =================================================
                          YEAR BADGE
                          ================================================= */}

                      <div
                        className="
                          inline-flex
                          items-center
                          justify-center
                          preserve-3d
                        "
                      >

                        <span
                          className={`
                            text-xs
                            md:text-sm
                            font-black
                            tracking-widest
                            text-white
                            bg-[#117072]
                            px-3
                            py-1.5
                            rounded-full
                            shadow-md
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "scale-105 shadow-lg"
                                : ""
                            }
                          `}
                        >
                          {item.year}
                        </span>

                      </div>


                      {/* =================================================
                          TITLE
                          ================================================= */}

                      <h3
                        className="
                          text-lg
                          md:text-xl
                          font-black
                          mt-4
                          mb-3
                          text-slate-900
                          group-hover:text-[#117072]
                          transition-colors
                          duration-300
                        "
                      >
                        {item.title}
                      </h3>


                      {/* =================================================
                          DESCRIPTION
                          ================================================= */}

                      <p
                        className="
                          text-slate-600
                          text-sm
                          md:text-base
                          leading-relaxed
                        "
                      >
                        {item.description}
                      </p>


                      {/* =================================================
                          BOTTOM DEPTH ACCENT
                          ================================================= */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          bg-[#117072]
                          transition-all
                          duration-500
                          ease-out
                        "
                        style={{
                          width:
                            hoveredItem === index
                              ? "100%"
                              : "0%",
                        }}
                      />

                    </div>

                  </div>

                </div>


                {/* =================================================
                    DESKTOP TIMELINE DOT
                    ================================================= */}

                <div
                  className="
                    hidden
                    md:flex
                    absolute
                    left-1/2
                    -translate-x-1/2
                    z-20
                    items-center
                    justify-center
                  "
                >

                  {/* Outer ring */}

                  <div
                    className={`
                      relative
                      w-9
                      h-9
                      rounded-full
                      bg-white
                      border-2
                      transition-all
                      duration-500
                      flex
                      items-center
                      justify-center

                      ${
                        isActive
                          ? "border-[#117072] scale-110 shadow-lg"
                          : "border-slate-300 shadow-md"
                      }
                    `}
                  >

                    {/* Inner dot */}

                    <div
                      className={`
                        rounded-full
                        bg-[#117072]
                        transition-all
                        duration-500

                        ${
                          isActive
                            ? "w-3 h-3"
                            : "w-2 h-2"
                        }
                      `}
                    />

                    {/* Active pulse */}

                    {isActive && (
                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          border
                          border-[#117072]/40
                          animate-ping
                        "
                      />
                    )}

                  </div>

                </div>


                {/* =================================================
                    MOBILE TIMELINE MARKER
                    ================================================= */}

                <div
                  className="
                    md:hidden
                    w-full
                    flex
                    items-center
                    gap-3
                    mt-3
                    px-2
                  "
                >

                  <div
                    className={`
                      w-2
                      h-2
                      rounded-full
                      bg-[#117072]
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "scale-150"
                          : ""
                      }
                    `}
                  />

                  <div
                    className="
                      h-px
                      flex-1
                      bg-slate-200
                    "
                  />

                </div>

              </div>
            );
          })}

        </div>


        {/* ===================================================
            BOTTOM ACCENT
            =================================================== */}

        <div
          className="
            mt-12
            md:mt-16
            text-center
          "
        >

          <div
            className="
              w-16
              h-1
              bg-gradient-to-r
              from-[#117072]
              to-[#0d4f4d]
              mx-auto
              rounded-full
            "
          />

        </div>

      </div>

    </section>
  );
}