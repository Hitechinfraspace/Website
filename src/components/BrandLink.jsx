const BrandLink = ({ logo, brandColor, onNavigate }) => (
  <button
    type="button"
    className="brand-link flex items-center gap-3 cursor-pointer shrink-0 group"
    onClick={() => onNavigate("home")}
    aria-label="Go to Hi-Tech Infraspace home"
  >
    <div className="brand-logo-frame flex items-center justify-center">
      <img
        src={logo}
        alt="Hi-Tech Construction Logo"
        className="brand-logo h-11 sm:h-12 md:h-14 w-auto object-contain"
      />
    </div>

    <div className="hidden sm:block leading-none text-left">
      <div className="flex items-baseline">
        <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 uppercase italic">
          Hi-Tech
        </span>
        <span
          className="text-lg md:text-xl font-black tracking-tight uppercase italic ml-1"
          style={{ color: brandColor }}
        >
          Infraspace
        </span>
      </div>
      <p className="mt-1 text-[7px] md:text-[8px] tracking-[0.22em] text-slate-400 font-bold uppercase">
        Government Infrastructure
      </p>
    </div>
  </button>
);

export default BrandLink;
