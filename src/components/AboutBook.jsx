import HTMLFlipBook from "react-pageflip";
import { useRef, useState } from "react";
import page1 from "../assets/Page1.jpeg";
import page2 from "../assets/Page2.jpeg";
import page3 from "../assets/Page3.jpeg";
import page4 from "../assets/Page4.jpeg";

export default function AboutBook() {
  const bookRef = useRef();
  const [page, setPage] = useState(0);

  const pages = [page1, page2, page3, page4];

  return (
    <section className="w-full py-16 md:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 flex flex-col items-center">

      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 uppercase italic mb-4">
          Our Vision
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          A glimpse into our company's strategic direction and long-term purpose
        </p>
        
        {/* Accent Line */}
        <div className="w-16 h-1 bg-gradient-to-r from-[#117072] to-[#0d4f4d] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Book Section */}
      <div className="w-full flex justify-center relative px-4">

        {/* Navigation Arrows */}
        <button
          onClick={() => bookRef.current.pageFlip().flipPrev()}
          className="
            hidden md:flex 
            absolute left-0 top-1/2 -translate-y-1/2 z-20 
            bg-white shadow-lg rounded-full w-12 h-12 
            items-center justify-center 
            text-slate-900 font-black text-xl
            hover:bg-[#117072] hover:text-white
            transition-all duration-300
            hover:shadow-xl
            hover:scale-110
            -ml-8
          "
          aria-label="Previous page"
        >
          ‹
        </button>

        <button
          onClick={() => bookRef.current.pageFlip().flipNext()}
          className="
            hidden md:flex 
            absolute right-0 top-1/2 -translate-y-1/2 z-20 
            bg-white shadow-lg rounded-full w-12 h-12 
            items-center justify-center 
            text-slate-900 font-black text-xl
            hover:bg-[#117072] hover:text-white
            transition-all duration-300
            hover:shadow-xl
            hover:scale-110
            -mr-8
          "
          aria-label="Next page"
        >
          ›
        </button>

        {/* Desktop Book View */}
        <div className="hidden md:block">
          <div className="shadow-2xl rounded-lg overflow-hidden">
            <HTMLFlipBook
              width={580}
              height={700}
              showCover={true}
              ref={bookRef}
              onFlip={(e) => setPage(e.data)}
              className="shadow-xl"
            >
              {pages.map((img, index) => (
                <div key={index} className="w-full h-full bg-white">
                  <img
                    src={img}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full space-y-4">
          {pages.map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={img}
                alt={`Page ${index + 1}`}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="hidden md:flex gap-2 mt-8 justify-center">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const targetPage = index + 1;
              if (page < targetPage) {
                for (let i = 0; i < targetPage - page; i++) {
                  bookRef.current.pageFlip().flipNext();
                }
              } else if (page > targetPage) {
                for (let i = 0; i < page - targetPage; i++) {
                  bookRef.current.pageFlip().flipPrev();
                }
              }
            }}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${
                page === index
                  ? "bg-[#117072] scale-125 shadow-md"
                  : "bg-slate-300 hover:bg-slate-400"
              }
            `}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Hint Text */}
      <p className="hidden md:block text-xs text-slate-500 mt-4 tracking-widest uppercase font-semibold">
        Use arrows or click dots to navigate
      </p>

    </section>
  );
}