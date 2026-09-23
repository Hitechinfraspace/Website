import { Sparkles } from "lucide-react";

const AIConsultantButton = ({ onOpen, mobile = false, brandColor }) => (
  <button
    type="button"
    onClick={onOpen}
    className={mobile
      ? "w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-white text-xs font-black uppercase tracking-[0.12em] shadow-lg transition-all duration-300 active:scale-[0.98]"
      : "group relative flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-xl text-white text-[10px] xl:text-[11px] font-black uppercase tracking-[0.1em] overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
    }
    style={{ backgroundColor: brandColor }}
  >
    {!mobile && (
      <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-700 skew-x-12" />
    )}
    <Sparkles className={mobile ? "h-4 w-4" : "relative h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12"} />
    <span className="relative whitespace-nowrap">AI Consultant</span>
  </button>
);

export default AIConsultantButton;
