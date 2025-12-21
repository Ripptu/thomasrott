import React from 'react';
import { Leaf, Wrench, Snowflake, Phone, Calendar, ClipboardCheck, Home, Droplets, PaintBucket } from 'lucide-react';
import { ServicePackage, Testimonial, ProcessStep, GalleryItem } from './types.ts';

export const NAV_LINKS = [
  { label: 'Expertise', href: '#services' },
  { label: 'Referenzen', href: '#gallery' },
  { label: 'Prozess', href: '#process' },
  { label: 'Kontakt', href: '#contact' },
];

export const HERO_HEADLINE = "Nicht nur gepflegt., Sondern perfektioniert.";
export const HERO_SUBTEXT = "Für Eigentümer, die den Unterschied zwischen 'sauber' und 'makellos' kennen. Ich biete keine einfachen Hausmeisterdienste, sondern unsichtbare Präzision für Immobilien mit Charakter.";

export const LOCATION_CITIES = [
  "Freising", "Erding", "Landshut", "München", "Moosburg", "Pfaffenhofen", "Dachau", 
  "Ingolstadt Süd", "Neufahrn", "Hallbergmoos", "Wartenberg", "Dorfen", "Mainburg", 
  "Kelheim", "Altötting", "Rosenheim", "Bad Aibling", "Wasserburg", "Ebersberg", 
  "Grafing", "Markt Schwaben", "Poing", "Unterschleißheim", "Garching", "Ismaning", 
  "Aichach", "Schrobenhausen"
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    name: "Grünanlagenpflege",
    category: "Ästhetik & Natur",
    description: "Grüne Oasen brauchen Pflege – ich lasse Ihren Außenbereich erblühen. Von Formschnitt bis Saisonbepflanzung.",
    badge: "Kernkompetenz",
    features: [
      "Rasen- & Gehölzpflege",
      "Heckenschnitt (Formschnitt)",
      "Unkrautbeseitigung",
      "Saisonale Bepflanzung"
    ],
    cta: "Garten besprechen"
  },
  {
    name: "Hausmeisterservice",
    category: "Betreuung",
    description: "Ich kümmere mich um Ihr Objekt, als wäre es mein eigenes. Regelmäßige Betreuung und Kontrolle Ihrer Immobilie.",
    features: [
      "Regelmäßige Kontrollgänge",
      "Funktionsprüfung Technik",
      "Mängelerfassung",
      "Kleinreparaturen"
    ],
    cta: "Betreuung anfragen"
  },
  {
    name: "Gebäudereinigung",
    category: "Sauberkeit",
    description: "Ein sauberes Umfeld ist Ihre Visitenkarte – ich sorge dafür, dass Ihr Gebäude stets einen gepflegten Eindruck macht.",
    features: [
      "Treppenhausreinigung",
      "Glas- & Fensterreinigung",
      "Bodenpflege",
      "Hygienekonzepte"
    ],
    cta: "Angebot einholen"
  },
  {
    name: "Fassadenreinigung",
    category: "Werterhalt",
    description: "Professionelle Reinigung für ein strahlendes Erscheinungsbild Ihres Gebäudes.",
    highlight: true, // Styling for "New/Special"
    badge: "Neu",
    features: [
      "Schonende Verfahren",
      "Algen- & Moosentfernung",
      "Langzeitschutz",
      "Wertsteigerung"
    ],
    cta: "Beratung anfordern"
  },
  {
    name: "Winterdienst",
    category: "Sicherheit",
    description: "Wenn der Winter Einzug hält, bin ich an Ihrer Seite. Sichere Wege auch bei Eis und Schnee.",
    features: [
      "Räumung nach Satzung",
      "Eisglättebekämpfung",
      "Haftungsübernahme",
      "24/7 Bereitschaft"
    ],
    cta: "Kapazität prüfen"
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    src: "https://i.postimg.cc/RZkvSJ0C/Whats-App-Image-2025-12-21-at-15-45-51.jpg",
    alt: "Präzise Heckenpflege",
    title: "Formschnitt in Perfektion",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/j5XT484R/Whats-App-Image-2025-12-21-at-15-46-05.jpg",
    alt: "Gepflegte Gartenanlage",
    title: "Grünanlagenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=1000&auto=format&fit=crop",
    alt: "Gepflegter Rasen und moderner Gartenweg",
    title: "Präzision im Grünen",
    category: "Gartenpflege"
  },
  {
    src: "https://images.unsplash.com/photo-1628032731853-27a5658b6884?q=80&w=1000&auto=format&fit=crop",
    alt: "Formschnitt Hecke",
    title: "Formschnitt & Hecken",
    category: "Gartenpflege"
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    alt: "Saubere Wohnanlage Eingangsbereich",
    title: "Gepflegte Wohnanlagen",
    category: "Objektbetreuung"
  },
  {
    src: "https://images.unsplash.com/photo-1599423612502-f383e5362939?q=80&w=1000&auto=format&fit=crop",
    alt: "Professionelle Reinigungsgeräte",
    title: "Professionelles Equipment",
    category: "Reinigung"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { 
    step: '01', 
    title: 'Audit', 
    desc: 'Ich besichtige Ihr Objekt nicht nur – ich analysiere es auf Schwachstellen und Optimierungspotenzial.',
    icon: Phone
  },
  { 
    step: '02', 
    title: 'Konzept', 
    desc: 'Kein Standard-Leistungsverzeichnis. Sie erhalten einen maßgeschneiderten Pflegeplan für Ihre Ansprüche.',
    icon: Calendar
  },
  { 
    step: '03', 
    title: 'Exzellenz', 
    desc: 'Ab Tag 1 übernehme ich die Verantwortung. Sie genießen das Ergebnis: Eine Immobilie in Bestform.',
    icon: ClipboardCheck
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Es ist selten, Dienstleister zu finden, die so mitdenken. Herr Rott agiert nicht als externer Arbeiter, sondern als Partner für unsere Liegenschaft.",
    author: "Michael Huber",
    role: "Immobilieninvestor",
    company: "Rosenheim"
  },
  {
    quote: "Die digitale Kommunikation und die absolute Verlässlichkeit haben uns überzeugt. Eine deutliche Aufwertung gegenüber klassischen Diensten.",
    author: "Dr. Sabine K.",
    role: "Eigentümergemeinschaft",
    company: "Traunstein"
  }
];