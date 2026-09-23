import logo1 from "../assets/clients/Kalpataru.svg";
import logo2 from "../assets/clients/L&T.svg";
import logo3 from "../assets/clients/PGVCL.svg";
import logo4 from "../assets/clients/R&B - Copy.png";
import logo5 from "../assets/clients/RMC.svg";
import logo6 from "../assets/clients/Tata_logo.svg";
import logo7 from "../assets/clients/BMC.png";
import logo8 from "../assets/clients/UMC.png";

const clients = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8
];

export default function ClientSection() {
  return (
    <section className="py-16 md:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic text-slate-900 mb-4 tracking-tight">
            Trusted By
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mb-2 text-sm md:text-base leading-relaxed">
            Government departments and organizations that trust our infrastructure
            and civil engineering expertise.
          </p>
          
          {/* Accent Line */}
          <div className="w-16 h-1 bg-gradient-to-r from-[#117072] to-[#0d4f4d] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Logo Slider Container */}
        <div className="relative">

          {/* Fade Overlays */}
          <div className="absolute left-0 top-0 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-12 md:w-32 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Logos */}
          <div className="overflow-hidden">
            <div className="flex w-max items-center gap-16 md:gap-24 animate-client-scroll hover:[animation-play-state:paused] py-8">

              {[...clients, ...clients].map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-shrink-0 group transition-all duration-300"
                >
                  <div className="w-40 h-24 md:h-28 flex items-center justify-center">
                    <img
                      src={logo}
                      alt="client"
                      className="
                        max-h-full max-w-full object-contain 
                        grayscale opacity-70 
                        group-hover:grayscale-0 group-hover:opacity-100 
                        transition-all duration-500 ease-out
                        hover:scale-110
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Accent */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-xs md:text-sm tracking-widest uppercase font-semibold">
            30+ Years of Excellence in Government Infrastructure
          </p>
        </div>

      </div>

    </section>
  );
}