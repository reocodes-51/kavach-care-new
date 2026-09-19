import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Shield, Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  onOpenTriage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: t('navHome', 'Home'), href: '#home' },
    { id: 'care-journey', label: t('navCareJourney', 'Care Journey'), href: '#care-journey' },
    { id: 'how-it-works', label: t('navHowItWorks', 'How It Works'), href: '#how-it-works' },
    { id: 'healthcare-network', label: t('navNetwork', 'Healthcare Network'), href: '#healthcare-network' },
    { id: 'about', label: t('navAbout', 'About'), href: '#about' }
  ];

  // Scrollspy: detect active section on landing page
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = navItems.map((item) => document.getElementById(item.id));

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'FRONTLINE_WORKER':
        return '/frontline';
      case 'DOCTOR':
        return '/doctor';
      case 'FACILITY':
        return '/facility';
      case 'ADMIN':
        return '/admin';
      case 'PATIENT':
      default:
        return '/patient';
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#0F5B4E] text-white border-b border-emerald-700/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo + "Care Beyond Distance" */}
          <Link
            to="/"
            onClick={(e) => handleNavClick('#home', e)}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#0F5B4E] flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform border border-emerald-200">
              <Shield className="w-6 h-6 text-[#0F5B4E] fill-[#0F5B4E]/10" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wide text-white block leading-tight">
                {t('brandName', 'KAVACH CARE')}
              </span>
              <span className="text-[11px] text-emerald-200 font-medium tracking-wider block">
                {t('brandTagline', 'Care Beyond Distance')}
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links (Smooth Scroll) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === '/' && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs font-bold border border-emerald-600/60'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* RIGHT: Language Selector + Login / Dashboard + Get Started */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Quick Dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-[#0B3D34] text-emerald-100 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-700/80 focus:outline-none focus:ring-1 focus:ring-emerald-400 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{user.name.split(' ')[0]} ({user.role.slice(0, 4)})</span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs xl:text-sm font-semibold text-emerald-100 hover:text-white px-3 py-1.5 rounded-lg hover:bg-emerald-900/50 transition-colors"
                >
                  {t('login', 'Login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs xl:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <span>{t('getStarted', 'Get Started')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="flex md:hidden items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-[#0B3D34] text-emerald-100 text-xs px-2 py-1 rounded border border-emerald-700"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="mr">MR</option>
            </select>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-DOWN DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B3D34] border-t border-emerald-700/80 px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'text-emerald-100 hover:bg-emerald-900/60'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-800 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-800 text-white text-sm font-bold flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-950 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('logout', 'Logout')}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-sm font-bold text-white bg-emerald-900 rounded-lg border border-emerald-700"
                >
                  {t('login', 'Login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-center text-sm font-bold text-slate-950 bg-emerald-400 rounded-lg shadow-sm flex items-center justify-center gap-1"
                >
                  <span>{t('getStarted', 'Get Started')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
