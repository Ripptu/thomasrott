import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Menu, X, Check, ArrowRight, ArrowLeft, Phone, Star, ArrowUpRight, MapPin, Camera, MessageCircle, Clipboard
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_LINKS, HERO_HEADLINE, HERO_SUBTEXT, SERVICE_PACKAGES, PROCESS_STEPS, LOCATION_CITIES, GALLERY_IMAGES, TESTIMONIALS } from './constants.tsx';
import { Button } from './components/Button.tsx';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './components/SocialIcons.tsx';
import { LegalView } from './components/LegalView.tsx';
import { LEGAL_CONTENT } from './legalContent.ts';

type ViewState = 'home' | 'impressum' | 'agb' | 'datenschutz';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  
  // Refs for animations
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  // Loading Animation Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

      {/* --- LOADING SCREEN --- */}
      <div 
        className={`fixed inset-0 z-[110] bg-white flex items-center justify-center transition-opacity duration-700 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      >
         <span className="text-forest-900 font-serif text-2xl animate-pulse">TR</span>
      </div>

      {/* --- HEADER --- */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-[90] px-4 md:px-8 py-4 transition-all duration-300
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50' : 'bg-transparent'}
        `}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-end">
            {/* Logo REMOVED from Navbar as requested */}
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
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
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-forest-950"
              aria-label="Menü"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 md:hidden">
            {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-forest-950 py-2 border-b border-gray-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-4 pt-4 justify-center items-center">
               <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-forest-700 transition-colors"><InstagramIcon className="w-5 h-5"/></a>
               <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-forest-700 transition-colors"><FacebookIcon className="w-5 h-5"/></a>
            </div>
            <div className="flex gap-4 pt-2 justify-center">
              <a href="https://wa.me/4917667580812" className="p-3 bg-forest-50 rounded-full text-forest-900"><WhatsAppIcon className="w-5 h-5"/></a>
              <a href="tel:017667580812" className="p-3 bg-forest-50 rounded-full text-forest-900"><Phone className="w-5 h-5"/></a>
            </div>
          </div>
        )}
      </header>

      <main>
        {currentView === 'home' ? (
          <>
            {/* --- HERO SECTION (Optimized for Mobile) --- */}
            {/* Reduced Top Padding to move content up (pt-24 / md:pt-32) */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
               <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                  
                  {/* Badge REMOVED here */}

                  {/* LARGE LOGO instead of Text Headline */}
                  <img 
                    src="https://i.postimg.cc/pTPCtyfc/Logo-neu.png" 
                    alt="Thomas Rott Logo" 
                    className="w-full max-w-[280px] md:max-w-[500px] h-auto mb-8 animate-fade-up"
                    style={{ animationDelay: '0.1s' }}
                  />

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
                      Kostenloses Audit anfordern
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto"
                      onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Leistungen ansehen
                    </Button>
                  </div>

                  {/* Trust Indicators (Social Proof immediately visible) */}
                  <div className="mt-8 md:mt-12 flex items-center gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                      <div className="flex flex-col items-center">
                         {/* GLOWING STARS */}
                         <div className="flex gap-1 text-yellow-400 mb-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                         </div>
                         <span className="text-xs font-medium text-forest-900/60">4,8 Sterne Bewertung</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                      <div className="hidden sm:block text-xs font-medium text-forest-900/60">
                        37+ Betreute Objekte
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

                      <div className="space-y-8 order-1 lg:order-2">
                        <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                          <span className="text-forest-200/90 text-xs font-bold uppercase tracking-widest">Die Philosophie</span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-5xl font-serif text-white/95 leading-tight">
                          Qualität ist, wenn man nicht mehr <br/>
                          <span className="text-forest-400 italic">kontrollieren muss.</span>
                        </h2>
                        
                        <div className="space-y-6 text-white/70 text-lg leading-relaxed font-light">
                          <p>
                            Ich bin <strong>Thomas Rott</strong>. Ich habe dieses Unternehmen gegründet, weil "gut genug" für mich nicht reicht.
                          </p>
                          <p>
                            Sie suchen keinen einfachen Hausmeister, sondern einen Partner, der Ihre Werte schützt? Dann sind wir ein Match. Ich garantiere Ihnen: Was wir anpacken, wird makellos. Wenn ich gehe, ist die Arbeit nicht nur erledigt – sie ist perfekt.
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

            {/* --- SERVICES (Swipeable on Mobile) --- */}
            <section id="services" className="py-16 md:py-32 bg-forest-50/50">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="flex justify-between items-end mb-10 md:mb-16">
                     <div>
                       <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-4">Leistungsspektrum</h2>
                       <p className="text-forest-900/60 max-w-xl">Keine halben Sachen. Spezialisierte Lösungen für Werterhalt.</p>
                     </div>
                     <div className="hidden md:flex gap-2">
                        <button onClick={() => scrollContainer(servicesScrollRef, 'left')} className="p-3 rounded-full border border-forest-900/10 hover:bg-white transition-colors"><ArrowLeft className="w-5 h-5"/></button>
                        <button onClick={() => scrollContainer(servicesScrollRef, 'right')} className="p-3 rounded-full border border-forest-900/10 hover:bg-white transition-colors"><ArrowRight className="w-5 h-5"/></button>
                     </div>
                  </div>

                  {/* Horizontal Scroll Container for Mobile */}
                  <div 
                    ref={servicesScrollRef}
                    className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
                  >
                     {SERVICE_PACKAGES.map((pkg, idx) => (
                        <div 
                          key={idx}
                          className={`
                            min-w-[85vw] md:min-w-0 snap-center
                            flex flex-col p-8 rounded-3xl border transition-all duration-300
                            ${pkg.highlight ? 'bg-white border-forest-200 shadow-xl' : 'bg-white/50 border-transparent hover:bg-white hover:shadow-lg'}
                          `}
                        >
                           {pkg.badge && (
                             <span className="self-start px-3 py-1 bg-forest-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
                               {pkg.badge}
                             </span>
                           )}
                           <h3 className="text-2xl font-serif text-forest-950 mb-3">{pkg.name}</h3>
                           <p className="text-sm text-forest-900/60 mb-8 leading-relaxed flex-grow">{pkg.description}</p>
                           
                           <ul className="space-y-3 mb-8">
                              {pkg.features.slice(0, 3).map((f, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-forest-900/80">
                                   <Check className="w-4 h-4 text-forest-500 shrink-0 mt-0.5" />
                                   {f}
                                </li>
                              ))}
                           </ul>

                           <Button variant={pkg.highlight ? 'primary' : 'outline'} size="sm" className="w-full">
                              {pkg.cta}
                           </Button>
                        </div>
                     ))}
                  </div>
                  {/* Mobile Swipe Hint */}
                  <div className="flex md:hidden justify-center gap-1.5 mt-2">
                    {SERVICE_PACKAGES.map((_, i) => (
                      <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'w-6 bg-forest-900' : 'w-1.5 bg-forest-900/20'}`} />
                    ))}
                  </div>
               </div>
            </section>

            {/* --- GALLERY (Trust) --- */}
            <section id="gallery" className="py-16 md:py-32 bg-white">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-12 text-center">Einblicke</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {GALLERY_IMAGES.map((img, idx) => (
                       <div key={idx} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-forest-50">
                          <img 
                            src={img.src} 
                            alt={img.alt} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Clean Gallery Images - Text Removed as requested */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* --- PROCESS (Credibility) --- */}
            <section id="process" className="py-16 md:py-32 bg-forest-900 text-white">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="max-w-2xl mb-16">
                     <span className="text-forest-300 text-xs font-bold uppercase tracking-widest mb-4 block">Der Ablauf</span>
                     <h2 className="text-3xl md:text-5xl font-serif mb-6">Transparenz schafft Vertrauen.</h2>
                     <p className="text-forest-100/60 text-lg font-light">
                        Wir arbeiten nicht auf Zuruf, sondern mit System. So garantieren wir gleichbleibende Qualität.
                     </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-12">
                     {PROCESS_STEPS.map((step, idx) => (
                        <div key={idx} className="relative">
                           <div className="text-6xl font-serif text-forest-800 absolute -top-8 -left-4 -z-0 opacity-50 select-none">{step.step}</div>
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
                  <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-16 text-center">
                    Was Kunden sagen
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                     {/* Using the simple list for mobile, complex columns for desktop could be an enhancement later */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {TESTIMONIALS.slice(0, 3).map((t, i) => (
                           <div key={i} className="bg-forest-50 p-8 rounded-2xl border border-forest-100/50">
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
                  </div>
                  
                  <div className="text-center mt-12">
                     <a href="https://www.my-hammer.de/auftragnehmer/thomas-rott-facility-management" target="_blank" rel="noopener" className="text-forest-600 font-bold hover:underline">
                        Alle Bewertungen auf MyHammer ansehen →
                     </a>
                  </div>
               </div>
            </section>

            {/* --- CONTACT / FOOTER --- */}
            <footer id="contact" className="bg-white pt-16 md:pt-32 pb-32 md:pb-12 border-t border-forest-100">
               <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="grid lg:grid-cols-2 gap-16 mb-24">
                     <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-forest-950 mb-8">
                           Bereit für <br/>Exzellenz?
                        </h2>
                        <p className="text-lg text-forest-900/60 mb-10 max-w-md">
                           Kontaktieren Sie uns für ein unverbindliches Erstgespräch. Wir prüfen Ihre Anforderungen und erstellen ein individuelles Konzept.
                        </p>
                        
                        <div className="flex flex-col gap-4 mb-8">
                           <a href="tel:017667580812" className="flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-emerald-700 transition-colors">
                              <Phone className="w-6 h-6 md:w-8 md:h-8" />
                              0176 / 675 808 12
                           </a>
                           <a href="mailto:info@thomasrott.de" className="flex items-center gap-4 text-2xl md:text-3xl font-light hover:text-emerald-700 transition-colors">
                              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                              info@thomasrott.de
                           </a>
                        </div>

                        {/* Social Icons added here */}
                        <div className="flex gap-4">
                           <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-white hover:bg-forest-900 transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                           <a href="#" className="p-3 bg-forest-50 rounded-full text-forest-900 hover:text-white hover:bg-forest-900 transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                        </div>
                     </div>

                     <div className="bg-forest-950 rounded-[2rem] p-8 md:p-12 text-white">
                        <h3 className="text-2xl font-serif mb-8">Service-Gebiet</h3>
                        <div className="flex flex-wrap gap-3 mb-10">
                           {LOCATION_CITIES.slice(0, 10).map(city => (
                              <span key={city} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                 {city}
                              </span>
                           ))}
                           <span className="px-3 py-1 bg-white/10 rounded-full text-sm italic">+ Umgebung</span>
                        </div>
                        <div className="space-y-2 text-white/60 text-sm">
                           <p>Thomas Rott Facility Management</p>
                           <p>Kreisstraße 17, 85410 Haag an der Amper</p>
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
    </div>
  );
};

export default App;