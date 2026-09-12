import { ChevronRight } from "lucide-react";

const PageNavButton = ({ item, isActive, isMobile = false, onNavigate, brandColor }) => (
  <a
    href={item.href}
    onClick={(event) => {
      event.preventDefault();
      onNavigate(item.id);
    }}
    className={isMobile
      ? `w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-xs font-black uppercase tracking-[0.12em] transition-all duration-300 ${
          isActive ? "text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`
      : `relative px-4 xl:px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 ${
          isActive ? "text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
        }`
    }
    style={isActive ? { backgroundColor: brandColor } : undefined}
    aria-current={isActive ? "page" : undefined}
  >
    <span>{item.label}</span>

    {isMobile ? (
      <ChevronRight
        size={16}
        className={isActive ? "opacity-100" : "opacity-30"}
      />
    ) : isActive ? (
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
    ) : null}
  </a>
);

export default PageNavButton;
