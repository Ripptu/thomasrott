import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Check, ArrowRight, Phone, Hammer, Clipboard, Star, Quote, ArrowUpRight, MapPin, CircleDashed, Camera
} from 'lucide-react';
import { NAV_LINKS, HERO_HEADLINE, HERO_SUBTEXT, SERVICE_PACKAGES, PROCESS_STEPS, LOCATION_CITIES, GALLERY_IMAGES } from './constants.tsx';
import { Button } from './components/Button.tsx';
import { Testimonials } from './components/ui/unique-testimonial.tsx';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './components/SocialIcons.tsx';
import { LegalView } from './components/LegalView.tsx';
import { LEGAL_CONTENT } from './legalContent.ts';

type ViewState = 'home' | 'impressum' | 'agb' | 'datenschutz';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  
  // Intersection Observer state for Process Section animation
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const processRef = useRef<HTMLElement>(null);

  // Loading Animation Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading screen for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // Initialize GSAP ScrollSmoother
  useEffect(() => {
    // We access the global window objects loaded via CDN in index.html
    const win = window as any;
    
    // Slight delay to ensure DOM is fully ready and scripts are loaded
    const timer = setTimeout(() => {
      if (win.gsap && win.ScrollTrigger && win.ScrollSmoother) {
        win.gsap.registerPlugin(win.ScrollTrigger, win.ScrollSmoother);

        // 120Hz Optimization: Disable lag smoothing to prevent micro-stutters
        // This forces the animation to stay strictly synchronized with the scroll position
        win.gsap.ticker.lagSmoothing(0);

        // Check if smoother already exists to avoid duplicates on re-renders
        if (!win.ScrollSmoother.get()) {
          win.ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.35, // TUNED: The golden ratio for 120Hz feel (not too heavy, not too fast)
            effects: true,
            smoothTouch: 0.1, // Keep touch responsive
            normalizeScroll: true, // Prevents bounce on mobile
            ignoreMobileResize: true // Crucial for mobile performance
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentView]); // Re-init if view changes (though we switch views inside content)

  // Handle scroll effect for dynamic island
  useEffect(() => {
    const handleScroll = () => {
      // Navbar appears only after scrolling down a bit (150px)
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe Process Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProcessVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => {
      if (processRef.current) observer.unobserve(processRef.current);
    };
  }, [currentView]); // Re-observe when view changes back to home

  // Social Links Configuration
  const socialLinks = [
    {
      href: "https://api.whatsapp.com/send/?phone=4917667580812&text=Hallo+Thomas%2C+ich+interessiere+mich+f%C3%BCr+Ihre+Dienstleistungen.&type=phone_number&app_absent=0",
      icon: <WhatsAppIcon className="w-5 h-5" />,
      label: "WhatsApp",
      hoverColor: "hover:text-[#25D366]"
    },
    {
      href: "https://www.facebook.com/share/p/1AqhBriw3f/?mibextid=wwXIfr",
      icon: <FacebookIcon className="w-5 h-5" />,
      label: "Facebook",
      hoverColor: "hover:text-[#1877F2]"
    },
    {
      href: "https://www.instagram.com/facilitymanagementrott?igsh=cjB1OHNocnVwcHV5&utm_source=qr",
      icon: <InstagramIcon className="w-5 h-5" />,
      label: "Instagram",
      hoverColor: "hover:text-[#E4405F]"
    }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (currentView !== 'home') {
        setCurrentView('home');
        // Wait for render cycle then scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            // With ScrollSmoother, we should use the plugin's scrollTo if available, 
            // but standard scrollIntoView works if the library intercepts it properly.
            // Using GSAP scrollTo is safer for smoother:
            const win = window as any;
            if (win.ScrollSmoother && win.ScrollSmoother.get()) {
               win.ScrollSmoother.get().scrollTo(element, true, "center center");
            } else {
               element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
             const win = window as any;
            if (win.ScrollSmoother && win.ScrollSmoother.get()) {
               win.ScrollSmoother.get().scrollTo(element, true, "center center");
            } else {
               element.scrollIntoView({ behavior: 'smooth' });
            }
        }
      }
    } else {
      // Handle external links normally if any
      window.location.href = href;
    }
  };

  const handleLegalClick = (view: ViewState) => {
    setCurrentView(view);
    const win = window as any;
    if (win.ScrollSmoother && win.ScrollSmoother.get()) {
        win.ScrollSmoother.get().scrollTop(0);
    } else {
        window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-white font-sans selection:bg-forest-200 selection:text-forest-950 text-forest-950 relative">
      
      {/* --- LOADING ANIMATION OVERLAY --- */}
      <div 
        className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-all duration-1000 ease-out pointer-events-none
        ${isLoading ? 'opacity-100' : 'opacity-0'}
      `}>
         <div className="relative">
             <img 
               src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
               alt="Thomas Rott Loading" 
               className={`w-64 md:w-80 object-contain transition-all duration-700 transform ${isLoading ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 -translate-y-8'}`}
             />
             <div className="mt-8 h-1 w-32 bg-forest-50 overflow-hidden rounded-full mx-auto">
                <div className="h-full bg-forest-900 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
             </div>
             <style>{`
               @keyframes loading {
                 0% { transform: translateX(-100%); }
                 50% { transform: translateX(0); }
                 100% { transform: translateX(100%); }
               }
             `}</style>
         </div>
      </div>

      {/* FIXED ELEMENTS OUTSIDE SMOOTH WRAPPER */}
      
      {/* --- GLOBAL SCROLL BLUR VIGNETTE (MASKED) --- */}
      <div 
        className="fixed top-0 left-0 right-0 h-24 backdrop-blur-[6px] z-50 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}
      />
      <div 
        className="fixed bottom-0 left-0 right-0 h-24 backdrop-blur-[6px] z-50 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}
      />

      {/* --- DYNAMIC ISLAND NAVBAR --- */}
      <div 
        className={`
          fixed top-4 sm:top-6 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none
          transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${(scrolled || isMenuOpen) && !isLoading ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}
        `}
      >
        <nav 
          className={`
            pointer-events-auto relative
            transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
            text-white overflow-hidden
            ${isMenuOpen 
              ? 'w-full max-w-[340px] rounded-[2rem] bg-forest-950 shadow-2xl ring-1 ring-white/10' 
              : `rounded-full bg-forest-950/90 backdrop-blur-xl shadow-xl border border-white/10 px-1`
            }
          `}
        >
          {/* Main Bar Content */}
          <div className={`
             flex items-center justify-between
             ${isMenuOpen ? 'px-6 pt-5 pb-2' : 'px-5 py-3 gap-6'}
             transition-all duration-300
          `}>
            
            {/* Desktop Links (Hidden on Mobile) */}
            <div className={`hidden md:flex items-center gap-8 ${isMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
              {/* Added Logo in Header */}
              <img 
                src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
                alt="Logo Small" 
                className="h-8 w-auto object-contain mr-2 brightness-0 invert" 
              />
              
              {NAV_LINKS.map(link => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-forest-100/80 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile/Compact trigger */}
            <div className="md:hidden flex items-center gap-3">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  p-2 -ml-2 rounded-full transition-colors duration-300
                  ${isMenuOpen ? 'bg-white/10 text-white' : 'text-forest-100 hover:text-white'}
                `}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              {/* Name/Logo on Mobile */}
              <div className={`
                flex items-center gap-2
                transition-opacity duration-300
                ${isMenuOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}
              `}>
                  <img 
                    src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
                    alt="Logo Small" 
                    className="h-6 w-auto object-contain brightness-0 invert" 
                  />
                  <span className="text-sm font-serif font-medium tracking-wide">
                    Thomas Rott
                  </span>
              </div>
            </div>

            {/* CTA Button & Socials (Desktop) */}
            <div className={`transition-opacity duration-300 flex items-center gap-3 ${isMenuOpen ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
               {/* Desktop Socials */}
               <div className="hidden md:flex items-center gap-1.5 mr-2">
                  {socialLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        p-2 rounded-full text-forest-200 transition-all duration-300 
                        hover:bg-white/10 hover:scale-110 ${link.hoverColor}
                      `}
                      title={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                  <div className="w-px h-4 bg-white/20 mx-1" />
               </div>

               <a href="tel:017667580812" className="flex items-center gap-2 bg-white text-forest-950 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-forest-100 transition-colors shadow-lg shadow-forest-900/20">
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">Anfragen</span>
                  <span className="sm:hidden">Kontakt</span>
               </a>
            </div>
          </div>

          {/* Mobile Menu Dropdown (Inside the Dynamic Island) */}
          <div className={`
            md:hidden flex flex-col items-center
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top
            ${isMenuOpen ? 'max-h-[400px] opacity-100 pb-8 pt-2 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}
          `}>
             <div className="flex flex-col gap-1 w-full text-center px-6">
              {NAV_LINKS.map((link, idx) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-serif text-white/90 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
              
              {/* Mobile Socials */}
              <div className="flex items-center justify-center gap-6 mt-6 pb-2">
                 {socialLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        p-3 rounded-full bg-white/5 border border-white/5 text-white/80 transition-all duration-300 
                        hover:bg-white/10 hover:scale-110 ${link.hoverColor}
                      `}
                      title={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 w-full">
                <a href="tel:017667580812" className="flex items-center justify-center gap-2 bg-forest-500 text-white w-full py-3 rounded-xl font-medium shadow-lg hover:bg-forest-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  0176 / 675 808 12
                </a>
                <div className="mt-4 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                  Premium Objektbetreuung
                </div>
              </div>
             </div>
          </div>
        </nav>
      </div>

      {/* GSAP SMOOTH WRAPPER */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          
          {currentView === 'home' ? (
            <>
              {/* --- HERO SECTION --- */}
              <section className="relative pt-32 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
                {/* Background Gradients */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-forest-200/40 rounded-full blur-[120px] mix-blend-multiply pointer-events-none animate-pulse-slow" />
                <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-forest-100/60 rounded-full blur-[100px] mix-blend-multiply pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
                    
                    {/* Text Content */}
                    <div className="max-w-2xl text-center lg:text-left order-1">
                      
                      <h1 className="text-5xl lg:text-7xl font-serif text-forest-950 mb-6 tracking-tight leading-[1.1]">
                        Nicht nur gepflegt. <br/>
                        <span className="italic text-forest-600">Sondern perfektioniert.</span>
                      </h1>
                      
                      <p className="text-lg lg:text-xl text-forest-900/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light mt-4">
                        {HERO_SUBTEXT}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button size="lg" onClick={() => {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                const win = window as any;
                                if (win.ScrollSmoother && win.ScrollSmoother.get()) win.ScrollSmoother.get().scrollTo(contactSection, true, "center center");
                                else contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>Erstgespräch anfordern</Button>
                        <Button variant="ghost" size="lg" className="group" onClick={() => {
                            const serviceSection = document.getElementById('services');
                            if (serviceSection) {
                                const win = window as any;
                                if (win.ScrollSmoother && win.ScrollSmoother.get()) win.ScrollSmoother.get().scrollTo(serviceSection, true, "center center");
                                else serviceSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>
                           Portfolio ansehen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                      
                      {/* Modern Location Dashboard - Minimalist */}
                      <div className="mt-12 lg:mt-16 pt-8 border-t border-forest-900/5">
                        <div className="flex flex-col gap-4 items-center lg:items-start">
                          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
                            <div className="flex items-center gap-2 text-forest-900/80">
                                <div className="p-1.5 bg-forest-100 rounded-full"><MapPin className="w-3.5 h-3.5 text-forest-600" /></div>
                                <span className="font-semibold">Haag an der Amper</span>
                            </div>
                             <div className="flex items-center gap-2 text-forest-900/80">
                                <div className="p-1.5 bg-forest-100 rounded-full"><CircleDashed className="w-3.5 h-3.5 text-forest-600 animate-[spin_10s_linear_infinite]" /></div>
                                <span className="font-semibold">30km Radius</span>
                                <span className="text-xs text-forest-600/70 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-100 ml-1">Gratis Anfahrt ab 100€</span>
                            </div>
                          </div>
                          
                          {/* Animated City Ticker */}
                          <div className="w-full overflow-hidden relative h-6 mask-gradient-x max-w-lg">
                             <div className="absolute flex whitespace-nowrap animate-marquee">
                                {LOCATION_CITIES.map((city, i) => (
                                   <span key={i} className="mx-3 text-forest-900/40 text-sm font-serif italic">{city} •</span>
                                ))}
                                {LOCATION_CITIES.map((city, i) => (
                                   <span key={`dup-${i}`} className="mx-3 text-forest-900/40 text-sm font-serif italic">{city} •</span>
                                ))}
                             </div>
                          </div>
                          <style>{`
                            .mask-gradient-x {
                                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                            }
                            @keyframes marquee {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-marquee {
                                animation: marquee 60s linear infinite;
                            }
                          `}</style>
                        </div>
                      </div>
                    </div>

                    {/* Image Content - Smaller & 3D Effect */}
                    <div className="relative order-2 w-full max-w-[320px] lg:max-w-[380px] mx-auto perspective-1000">
                       <div 
                         className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 transform rotate-3 hover:rotate-0 transition-all duration-700 ease-out z-10"
                         style={{ transformStyle: 'preserve-3d' }}
                        >
                        <div className="absolute inset-0 bg-forest-900/5 opacity-0 hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay pointer-events-none" />
                        <img 
                          src="https://i.postimg.cc/jqcqHjMd/Whats-App-Image-2025-12-21-at-15-45-22.jpg" 
                          alt="Thomas Rott im Einsatz" 
                          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 via-transparent to-transparent opacity-60" />
                      </div>
                      
                      {/* Decorative back element for depth */}
                      <div className="absolute -inset-2 bg-forest-200/30 rounded-[2.2rem] -z-10 rotate-6 scale-95" />
                    </div>

                  </div>
                </div>
              </section>

              {/* --- PHILOSOPHY (ABOUT) SECTION --- */}
              <section id="about" className="bg-forest-950 py-24 lg:py-32 relative overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[4rem] z-20 -mt-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      
                      {/* Checklist Visual */}
                      <div className="order-2 lg:order-1 relative">
                          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative group hover:bg-white/10 transition-colors duration-500">
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center gap-4">
                                <div className="bg-forest-500/20 p-2.5 rounded-xl border border-forest-500/20 text-forest-300">
                                  <Clipboard className="w-6 h-6" />
                                </div>
                                <div>
                                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Statusbericht</div>
                                  <div className="text-base font-serif text-white/90">Objekt "Sonnenhang"</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Zustand</div>
                                <div className="text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Exzellent</div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              {[
                                { text: "Pflege Außenanlagen", done: true },
                                { text: "Sicherheitsprüfung TG", done: true },
                                { text: "Heckenschnitt", done: false }
                              ].map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${item.done ? 'bg-white/5' : 'bg-forest-500/10 border-l-2 border-forest-400'}`}>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${item.done ? 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400' : 'border-forest-400/50'}`}>
                                    {item.done ? <Check className="w-3.5 h-3.5" /> : <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />}
                                  </div>
                                  <span className={`text-sm ${item.done ? 'text-white/40 line-through' : 'text-white/90'}`}>{item.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                      </div>

                      {/* Text */}
                      <div className="space-y-8 order-1 lg:order-2">
                        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                          <span className="text-forest-200/90 text-xs font-bold uppercase tracking-widest">Die Philosophie</span>
                        </div>
                        
                        <h3 className="text-3xl lg:text-5xl font-serif text-white/95 leading-tight">
                          Qualität ist, wenn man nicht mehr <br/>
                          <span className="text-forest-400 italic">kontrollieren muss.</span>
                        </h3>
                        
                        <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
                          <p>
                            Mein Name ist Thomas Rott. Ich habe dieses Unternehmen mit einer klaren Vision gegründet: Den Ruf des klassischen Hausmeisterservices neu zu definieren. Weg vom "Mädchen für alles", hin zum spezialisierten Partner für Werterhalt.
                          </p>
                          <p>
                            Wenn Sie mich beauftragen, kaufen Sie nicht nur meine Zeit, sondern meinen Anspruch, dass Ihr Objekt zu jeder Zeit tadellos aussieht.
                          </p>
                        </div>

                        <div className="pt-8 flex gap-12 border-t border-white/10">
                           <div>
                              <div className="text-3xl font-serif text-white">100%</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Verantwortung</div>
                           </div>
                           <div>
                              <div className="text-3xl font-serif text-white">24h</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Reaktionszeit</div>
                           </div>
                        </div>
                      </div>

                    </div>
                </div>
              </section>

              {/* --- SERVICES SECTION --- */}
              <section id="services" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden rounded-t-[2.5rem] lg:rounded-t-[4rem] -mt-10 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-4xl lg:text-5xl font-serif text-forest-950 mb-6">
                      Leistungsspektrum <span className="italic text-forest-600/80">& Exzellenz</span>
                    </h2>
                    <p className="text-forest-900/50 max-w-xl mx-auto text-lg font-light">Keine halben Sachen. Ich biete spezialisierte Lösungen statt oberflächlicher Dienste.</p>
                  </div>

                  {/* Services Grid - Using Flexbox for centered wrapping of 5 items */}
                  <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                    {SERVICE_PACKAGES.map((pkg, idx) => (
                      <div 
                        key={pkg.name} 
                        className={`
                            relative p-8 lg:p-10 rounded-[2rem] border transition-all duration-500 group flex flex-col
                            w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]
                            ${pkg.highlight 
                            ? 'bg-white border-forest-100 shadow-[0_20px_50px_-12px_rgba(10,31,22,0.1)] z-10 scale-100 md:scale-105' 
                            : 'bg-white/50 border-transparent hover:bg-white hover:border-forest-100/50 hover:shadow-[0_20px_40px_-12px_rgba(10,31,22,0.05)]'
                            }
                        `}
                      >
                        {/* Logic for NEW and Competence Badges */}
                        {pkg.badge && (
                          <div className={`
                            absolute top-0 right-0 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-[1.8rem] uppercase tracking-wider
                            ${pkg.badge === 'Neu' ? 'bg-forest-900 animate-pulse-slow' : 'bg-emerald-600'}
                          `}>
                            {pkg.badge}
                          </div>
                        )}
                        
                        <div className="mb-6 lg:mb-8">
                          <span className="text-[10px] font-bold text-forest-900/30 uppercase tracking-[0.2em]">{pkg.category}</span>
                          <h3 className="text-2xl font-serif text-forest-900 mt-2 mb-3">{pkg.name}</h3>
                          <p className="text-sm text-forest-900/60 leading-relaxed min-h-[60px]">{pkg.description}</p>
                        </div>

                        <div className="space-y-4 lg:space-y-5 mb-8 lg:mb-10 flex-grow">
                          {pkg.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3 text-sm group-hover:translate-x-1 transition-transform duration-300" style={{transitionDelay: `${fIdx * 50}ms`}}>
                              <div className="w-5 h-5 rounded-full bg-forest-50 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-forest-600" />
                              </div>
                              <span className="text-forest-900/70">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          variant={pkg.highlight ? 'primary' : 'outline'} 
                          className="w-full mt-auto"
                          onClick={() => {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                const win = window as any;
                                if (win.ScrollSmoother && win.ScrollSmoother.get()) win.ScrollSmoother.get().scrollTo(contactSection, true, "center center");
                                else contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          {pkg.cta}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* --- NEW GALLERY SECTION (REFERENCES) --- */}
              <section id="gallery" className="py-24 lg:py-32 bg-white relative">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                      <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 text-forest-600 text-xs font-bold uppercase tracking-wider mb-6">
                           <Camera className="w-3 h-3" /> Einblicke
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-serif text-forest-950 mb-4">
                           Gepflegte Natur ist <br/><span className="italic text-forest-500">Lebensqualität.</span>
                        </h2>
                        <p className="text-forest-900/60 font-light text-lg">
                           Bilder sagen mehr als tausend Worte. Ein kleiner Auszug aus der täglichen Arbeit für mehr Wertschätzung Ihrer Immobilie.
                        </p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {GALLERY_IMAGES.map((img, idx) => (
                         <div 
                           key={idx} 
                           className="group relative overflow-hidden rounded-2xl cursor-pointer h-[300px]"
                         >
                            <img 
                              src={img.src} 
                              alt={img.alt} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                            <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                               <span className="text-[10px] text-white/60 uppercase tracking-widest mb-1 block">{img.category}</span>
                               <h3 className="text-xl font-serif text-white">{img.title}</h3>
                            </div>
                         </div>
                      ))}
                   </div>
                 </div>
              </section>

              {/* --- PROCESS SECTION --- */}
              <section id="process" ref={processRef} className="py-32 lg:py-40 bg-forest-50/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-24 gap-6">
                    <div className="max-w-xl">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-forest-900/30 uppercase mb-4">Der Weg zur Zusammenarbeit</p>
                      <h2 className="text-4xl lg:text-5xl font-serif text-forest-950 leading-tight">
                        Effizient. <span className="italic text-forest-600/80">Transparent.</span><br/>
                        <span className="text-forest-900/20">Kompromisslos.</span>
                      </h2>
                    </div>
                    <div className="pb-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        const contactSection = document.getElementById('contact');
                         if (contactSection) {
                                const win = window as any;
                                if (win.ScrollSmoother && win.ScrollSmoother.get()) win.ScrollSmoother.get().scrollTo(contactSection, true, "center center");
                                else contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                      }}>Prozess-Details ansehen</Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative">
                     {/* Staggered Cards */}
                    {PROCESS_STEPS.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={idx} 
                          className={`
                            relative group p-8 lg:p-10 rounded-2xl 
                            bg-white border border-forest-100/50 
                            hover:bg-forest-950 hover:border-forest-950 
                            transition-all duration-700 ease-out 
                            shadow-[0_10px_30px_-10px_rgba(10,31,22,0.05)]
                            hover:shadow-[0_30px_60px_-10px_rgba(10,31,22,0.3)]
                            hover:-translate-y-2
                            ${isProcessVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                          `}
                          style={{ transitionDelay: `${idx * 200}ms` }}
                        >
                          <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600 group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white transition-colors duration-500">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-6xl font-serif font-bold text-forest-50 group-hover:text-white/10 transition-colors duration-500 absolute -right-2 -top-4 -z-0">
                              {item.step}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-forest-950 group-hover:text-white mb-4 transition-colors duration-500">
                            {item.title}
                          </h3>
                          <p className="text-sm text-forest-900/60 group-hover:text-white/70 leading-relaxed transition-colors duration-500">
                            {item.desc}
                          </p>
                          
                          {/* Subtle line indicator at bottom */}
                          <div className="absolute bottom-0 left-0 h-1 bg-forest-900 group-hover:bg-forest-400 w-0 group-hover:w-full transition-all duration-700 ease-in-out rounded-b-2xl" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* --- TESTIMONIALS SECTION --- */}
              <section className="py-24 bg-forest-50 relative overflow-hidden">
                <Testimonials />
              </section>

              {/* --- CTA FOOTER (Pre-Footer) --- */}
              <section id="contact" className="py-32 bg-white relative overflow-hidden flex items-center justify-center border-t border-forest-100">
                <div className="relative z-10 text-center px-4 max-w-2xl">
                  <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center mb-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Phone className="w-8 h-8 text-forest-600" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-forest-950 mb-8 tracking-tight">
                    Bereit für ein <span className="italic text-forest-600">Upgrade?</span>
                  </h2>
                  <p className="text-lg text-forest-900/60 mb-12 font-light">
                    Lassen Sie uns über den Status Ihrer Immobilie sprechen. Unverbindlich, aber garantiert aufschlussreich.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" className="shadow-2xl shadow-forest-900/20" onClick={() => window.location.href='tel:017667580812'}>
                      0176 / 675 808 12
                    </Button>
                    <a href="https://api.whatsapp.com/send/?phone=4917667580812&text=Hallo+Thomas%2C+ich+interessiere+mich+f%C3%BCr+Ihre+Dienstleistungen.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-forest-900 font-medium hover:text-forest-600 transition-colors flex items-center gap-2 group">
                      Schriftliche Anfrage <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <LegalView 
              content={LEGAL_CONTENT[currentView as keyof typeof LEGAL_CONTENT]} 
              onBack={() => setCurrentView('home')} 
            />
          )}

          {/* --- NEW MODERN FOOTER (GERMAN & IMPROVED FONTS) --- */}
          <footer className="bg-forest-950 text-white pt-24 pb-12 overflow-hidden relative font-sans">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* TOP SECTION: Massive Headline */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-white/10 pb-12">
                <div className="max-w-2xl">
                  <h4 className="text-forest-400 font-bold tracking-[0.3em] uppercase mb-6 text-sm">Lassen Sie uns sprechen</h4>
                  <div className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white">
                    Bereit für <br />
                    <span className="text-white/20 italic">Exzellenz?</span>
                  </div>
                </div>
                
                <div className="mt-12 md:mt-0 flex flex-col gap-4 items-start md:items-end">
                  <a href="mailto:info@thomasrott.de" className="text-2xl md:text-3xl font-light hover:text-forest-400 transition-colors border-b border-white/20 pb-1 flex items-center gap-4 group">
                    info@thomasrott.de
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </a>
                  <a href="tel:017667580812" className="text-xl md:text-2xl font-light text-white/60 hover:text-white transition-colors">
                    +49 176 675 808 12
                  </a>
                </div>
              </div>

              {/* BOTTOM SECTION: Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                
                {/* Brand */}
                <div className="md:col-span-4">
                  <div className="text-2xl font-serif font-bold mb-4">Thomas Rott</div>
                  <p className="text-white/60 text-base max-w-xs leading-relaxed font-light">
                    Premium Objektbetreuung für anspruchsvolle Eigentümer. Wir definieren den Standard neu.
                  </p>
                  
                  <div className="flex gap-4 mt-8">
                     {socialLinks.map((link, idx) => (
                        <a 
                          key={idx}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-forest-950 transition-all duration-300"
                        >
                          {link.icon}
                        </a>
                      ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Navigation</span>
                  <button onClick={(e) => handleNavClick(e as any, '#services')} className="text-2xl font-serif text-left hover:translate-x-2 transition-transform duration-300 hover:text-forest-300 w-fit">Expertise</button>
                  <button onClick={(e) => handleNavClick(e as any, '#process')} className="text-2xl font-serif text-left hover:translate-x-2 transition-transform duration-300 hover:text-forest-300 w-fit">Prozess</button>
                  <button onClick={(e) => handleNavClick(e as any, '#about')} className="text-2xl font-serif text-left hover:translate-x-2 transition-transform duration-300 hover:text-forest-300 w-fit">Philosophie</button>
                </div>

                {/* Legal / Address */}
                <div className="md:col-span-4 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 block">Adresse</span>
                    <address className="not-italic text-white/70 text-lg font-light leading-relaxed">
                      Kreisstraße 17<br/>
                      85410 Haag an der Amper
                    </address>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 mt-12 md:mt-0 text-sm font-medium text-white/50 uppercase tracking-wider">
                     <button onClick={() => handleLegalClick('impressum')} className="hover:text-white transition-colors">Impressum</button>
                     <button onClick={() => handleLegalClick('datenschutz')} className="hover:text-white transition-colors">Datenschutz</button>
                     <button onClick={() => handleLegalClick('agb')} className="hover:text-white transition-colors">AGB</button>
                  </div>
                </div>

              </div>

              {/* Copyright */}
              <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-white/30 uppercase tracking-widest font-medium">
                <span>© 2025 Alle Rechte vorbehalten.</span>
                <span>Qualität aus Bayern.</span>
              </div>

            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default App;