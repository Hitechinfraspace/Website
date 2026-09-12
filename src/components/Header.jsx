import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/final logo.png";
import { navigationItems } from "./navigation";
import AIConsultantButton from "./AIConsultantButton";
import BrandLink from "./BrandLink";
import PageNavButton from "./PageNavButton";

const Header = ({ currentPage, onNavigate, onOpenAI, brandColor }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return createPortal(
    (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isScrolled ? "py-3" : "py-4 md:py-5"}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div
          className="relative flex items-center justify-between h-[68px] md:h-[74px] px-4 md:px-5 rounded-2xl border transition-all duration-700 ease-out"
          style={{
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.68)" : "#ffffff",
            backdropFilter: isScrolled ? "blur(22px) saturate(150%)" : "blur(8px)",
            WebkitBackdropFilter: isScrolled ? "blur(22px) saturate(150%)" : "blur(8px)",
            borderColor: isScrolled ? "rgba(255, 255, 255, 0.72)" : brandColor,
            boxShadow: isScrolled
              ? "0 18px 45px rgba(15, 23, 42, 0.16)"
              : `0 10px 24px ${brandColor}33`,
          }}
        >
          <BrandLink logo={logo} brandColor={brandColor} onNavigate={handleNavigation} />

          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <PageNavButton
                key={item.id}
                item={item}
                isActive={currentPage === item.id}
                onNavigate={handleNavigation}
                brandColor={brandColor}
              />
            ))}

            <div className="h-7 w-px bg-slate-200 mx-3" />
            <AIConsultantButton onOpen={onOpenAI} brandColor={brandColor} />
          </div>

          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 hover:bg-slate-200 active:scale-95"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/5 p-3">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <PageNavButton
                  key={item.id}
                  item={item}
                  isActive={currentPage === item.id}
                  isMobile
                  onNavigate={handleNavigation}
                  brandColor={brandColor}
                />
              ))}
            </div>

            <div className="h-px bg-slate-100 my-3" />
            <AIConsultantButton
              mobile
              onOpen={() => {
                onOpenAI();
                setIsMenuOpen(false);
              }}
              brandColor={brandColor}
            />
            <div className="text-center pt-3 pb-1">
              <span className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.25em]">
                Government Infrastructure Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
    ),
    document.body
  );
};

export default Header;
