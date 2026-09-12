import { useRef, useState } from "react";

import logo1 from "./assets/clients/Kalpataru.svg";
import logo2 from "./assets/clients/L&T.svg";
import logo3 from "./assets/clients/PGVCL.svg";
import logo4 from "./assets/clients/R&B - Copy.png";
import logo5 from "./assets/clients/RMC.svg";
import logo6 from "./assets/clients/Tata_logo.svg";

const clients = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
];

/* =========================================================
   3D CLIENT CARD
   ========================================================= */

function ClientLogoCard({ logo }) {
  const cardRef = useRef(null);

  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = ((centerY - y) / centerY) * 6;

    setTilt({
      rotateX,
      rotateY,
    });
  };

  const resetTilt = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
    });

    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="
        relative
        flex
        items-center
        justify-center
        flex-shrink-0
        w-44
        h-32
        md:w-52
        md:h-36
        perspective-3d
      "
    >

      {/* =====================================================
          CARD SHADOW / DEPTH
          ===================================================== */}

      <div
        className="
          absolute
          inset-3
          rounded-2xl
          bg-slate-900/10
          blur-xl
          transition-all
          duration-500
          pointer-events-none
        "
        style={{
          opacity: hovered ? 0.45 : 0.2,
          transform: hovered
            ? "translateY(10px) scale(0.9)"
            : "translateY(5px) scale(0.95)",
        }}
      />

      {/* =====================================================
          3D CARD
          ===================================================== */}

      <div
        className="
          relative
          w-full
          h-full
          rounded-2xl
          bg-white
          border
          border-slate-200
          flex
          items-center
          justify-center
          preserve-3d
          transition-transform
          duration-300
          ease-out
          overflow-hidden
        "
        style={{
          transform: `
            perspective(900px)
            rotateX(${tilt.rotateX}deg)
            rotateY(${tilt.rotateY}deg)
            translateZ(${hovered ? "12px" : "0px"})
            translateY(${hovered ? "-6px" : "0px"})
          `,
          boxShadow: hovered
            ? "0 25px 50px rgba(15, 23, 42, 0.16)"
            : "0 8px 20px rgba(15, 23, 42, 0.06)",
        }}
      >

        {/* =================================================
            TOP HIGHLIGHT
            ================================================= */}

        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-[#117072]
            to-transparent
            transition-opacity
            duration-300
          "
          style={{
            opacity: hovered ? 1 : 0.25,
          }}
        />


        {/* =================================================
            LIGHT REFLECTION
            ================================================= */}

        <div
          className="
            absolute
            -top-20
            -right-20
            w-32
            h-32
            rounded-full
            bg-[#117072]/10
            blur-2xl
            pointer-events-none
            transition-all
            duration-500
          "
          style={{
            transform: hovered
              ? "translate(-10px, 10px) scale(1.3)"
              : "scale(1)",
          }}
        />


        {/* =================================================
            LOGO
            ================================================= */}

        <img
          src={logo}
          alt="client"
          draggable="false"
          className="
            relative
            z-10
            max-h-[68%]
            max-w-[72%]
            object-contain
            grayscale
            opacity-65
            select-none
            transition-all
            duration-500
            ease-out
          "
          style={{
            filter: hovered
              ? "grayscale(0)"
              : "grayscale(1)",
            opacity: hovered ? 1 : 0.65,
            transform: hovered
              ? "translateZ(22px) scale(1.08)"
              : "translateZ(0) scale(1)",
          }}
        />

      </div>
    </div>
  );
}


/* =========================================================
   MAIN CLIENT SECTION
   ========================================================= */

export default function ClientSection() {
  return (
    <section
      className="
        relative
        py-16
        md:py-28
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
        overflow-hidden
        perspective-3d
      "
    >

      {/* =====================================================
          BACKGROUND 3D ELEMENTS
          ===================================================== */}

      <div
        className="
          absolute
          top-10
          left-[-120px]
          w-72
          h-72
          rounded-full
          bg-[#117072]/5
          blur-3xl
          pointer-events-none
          animate-client-orb
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-[-100px]
          w-80
          h-80
          rounded-full
          bg-[#117072]/5
          blur-3xl
          pointer-events-none
          animate-client-orb-reverse
        "
      />


      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          md:px-6
          relative
          z-10
        "
      >

        {/* ===================================================
            SECTION HEADER
            =================================================== */}

        <div
          className="
            text-center
            mb-12
            md:mb-16
          "
        >

          <h2
            className="
              text-3xl
              md:text-5xl
              font-black
              uppercase
              italic
              text-slate-900
              mb-4
              tracking-tight
            "
          >
            Trusted By
          </h2>


          <p
            className="
              text-slate-600
              max-w-2xl
              mx-auto
              mb-2
              text-sm
              md:text-base
              leading-relaxed
            "
          >
            Government departments and organizations that trust our infrastructure
            and civil engineering expertise.
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
            LOGO SLIDER
            =================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            py-6
            md:py-8
            perspective-3d
          "
        >

          {/* =================================================
              LEFT FADE
              ================================================= */}

          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-16
              md:w-40
              bg-gradient-to-r
              from-slate-50
              via-slate-50/80
              to-transparent
              z-20
              pointer-events-none
            "
          />


          {/* =================================================
              RIGHT FADE
              ================================================= */}

          <div
            className="
              absolute
              right-0
              top-0
              bottom-0
              w-16
              md:w-40
              bg-gradient-to-l
              from-slate-100
              via-slate-100/80
              to-transparent
              z-20
              pointer-events-none
            "
          />


          {/* =================================================
              3D LOGO TRACK
              ================================================= */}

          <div
            className="
              flex
              w-max
              items-center
              gap-6
              md:gap-10
              animate-client-scroll-3d
              hover:[animation-play-state:paused]
            "
          >

            {/* First set */}

            {clients.map((logo, index) => (
              <ClientLogoCard
                key={`first-${index}`}
                logo={logo}
              />
            ))}


            {/* Second set */}

            {clients.map((logo, index) => (
              <ClientLogoCard
                key={`second-${index}`}
                logo={logo}
              />
            ))}

          </div>

        </div>


        {/* ===================================================
            BOTTOM TEXT
            =================================================== */}

        <div
          className="
            mt-10
            md:mt-12
            text-center
          "
        >

          <p
            className="
              text-slate-500
              text-xs
              md:text-sm
              tracking-widest
              uppercase
              font-semibold
            "
          >
            30+ Years of Excellence in Government Infrastructure
          </p>

        </div>

      </div>

    </section>
  );
}