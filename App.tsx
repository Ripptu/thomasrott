import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Menu, X, Check, ArrowRight, ArrowLeft, Phone, Star, ArrowUpRight, MapPin, Camera, MessageCircle, Clipboard, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, HERO_HEADLINE, HERO_SUBTEXT, SERVICE_PACKAGES, PROCESS_STEPS, LOCATION_CITIES, GALLERY_IMAGES, TESTIMONIALS, FAQ_ITEMS } from './constants.tsx';
import { Button } from './components/Button.tsx';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './components/SocialIcons.tsx';
import { LegalView } from './components/LegalView.tsx';
import { LEGAL_CONTENT } from './legalContent.ts';

type ViewState = 'home' | 'impressum' | 'agb' | 'datenschutz';

const SmoothMarquee = ({ children }: { children: React.ReactNode }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const speed = useRef(40); // pixels per second
  const currentSpeed = useRef(40);
  const position = useRef(0);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min(time - lastTime, 50); // Cap delta to prevent huge jumps
      lastTime = time;

      const targetSpeed = isHovered.current ? 0 : speed.current;
      // Lerp factor (adjust for smoothness of stop/start)
      currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.05;

      position.current -= currentSpeed.current * (delta / 1000);

      if (scrollerRef.current) {
        const totalWidth = scrollerRef.current.scrollWidth;
        const halfWidth = totalWidth / 2;
        
        // Wrap position
        if (position.current <= -halfWidth) {
          position.current += halfWidth;
        }
        
        scrollerRef.current.style.transform = `translateX(${position.current}px)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      className="flex w-max py-4" 
      ref={scrollerRef}
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
      onTouchStart={() => isHovered.current = true}
      onTouchEnd={() => isHovered.current = false}
    >
       {children}
    </div>
  );
};

const FAQAccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-forest-100/30 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 text-forest-950 hover:text-forest-700 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg md:text-xl font-sans font-semibold tracking-tight pr-4 text-forest-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="p-1.5 rounded-full bg-forest-50 text-forest-900 shrink-0"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-base text-forest-900/70 leading-relaxed pt-1 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State for navbar visibility
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(6); // Initial gallery count
  
  // Interactive Service Area State
  const [areaSearchQuery, setAreaSearchQuery] = useState('');
  const [areaSearchResult, setAreaSearchResult] = useState<{ found: boolean; city: string } | null>(null);

  // WhatsApp Custom Builder State
  const [whatsappName, setWhatsappName] = useState('');
  const [whatsappCity, setWhatsappCity] = useState('');
  const [whatsappService, setWhatsappService] = useState('Garten- & Heckenpflege');

  // New High-End Premium States
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'All' | 'Garten' | 'Haus' | 'Spezial'>('All');
  const [activeTickerCity, setActiveTickerCity] = useState(LOCATION_CITIES[0]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Live Active Ticker Rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerCity(prev => {
        const currentIndex = LOCATION_CITIES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LOCATION_CITIES.length;
        return LOCATION_CITIES[nextIndex];
      });
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Scroll to Top visibility
  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const handleAreaSearch = (query: string) => {
    setAreaSearchQuery(query);
    if (!query.trim()) {
      setAreaSearchResult(null);
      return;
    }
    const cleanQuery = query.toLowerCase().trim();
    const foundCity = LOCATION_CITIES.find(c => c.toLowerCase().includes(cleanQuery));
    if (foundCity) {
      setAreaSearchResult({ found: true, city: foundCity });
    } else {
      setAreaSearchResult({ found: false, city: query });
    }
  };

  // Dynamic Page Title & Meta description adjustment for premium SEO
  useEffect(() => {
    if (currentView === 'home') {
      document.title = "Thomas Rott | Premium Objektbetreuung, Gartenpflege & Fassadenreinigung";
    } else if (currentView === 'impressum') {
      document.title = "Impressum | Thomas Rott Premium Objektbetreuung";
    } else if (currentView === 'agb') {
      document.title = "Allgemeine Geschäftsbedingungen (AGB) | Thomas Rott";
    } else if (currentView === 'datenschutz') {
      document.title = "Datenschutzerklärung | Thomas Rott Premium Objektbetreuung";
    }
  }, [currentView]);
  
  // Refs for animations and scroll tracking
  const { scrollYProgress } = useScroll();
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0); // Track last scroll position

  // Loading Animation Timer - Optimized for the new satisfying animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); 
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect for header (Appearance & Visibility)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Background Style Logic
      setScrolled(currentScrollY > 20);

      // Visibility Logic (Hide on down, Show on up)
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling DOWN and not at the very top -> Hide
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu if open when scrolling down
      } else {
        // Scrolling UP or at top -> Show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP removed for pure React implementation to ensure perfect mobile performance without script fighting
  // The goal is native, buttery smooth touch interactions.

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  const handleLegalClick = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleShowMoreGallery = () => {
    setVisibleGalleryCount(prev => Math.min(prev + 6, GALLERY_IMAGES.length));
  };

  const whatsappMsgText = `Servus Thomas, ich bin's, ${whatsappName || '[Ihr Name]'}${whatsappCity ? ` aus ${whatsappCity}` : ''}. Ich hätte eine Anfrage wegen: *${whatsappService}*. Hast du demnächst Zeit für ein kurzes Telefonat oder Kennenlernen vor Ort?`;
  const whatsappMsgUrl = `https://wa.me/4917667580812?text=${encodeURIComponent(whatsappMsgText)}`;

  return (
    <div className="bg-white font-sans text-forest-950 selection:bg-forest-900 selection:text-white pb-20 md:pb-0">
      
      {/* --- MOBILE STICKY CONVERSION BAR (The Money Maker) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex md:hidden h-[60px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a 
          href="tel:017667580812" 
          className="flex-1 bg-white text-forest-950 flex flex-col items-center justify-center border-t border-gray-100 active:bg-gray-50 transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">Anrufen</span>
        </a>
        <a 
          href="https://wa.me/4917667580812?text=Hallo%20Herr%20Rott,%20ich%20hätte%20Interesse%20an%20einer%20Objektbetreuung." 
          className="flex-1 bg-forest-900 text-white flex flex-col items-center justify-center active:bg-forest-800 transition-colors"
        >
          <WhatsAppIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
        </a>
      </div>

      {/* --- PREMIUM LOADING SCREEN --- */}
      <div 
        className={`
          fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center gap-10 
          transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
          ${isLoading 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none scale-105 blur-sm'
          }
        `}
      >
         {/* Logo Animation */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
         >
           <img 
             src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
             alt="Thomas Rott Logo" 
             className="w-72 md:w-96 h-auto drop-shadow-2xl"
           />
         </motion.div>

         {/* Buttons Animation - Staggered entrance */}
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 items-center w-full max-w-sm px-6 sm:px-0"
         >
            <a 
              href="tel:017667580812" 
              className="group relative w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-forest-900 to-forest-800 text-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(17,41,33,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(17,41,33,0.6)] transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Phone className="w-5 h-5 text-forest-200" />
              <span className="font-sans font-bold tracking-wide">Anrufen</span>
            </a>

            <a 
              href="https://wa.me/4917667580812" 
              className="group relative w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-[#25D366] to-[#1da851] text-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span className="font-sans font-bold tracking-wide">WhatsApp</span>
            </a>
         </motion.div>
      </div>

      {/* --- HEADER --- */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-[90] px-4 md:px-8 py-4 transition-all duration-300 ease-in-out transform
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.03)]' : 'bg-transparent'}
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Elite Scroll Progress Indicator */}
        <motion.div 
           style={{ scaleX: scrollYProgress }} 
           className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-forest-700 origin-left z-20"
        />

        <div className="max-w-[1400px] mx-auto flex items-center justify-end relative">
            {/* Logo REMOVED from Navbar as requested */}
            
            {/* Desktop Nav Links (Centered) */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-forest-900/60 hover:text-forest-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA (Right) */}
            <div className="hidden md:block">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => {
                   const contact = document.getElementById('contact');
                   contact?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Erstgespräch
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 relative z-[60] text-forest-950 transition-transform duration-300"
              aria-label="Menü"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Menu Fullscreen Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-[55] bg-white/95 backdrop-blur-md text-forest-950 flex flex-col justify-center items-center md:hidden h-[100dvh]"
            >
              <div className="flex flex-col gap-8 items-center text-center w-full px-8">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                    key={link.label} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-3xl sm:text-4xl font-light tracking-wide text-forest-900 hover:text-forest-600 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex gap-8 mt-16 justify-center items-center text-forest-900/60"
              >
                 <a href="#" className="hover:text-forest-900 transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                 <a href="#" className="hover:text-forest-900 transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                 <a href="https://wa.me/4917667580812" className="hover:text-forest-900 transition-colors"><WhatsAppIcon className="w-6 h-6"/></a>
                 <a href="tel:017667580812" className="hover:text-forest-900 transition-colors"><Phone className="w-6 h-6"/></a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {currentView === 'home' ? (
          <>
            {/* --- HERO SECTION (Optimized for Mobile) --- */}
            {/* Reduced Top Padding to move content up (pt-24 / md:pt-32) */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
               <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                  
                  {/* Badge REMOVED here */}

                  {/* Logo */}
                  <img 
                    src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
                    alt="Thomas Rott Logo" 
                    className="w-full max-w-[250px] md:max-w-[350px] lg:max-w-[400px] h-auto mb-8 animate-fade-up mx-auto"
                    style={{ animationDelay: '0.0s' }}
                  />

                  {/* High Quality Live Active Ticker Badge */}
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.4, duration: 0.5 }}
                     className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 text-emerald-800 text-xs font-semibold tracking-wide shadow-sm"
                  >
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                     <span>Heute im Raum <span className="underline decoration-emerald-500/30 font-bold">{activeTickerCity}</span> &amp; Umgebung im Einsatz</span>
                  </motion.div>

                  {/* Headline */}
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-forest-950 mb-6 animate-fade-up leading-tight"
                    style={{ animationDelay: '0.1s' }}
                  >
                    {HERO_HEADLINE}
                  </h1>

                  {/* Subline */}
                  <p className="text-lg md:text-xl text-forest-900/60 leading-relaxed max-w-2xl mb-10 md:mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    {HERO_SUBTEXT}
                  </p>

                  {/* CTA Buttons (Stacked on Mobile for easy tapping) */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto shadow-xl shadow-forest-900/20"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Jetzt kostenloses Angebot einholen
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto"
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Meine Leistungen ansehen
                    </Button>
                  </div>

                  {/* Trust Indicators (Social Proof immediately visible) */}
                  <div className="mt-8 md:mt-12 flex items-center gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                      <div className="flex flex-col items-center">
                         {/* GLOWING STARS */}
                         <div className="flex gap-1 text-yellow-400 mb-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                         </div>
                         <span className="text-xs font-medium text-forest-900/60">Von Nachbarn in Freising & Umgebung empfohlen.</span>
                      </div>
                  </div>

               </div>
            </section>

             {/* --- PHILOSOPHY (ABOUT) SECTION (Refined Text) --- */}
              <section id="about" className="bg-forest-950 py-16 md:py-24 relative overflow-hidden rounded-3xl md:rounded-[4rem] mx-4 md:mx-0 mb-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <div className="order-2 lg:order-1 relative">
                          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent z-10" />
                            <img
                              src="https://i.postimg.cc/jqcqHjMd/Whats-App-Image-2025-12-21-at-15-45-22.jpg"
                              alt="Thomas Rott bei der Arbeit"
                              className="w-full h-[500px] lg:h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Optional: Add a small badge on top of the image */}
                            <div className="absolute bottom-8 left-8 z-20">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-white text-sm font-medium">Im Einsatz vor Ort</span>
                                </div>
                            </div>
                          </div>
                      </div>

                      <div className="space-y-8 order-1 lg:order-2">
                        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                          <span className="text-forest-200/90 text-xs font-bold uppercase tracking-widest">Die Philosophie</span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-5xl font-sans font-bold tracking-tight text-white/95 leading-tight">
                          Warum Sie sich auf mich <br/>
                          <span className="font-serif italic font-normal text-forest-400">verlassen können.</span>
                        </h2>
                        
                        <div className="space-y-6 text-white/70 text-lg leading-relaxed font-normal">
                          <p>
                            Ich bin kein anonymer Konzern, bei dem Sie in der Warteschleife hängen. Wenn Sie Rott Haus & Garten beauftragen, stehe ich selbst vor Ihrer Tür.
                          </p>
                          <p>
                            Mir ist wichtig, dass Ihre Hecke perfekt geschnitten ist, der Hof blitzblank ist und Sie sich um nichts mehr kümmern müssen. Mein Versprechen: Ich arbeite so sorgfältig, als wäre es mein eigenes Grundstück.
                          </p>
                        </div>

                        <div className="pt-8 flex gap-12 border-t border-white/10">
                           <div>
                              <div className="text-3xl font-sans font-bold tracking-tight text-white">1</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Ansprechpartner</div>
                           </div>
                           <div>
                              <div className="text-3xl font-sans font-bold tracking-tight text-white">100%</div>
                              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Einsatz</div>
                           </div>
                        </div>
                      </div>

                    </div>
                </div>
              </section>

            {/* --- SERVICES (Swipeable on Mobile) --- */}
            <section id="services" className="py-16 md:py-32 bg-slate-50">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16">
                     <div>
                       <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-forest-950 mb-3">
                         Leistungs<span className="font-serif italic font-normal text-forest-700">spektrum</span>
                       </h2>
                       <p className="text-forest-900/60 text-sm md:text-base">Filterbare Services für Garten, Haus und Baggerarbeiten.</p>
                     </div>

                     {/* Dynamic Tab Filter */}
                     <div className="flex flex-wrap gap-2.5 bg-white/60 backdrop-blur-sm border border-forest-100/40 p-1.5 rounded-full shadow-sm max-w-full overflow-x-auto">
                        {[
                           { id: 'All', label: 'Alle' },
                           { id: 'Garten', label: 'Garten & Hecken' },
                           { id: 'Haus', label: 'Haus & Reinigung' },
                           { id: 'Spezial', label: 'Bagger & Winter' }
                        ].map((tab) => {
                           const isActive = selectedCategoryFilter === tab.id;
                           return (
                              <button
                                 key={tab.id}
                                 onClick={() => setSelectedCategoryFilter(tab.id as any)}
                                 className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                                    isActive ? 'text-white font-semibold' : 'text-forest-900/60 hover:text-forest-900'
                                 } cursor-pointer min-w-fit`}
                              >
                                 {isActive && (
                                    <motion.span 
                                       layoutId="activeCategoryTab"
                                       className="absolute inset-0 bg-forest-900 rounded-full"
                                       transition={{ type: "spring", stiffness: 350, damping: 28 }}
                                    />
                                 )}
                                 <span className="relative z-10">{tab.label}</span>
                              </button>
                           );
                        })}
                     </div>
                  </div>

                  {/* Grid Container for Desktop & Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 pb-8 md:pb-0">
                     {SERVICE_PACKAGES.filter(pkg => {
                        if (selectedCategoryFilter === 'All') return true;
                        if (selectedCategoryFilter === 'Garten') {
                          return pkg.category === 'Garten' || pkg.category === 'Bau & Garten';
                        }
                        if (selectedCategoryFilter === 'Haus') {
                          return pkg.category === 'Haus' || pkg.category === 'Sauberkeit';
                        }
                        if (selectedCategoryFilter === 'Spezial') {
                          return pkg.category === 'Sicherheit' || pkg.category === 'Bau';
                        }
                        return true;
                     }).map((pkg, idx) => (
                        <div 
                          key={idx}
                          className={`
                            relative flex flex-col p-8 rounded-3xl transition-all duration-500
                            ${pkg.highlight 
                              ? 'bg-white border-2 border-forest-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-10 lg:-translate-y-2' 
                              : 'bg-white border border-forest-100/60 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-forest-200/50'}
                          `}
                        >
                           {pkg.badge && (
                             <span className="self-start px-3 py-1 bg-forest-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
                               {pkg.badge}
                             </span>
                           )}
                           <h3 className="text-2xl font-sans font-bold tracking-tight text-forest-950 mb-3">{pkg.name}</h3>
                           <p className="text-sm text-forest-900/60 mb-8 leading-relaxed flex-grow">{pkg.description}</p>
                           
                           <ul className="space-y-3 mb-8">
                              {pkg.features.slice(0, 4).map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-forest-900/80">
                                   <Check className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                                   {f}
                                </li>
                              ))}
                           </ul>

                           <Button variant={pkg.highlight ? 'primary' : 'outline'} size="sm" className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                              {pkg.cta}
                           </Button>
                        </div>
                     ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <p className="text-forest-900/80 text-lg mb-6">Ist Ihr Projekt nicht dabei? Fragen Sie mich einfach!</p>
                    <Button 
                      size="lg" 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Jetzt anfragen
                    </Button>
                  </div>
               </div>
            </section>

            {/* --- GALLERY (Trust) --- */}
            <section id="gallery" className="py-16 md:py-32 bg-white">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-forest-950 mb-12 text-center">
                    Ein<span className="font-serif italic font-normal text-forest-700">blicke</span>
                  </h2>
                  
                  {/* Animated Gallery Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     <AnimatePresence>
                        {GALLERY_IMAGES.slice(0, visibleGalleryCount).map((img, idx) => (
                           <motion.div 
                              key={img.src} // Use src as unique key to prevent re-render issues
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-forest-50"
                           >
                              <img 
                                src={img.src} 
                                alt={img.alt} 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 cursor-zoom-in" onClick={() => setActiveLightboxIndex(idx)}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center pointer-events-none cursor-zoom-in" onClick={() => setActiveLightboxIndex(idx)}>
                                 <span className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/25 transform scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-md">
                                    🔍 Vergrößern
                                 </span>
                              </div>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>

                  {/* Show More Button */}
                  {visibleGalleryCount < GALLERY_IMAGES.length && (
                     <div className="mt-12 flex justify-center">
                        <Button 
                           variant="outline" 
                           onClick={handleShowMoreGallery}
                           className="group gap-2 pl-6 pr-6"
                        >
                           Mehr anzeigen
                           <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                        </Button>
                     </div>
                  )}
               </div>
            </section>

            {/* --- PROCESS (Credibility) --- */}
            <section id="process" className="py-16 md:py-32 bg-forest-900 text-white">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="max-w-2xl mb-16">
                     <span className="text-forest-300 text-xs font-bold uppercase tracking-widest mb-4 block">Der Ablauf</span>
                     <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6">
                       In 3 Schritten zu einem <span className="font-serif italic font-normal text-forest-300">gepflegten Grundstück.</span>
                     </h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-12">
                     {PROCESS_STEPS.map((step, idx) => (
                        <div key={idx} className="relative">
                           <div className="text-6xl font-serif italic text-forest-800 absolute -top-8 -left-4 -z-0 opacity-50 select-none">{step.step}</div>
                           <div className="relative z-10">
                              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                 {step.title}
                              </h3>
                              <p className="text-forest-100/60 leading-relaxed text-sm">
                                 {step.desc}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-16 md:py-32 bg-white overflow-hidden">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-forest-950 mb-16 text-center">
                    Das sagen meine Kunden <br className="hidden md:block" />aus der <span className="font-serif italic font-normal text-forest-700">Nachbarschaft</span>
                  </h2>
                  
                  <div className="relative flex overflow-hidden w-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                     <SmoothMarquee>
                        {[...Array(2)].map((_, groupIdx) => (
                           <div key={groupIdx} className="flex gap-6 pr-6">
                              {TESTIMONIALS.map((t, i) => (
                                 <div key={`${groupIdx}-${i}`} className="bg-forest-50 p-8 rounded-2xl border border-forest-100/50 w-[300px] md:w-[400px] flex-shrink-0 flex flex-col">
                                    <div className="flex gap-1 text-emerald-500 mb-4">
                                       {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <p className="text-forest-900/80 mb-6 italic text-sm leading-relaxed">"{t.quote}"</p>
                                    <div className="mt-auto">
                                      <p className="text-sm font-bold text-forest-950">{t.author}</p>
                                      <p className="text-xs text-forest-900/40 uppercase tracking-wider mt-1">{t.service}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ))}
                     </SmoothMarquee>
                  </div>
                  
                  <div className="text-center mt-12">
                     <a href="https://www.my-hammer.de/auftragnehmer/facility-management-rott" target="_blank" rel="noopener" className="text-forest-600 font-bold hover:underline">
                        Alle Bewertungen auf MyHammer ansehen →
                     </a>
                  </div>
               </div>
            </section>

            {/* --- FAQ SECTION (High-End SEO & Trust) --- */}
            <section className="py-16 md:py-28 bg-forest-50/20 border-t border-b border-forest-100/40">
               <div className="max-w-4xl mx-auto px-4 md:px-8">
                  <div className="text-center mb-16">
                     <span className="text-forest-600 text-xs font-bold uppercase tracking-widest mb-3 block">Häufig gestellte Fragen</span>
                     <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-forest-950">
                       Haben Sie Fragen? <span className="font-serif italic font-normal text-forest-700">Antworten</span> direkt vom Profi.
                     </h2>
                  </div>
                  
                  <div className="space-y-4">
                     {FAQ_ITEMS.map((faq, idx) => (
                        <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
                     ))}
                  </div>
               </div>
            </section>

            {/* --- CONTACT / FOOTER --- */}
            <footer id="contact" className="bg-white pt-16 md:pt-32 pb-32 md:pb-12 border-t border-forest-100">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="grid lg:grid-cols-2 gap-16 mb-24">
                     <div>
                        <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-forest-950 mb-8">
                           Lust auf einen Garten, <br/>der einfach <span className="font-serif italic font-normal text-forest-700">Freude macht?</span>
                        </h2>
                        <p className="text-lg text-forest-900/60 mb-10 max-w-md">
                           Schreiben Sie mir direkt eine Nachricht oder rufen Sie mich an. Ich freue mich darauf, Ihr Projekt kennenzulernen!
                        </p>

                        {/* --- LIGHTWEIGHT INTERACTIVE WHATSAPP BUILDER --- */}
                        <div className="bg-forest-50 p-6 md:p-8 rounded-[2rem] border border-forest-100/50 mb-10 max-w-lg shadow-sm">
                           <h3 className="text-xl font-sans font-semibold tracking-tight text-forest-950 mb-2 flex items-center gap-2.5">
                              <MessageCircle className="w-5 h-5 text-emerald-600 animate-pulse" />
                              Express-Anfrage per WhatsApp
                           </h3>
                           <p className="text-sm text-forest-900/60 mb-6 font-normal">
                              Tragen Sie kurz Ihre Daten ein, um eine perfekt ausformulierte Nachricht direkt an mich zu senden:
                           </p>
                           
                           <div className="space-y-4 mb-6">
                              <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-900/60 mb-1.5" htmlFor="whatsappName">Ihr Name</label>
                                    <input 
                                       type="text"
                                       id="whatsappName"
                                       value={whatsappName}
                                       onChange={(e) => setWhatsappName(e.target.value)}
                                       placeholder="Name..."
                                       className="w-full bg-white border border-forest-100/60 rounded-xl px-4 py-2.5 text-sm text-forest-950 placeholder-forest-900/30 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                                    />
                                 </div>
                                 <div>
                                    <label className="block text-xs uppercase tracking-wider font-semibold text-forest-900/60 mb-1.5" htmlFor="whatsappCity">Wohnort</label>
                                    <input 
                                       type="text"
                                       id="whatsappCity"
                                       value={whatsappCity}
                                       onChange={(e) => setWhatsappCity(e.target.value)}
                                       placeholder="Freising..."
                                       className="w-full bg-white border border-forest-100/60 rounded-xl px-4 py-2.5 text-sm text-forest-950 placeholder-forest-900/30 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                                    />
                                 </div>
                              </div>
                              <div>
                                 <label className="block text-xs uppercase tracking-wider font-semibold text-forest-900/60 mb-1.5" htmlFor="whatsappService">Gewünschte Dienstleistung</label>
                                 <select
                                    id="whatsappService"
                                    value={whatsappService}
                                    onChange={(e) => setWhatsappService(e.target.value)}
                                    className="w-full bg-white border border-forest-100/60 rounded-xl px-4 py-2.5 text-sm text-forest-950 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
                                 >
                                    {SERVICE_PACKAGES.map(pkg => (
                                       <option key={pkg.name} value={pkg.name}>{pkg.name}</option>
                                    ))}
                                    <option value="Anderes Anliegen">Sonstiges / Anderes Anliegen</option>
                                 </select>
                               </div>
                           </div>

                           {/* Live Message Preview */}
                           <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 mb-6">
                              <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-800 mb-1.5 text-left">Vorschau Ihrer Nachricht:</p>
                              <p className="text-xs text-forest-900/70 italic leading-relaxed text-left">
                                 "Servus Thomas, ich bin's, <span className={whatsappName ? "text-emerald-700 font-semibold" : "text-forest-900/30 font-medium"}>{whatsappName || "[Ihr Name]"}</span>
                                 {whatsappCity ? <> aus <span className="text-emerald-700 font-semibold">{whatsappCity}</span></> : <> aus [Wohnort]</>}. Ich hätte eine Anfrage wegen: <span className="text-emerald-700 font-semibold font-sans">*{whatsappService}*</span>. Hast du demnächst Zeit...?"
                              </p>
                           </div>

                           <a 
                              href={whatsappMsgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-br from-[#25D366] to-[#1da851] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                           >
                              <WhatsAppIcon className="w-5 h-5 text-white animate-bounce" />
                              <span className="font-sans font-bold text-sm tracking-wide">Nachricht über WhatsApp senden</span>
                           </a>
                        </div>

                        <div className="flex flex-col gap-4 mb-8">
                           <span className="text-xs uppercase tracking-wider font-bold text-forest-900/40 block">Direkt anrufen oder Mail senden:</span>
                           <a href="tel:017667580812" className="flex items-center gap-4 text-3xl md:text-4xl font-semibold hover:text-emerald-700 transition-colors">
                              <Phone className="w-7 h-7 md:w-9 md:h-9 text-forest-900 shrink-0" />
                              0176 / 675 808 12
                           </a>
                           <a href="mailto:info@thomasrott.de" className="flex items-center gap-4 text-lg md:text-xl font-medium hover:text-emerald-700 transition-colors text-forest-900/80">
                              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                              info@thomasrott.de
                           </a>
                        </div>

                        {/* Social Icons added here */}
                        <div className="flex gap-4">
                           <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-white hover:bg-forest-900 transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                           <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-white hover:bg-forest-900 transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                        </div>
                     </div>

                     <div className="bg-forest-950 rounded-[2rem] p-8 md:p-12 text-white flex flex-col justify-between">
                        <div>
                           <h3 className="text-2xl font-sans font-bold tracking-tight mb-4">Einzugsgebiet</h3>
                           <p className="text-sm text-white/60 mb-8 leading-relaxed">
                              Prüfen Sie sofort, ob wir in Ihrer Gemeinde oder Ihrem Landkreis aktiv sind:
                           </p>
                           
                           {/* Interactive Area Checker */}
                           <div className="mb-8 relative z-10">
                              <div className="relative">
                                 <input 
                                    type="text"
                                    value={areaSearchQuery}
                                    onChange={(e) => handleAreaSearch(e.target.value)}
                                    placeholder="Ort oder PLZ eingeben..."
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 pr-10 text-white placeholder-white/40 focus:outline-none focus:border-forest-400 transition-colors"
                                 />
                                 <MapPin className="absolute right-3.5 top-3.5 w-5 h-5 text-white/40" />
                              </div>
                              
                              {/* Realtime Feedback Card */}
                              <AnimatePresence>
                                 {areaSearchResult && (
                                    <motion.div 
                                       initial={{ opacity: 0, y: -10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       exit={{ opacity: 0, y: -10 }}
                                       className={`mt-4 p-4 rounded-xl border ${
                                          areaSearchResult.found 
                                             ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                                             : 'bg-white/5 border-white/10 text-white/80'
                                       }`}
                                    >
                                       <div className="flex items-start gap-3">
                                          {areaSearchResult.found ? (
                                             <>
                                                <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                                <div>
                                                   <p className="font-bold text-sm">Ja, wir sind in {areaSearchResult.city} aktiv!</p>
                                                   <p className="text-xs text-emerald-300/80 mt-0.5">Sichern Sie sich ein unverbindliches Erstgespräch vor Ort.</p>
                                                </div>
                                             </>
                                          ) : (
                                             <>
                                                <MapPin className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                                                <div>
                                                   <p className="font-bold text-sm">„{areaSearchResult.city}“ nicht explizit gelistet?</p>
                                                   <p className="text-xs text-white/60 mt-0.5">Fragen Sie einfach per WhatsApp oder Telefon an – oft übernehmen wir angrenzende Orte!</p>
                                                </div>
                                             </>
                                          )}
                                       </div>
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                           </div>

                           <p className="text-xs text-white/40 mb-3 uppercase tracking-wider font-semibold">Auszug aus den Einsatzorten:</p>
                           <div className="flex flex-wrap gap-2 mb-8">
                              {LOCATION_CITIES.slice(0, 11).map(city => (
                                 <span key={city} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-white/80 transition-colors cursor-default">
                                    {city}
                                 </span>
                              ))}
                              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/40 italic font-medium">weitere Orte...</span>
                           </div>
                        </div>

                        <div className="space-y-2 text-white/60 text-sm border-t border-white/10 pt-6">
                           <p className="font-medium text-white font-sans">Thomas Rott Objektpflege &amp; Dienstleistungen</p>
                           <p>Kreisstraße 17, 85410 Haag an der Amper</p>
                           <p className="text-xs text-white/40 mt-1">Gewerblich angemeldet &amp; haftpflichtversichert</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center text-xs text-forest-900/40 uppercase tracking-widest pt-8 border-t border-forest-100">
                     <div className="flex gap-6 mb-4 md:mb-0">
                        <button onClick={() => handleLegalClick('impressum')} className="hover:text-forest-900">Impressum</button>
                        <button onClick={() => handleLegalClick('datenschutz')} className="hover:text-forest-900">Datenschutz</button>
                        <button onClick={() => handleLegalClick('agb')} className="hover:text-forest-900">AGB</button>
                     </div>
                     <p>© 2025 Thomas Rott. Qualität aus Bayern.</p>
                     <a href="http://vamela.info" target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 hover:text-forest-900 transition-colors flex items-center gap-1">
                        <span>Designed by</span>
                        <span className="font-bold text-forest-900">VAMELA</span>
                     </a>
                  </div>
               </div>
            </footer>
          </>
        ) : (
          <LegalView 
            content={LEGAL_CONTENT[currentView]} 
            onBack={() => {
              setCurrentView('home');
              window.scrollTo(0,0);
            }} 
          />
        )}
      </main>

      {/* --- ELITE GALLERY LIGHTBOX --- */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
          >
             {/* Header */}
             <div className="flex justify-end items-center w-full max-w-7xl mx-auto z-10 pt-2 text-white">
                <button 
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white cursor-pointer"
                  aria-label="Schließen"
                >
                   <X className="w-6 h-6" />
                </button>
             </div>

             {/* Main Image Stage */}
             <div className="flex-1 flex items-center justify-center relative max-w-7xl mx-auto w-full py-4">
                {/* Previous Button */}
                <button 
                   onClick={() => {
                      setActiveLightboxIndex(prev => prev !== null ? (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1) : null);
                   }}
                   className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white cursor-pointer z-10"
                   aria-label="Vorheriges Bild"
                >
                   <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button 
                   onClick={() => {
                      setActiveLightboxIndex(prev => prev !== null ? (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1) : null);
                   }}
                   className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white cursor-pointer z-10"
                   aria-label="Nächstes Bild"
                >
                   <ArrowRight className="w-5 h-5" />
                </button>

                <motion.img 
                   key={activeLightboxIndex}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.35, ease: 'easeOut' }}
                   src={GALLERY_IMAGES[activeLightboxIndex].src}
                   alt={GALLERY_IMAGES[activeLightboxIndex].alt}
                   className="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/10"
                />
             </div>

             {/* Footer counter */}
             <div className="flex justify-center items-center gap-3 w-full pb-4 text-white/50 text-sm z-10">
                <span>{activeLightboxIndex + 1}</span>
                <span className="text-white/20">/</span>
                <span>{GALLERY_IMAGES.length}</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SCROLL-TO-TOP BUTTON --- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-[80] p-4 bg-forest-900 border border-forest-800 text-white hover:text-emerald-300 rounded-full shadow-2xl hover:bg-forest-950 transition-all duration-300 group cursor-pointer"
            aria-label="Nach oben scrollen"
          >
             <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;