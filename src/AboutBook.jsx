import HTMLFlipBook from "react-pageflip";
import { useRef, useState } from "react";

import page1 from "./assets/Page1.jpeg";
import page2 from "./assets/Page2.jpeg";
import page3 from "./assets/Page3.jpeg";
import page4 from "./assets/Page4.jpeg";

export default function AboutBook() {
  const bookRef = useRef(null);

  const [page, setPage] = useState(0);

  const [bookTilt, setBookTilt] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const [isHovering, setIsHovering] = useState(false);

  const pages = [page1, page2, page3, page4];

  /* =========================================================
     3D MOUSE TILT
     ========================================================= */

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 3;
    const rotateX = ((centerY - y) / centerY) * 3;

    setBookTilt({
      rotateX,
      rotateY,
    });
  };

  const resetTilt = () => {
    setBookTilt({
      rotateX: 0,
      rotateY: 0,
    });

    setIsHovering(false);
  };

  /* =========================================================
     PAGE NAVIGATION
     ========================================================= */

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const previousPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const goToPage = (targetIndex) => {
    if (!bookRef.current) return;

    const currentPage = page;

    if (targetIndex > currentPage) {
      for (let i = currentPage; i < targetIndex; i++) {
        bookRef.current.pageFlip().flipNext();
      }
    }

    if (targetIndex < currentPage) {
      for (let i = currentPage; i > targetIndex; i--) {
        bookRef.current.pageFlip().flipPrev();
      }
    }
  };

  return (
    <section
      className="
        relative
        w-full
        py-16
        md:py-28
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
        flex
        flex-col
        items-center
        overflow-hidden
        perspective-3d
      "
    >

      {/* =====================================================
          BACKGROUND 3D LIGHT
          ===================================================== */}

      <div
        className="
          absolute
          top-1/3
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

      {/* =====================================================
          SECTION HEADER
          ===================================================== */}

      <div
        className="
          relative
          z-10
          text-center
          mb-12
          md:mb-16
          px-4
          reveal-3d
          visible
        "
      >
        <h2
          className="
            text-3xl
            md:text-5xl
            font-black
            tracking-tight
            text-slate-900
            uppercase
            italic
            mb-4
          "
        >
          Our Vision
        </h2>

        <p
          className="
            text-slate-600
            text-sm
            md:text-base
            max-w-2xl
            mx-auto
            leading-relaxed
          "
        >
          A glimpse into our company's strategic direction and long-term purpose
        </p>

        {/* Accent Line */}

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


      {/* =====================================================
          BOOK AREA
          ===================================================== */}

      <div
        className="
          relative
          w-full
          flex
          justify-center
          px-4
          perspective-3d
        "
      >

        {/* ===================================================
            3D FLOOR SHADOW
            =================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            translate-y-[330px]
            md:translate-y-[350px]
            w-[380px]
            md:w-[520px]
            h-12
            rounded-[50%]
            bg-slate-900/20
            blur-2xl
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            opacity: isHovering ? 0.55 : 0.35,
            transform: `
              translateX(-50%)
              translateY(${isHovering ? "360px" : "350px"})
              scale(${isHovering ? "0.92" : "1"})
            `,
          }}
        />


        {/* ===================================================
            PREVIOUS ARROW
            =================================================== */}

        <button
          type="button"
          onClick={previousPage}
          className="
            hidden
            md:flex
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-30
            w-12
            h-12
            !p-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-slate-800
            border
            border-slate-200
            shadow-lg
            hover:bg-[#117072]
            hover:text-white
            hover:border-[#117072]
            hover:scale-110
            active:scale-95
            transition-all
            duration-300
            -ml-1
            lg:-ml-4
          "
          aria-label="Previous page"
        >
          <span className="text-2xl leading-none">
            ‹
          </span>
        </button>


        {/* ===================================================
            NEXT ARROW
            =================================================== */}

        <button
          type="button"
          onClick={nextPage}
          className="
            hidden
            md:flex
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-30
            w-12
            h-12
            !p-0
            items-center
            justify-center
            rounded-full
            bg-white
            text-slate-800
            border
            border-slate-200
            shadow-lg
            hover:bg-[#117072]
            hover:text-white
            hover:border-[#117072]
            hover:scale-110
            active:scale-95
            transition-all
            duration-300
            -mr-1
            lg:-mr-4
          "
          aria-label="Next page"
        >
          <span className="text-2xl leading-none">
            ›
          </span>
        </button>


        {/* ===================================================
            DESKTOP 3D BOOK
            =================================================== */}

        <div
          className="
            hidden
            md:block
            relative
            z-10
            preserve-3d
          "
          onMouseEnter={() => setIsHovering(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            perspective: "1800px",
          }}
        >

          {/* Dynamic 3D glow */}

          <div
            className="
              absolute
              inset-[-30px]
              rounded-3xl
              bg-[#117072]/10
              blur-3xl
              pointer-events-none
              transition-opacity
              duration-500
            "
            style={{
              opacity: isHovering ? 1 : 0.45,
            }}
          />


          {/* Book container */}

          <div
            className="
              relative
              preserve-3d
              transition-transform
              duration-500
              ease-out
            "
            style={{
              transform: `
                rotateX(${bookTilt.rotateX}deg)
                rotateY(${bookTilt.rotateY}deg)
                translateZ(${isHovering ? "18px" : "0px"})
              `,
            }}
          >

            {/* Book back/depth layer */}

            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-slate-800
                translate-x-2
                translate-y-2
                -z-10
                shadow-2xl
              "
            />

            {/* Additional depth layer */}

            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-[#0d4f4d]
                translate-x-1
                translate-y-1
                -z-10
              "
            />

            {/* Actual Book */}

            <div
              className="
                relative
                rounded-xl
                overflow-hidden
                shadow-3d
                bg-white
              "
            >

              <HTMLFlipBook
                width={580}
                height={700}
                size="fixed"
                minWidth={300}
                maxWidth={580}
                minHeight={360}
                maxHeight={700}
                showCover={true}
                mobileScrollSupport={true}
                drawShadow={true}
                maxShadowOpacity={0.45}
                flippingTime={700}
                useMouseEvents={true}
                ref={bookRef}
                onFlip={(e) => setPage(e.data)}
                className="about-book"
                style={{
                  display: "block",
                }}
              >

                {pages.map((img, index) => (
                  <div
                    key={index}
                    className="
                      w-full
                      h-full
                      bg-white
                      overflow-hidden
                    "
                  >
                    <img
                      src={img}
                      alt={`Page ${index + 1}`}
                      className="
                        w-full
                        h-full
                        object-cover
                        select-none
                        pointer-events-none
                      "
                      draggable="false"
                    />
                  </div>
                ))}

              </HTMLFlipBook>

            </div>
          </div>
        </div>


        {/* ===================================================
            MOBILE BOOK / PAGES
            =================================================== */}

        <div
          className="
            md:hidden
            w-full
            max-w-lg
            space-y-5
            relative
            z-10
          "
        >

          {pages.map((img, index) => (
            <div
              key={index}
              className="
                relative
                rounded-xl
                overflow-hidden
                bg-white
                border
                border-slate-200
                shadow-lg
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >

              {/* Small depth layer */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#117072]/5
                  pointer-events-none
                "
              />

              <img
                src={img}
                alt={`Page ${index + 1}`}
                className="
                  relative
                  z-10
                  w-full
                  rounded-xl
                "
                draggable="false"
              />

            </div>
          ))}

        </div>

      </div>


      {/* =====================================================
          PAGE INDICATORS
          ===================================================== */}

      <div
        className="
          hidden
          md:flex
          items-center
          justify-center
          gap-3
          mt-10
          relative
          z-20
        "
      >

        {pages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToPage(index)}
            className={`
              !p-0
              rounded-full
              transition-all
              duration-300
              border-0
              ${
                page === index
                  ? "w-8 h-2 bg-[#117072] shadow-md"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400 hover:scale-125"
              }
            `}
            aria-label={`Go to page ${index + 1}`}
            aria-current={page === index ? "page" : undefined}
          />
        ))}

      </div>


      {/* =====================================================
          NAVIGATION HINT
          ===================================================== */}

      <p
        className="
          hidden
          md:block
          text-xs
          text-slate-500
          mt-5
          tracking-widest
          uppercase
          font-semibold
          text-center
        "
      >
        Use arrows or click dots to navigate
      </p>


      {/* =====================================================
          MOBILE HINT
          ===================================================== */}

      <p
        className="
          md:hidden
          text-xs
          text-slate-500
          mt-7
          tracking-wider
          uppercase
          font-semibold
          text-center
          px-4
        "
      >
        Scroll to explore our vision
      </p>

    </section>
  );
}