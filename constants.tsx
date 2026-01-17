import React from 'react';
import { Leaf, Wrench, Snowflake, Phone, Calendar, ClipboardCheck, Home, Droplets, PaintBucket } from 'lucide-react';
import { ServicePackage, Testimonial, ProcessStep, GalleryItem } from './types.ts';

export const NAV_LINKS = [
  { label: 'Leistungen', href: '#services' },
  { label: 'Einblicke', href: '#gallery' },
  { label: 'Ablauf', href: '#process' },
  { label: 'Kontakt', href: '#contact' },
];

// COPYWRITING UPDATE: Kurz, prägnant, Premium-Anspruch.
export const HERO_HEADLINE = "Perfektion für Ihre Immobilie.";
export const HERO_SUBTEXT = "Ihr Partner für Gartenpflege und Objektbetreuung in München & Freising. Wir bieten keine einfachen Hausmeisterdienste, sondern Werterhalt durch Präzision. Zuverlässig. Diskret. Gründlich.";

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
    category: "Ästhetik",
    description: "Ihr Garten ist Ihre Visitenkarte. Wir sorgen für akkuraten Schnitt, unkrautfreie Beete und vitale Pflanzen.",
    badge: "Kernkompetenz",
    features: [
      "Rasen- & Gehölzpflege",
      "Heckenschnitt (Formschnitt)",
      "Beetpflege & Unkrautentfernung",
      "Saisonale Bepflanzung"
    ],
    cta: "Garten besprechen"
  },
  {
    name: "Objektkontrolle",
    category: "Sicherheit",
    description: "Wir sind Ihre Augen vor Ort. Regelmäßige Begehungen und technische Prüfungen verhindern teure Folgeschäden.",
    features: [
      "Wöchentliche Kontrollgänge",
      "Funktionsprüfung Technik",
      "Mängelerfassung & Report",
      "Sofortige Kleinreparaturen"
    ],
    cta: "Betreuung anfragen"
  },
  {
    name: "Gebäudereinigung",
    category: "Sauberkeit",
    description: "Reinigung auf Hotel-Niveau für Treppenhäuser und Gemeinschaftsflächen. Damit Sie sich wohlfühlen.",
    features: [
      "Treppenhausreinigung",
      "Glas- & Fensterreinigung",
      "Bodenpflege & Versiegelung",
      "Hygienekonzepte"
    ],
    cta: "Angebot einholen"
  },
  {
    name: "Fassadenreinigung",
    category: "Werterhalt",
    description: "Lassen Sie Ihr Gebäude wieder strahlen. Schonende Entfernung von Algen und Moos für langfristigen Schutz.",
    highlight: true, // Styling for "New/Special"
    badge: "Spezialität",
    features: [
      "Schonende Verfahren",
      "Algen- & Moosentfernung",
      "Langzeitschutz",
      "Sofortige Wertsteigerung"
    ],
    cta: "Beratung anfordern"
  },
  {
    name: "Winterdienst",
    category: "Pflicht",
    description: "Schlafen Sie entspannt aus. Wir übernehmen die Räum- und Streupflicht gemäß Gemeindesatzung.",
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
    src: "https://i.postimg.cc/jqcqHjMd/Whats-App-Image-2025-12-21-at-15-45-22.jpg",
    alt: "Arbeit am Objekt",
    title: "Einsatz vor Ort",
    category: "Objektbetreuung"
  },
  {
    src: "https://i.postimg.cc/j5XT484R/Whats-App-Image-2025-12-21-at-15-46-05.jpg",
    alt: "Gepflegte Gartenanlage",
    title: "Grünanlagenpflege",
    category: "Gartenpflege"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { 
    step: '01', 
    title: 'Analyse', 
    desc: 'Ich komme persönlich vorbei. Wir analysieren den Ist-Zustand Ihres Objekts und definieren Ihre Ziele.',
    icon: Phone
  },
  { 
    step: '02', 
    title: 'Konzept', 
    desc: 'Sie erhalten ein transparentes Leistungsverzeichnis. Keine versteckten Kosten, sondern klare Ergebnisse.',
    icon: Calendar
  },
  { 
    step: '03', 
    title: 'Umsetzung', 
    desc: 'Mein Team und ich übernehmen ab Tag 1 die Verantwortung. Sie genießen das Ergebnis.',
    icon: ClipboardCheck
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    author: "Familie M. aus Landshut",
    role: "Objektpflege",
    service: "Garten & Hecke",
    quote: "Alles super, freundlich, zuverlässig und saubere Arbeit. Gerne bis zum nächsten Bedarf, der sicher kommen wird."
  },
  {
    author: "Herr K. aus Hörgertshausen",
    role: "Baumpflege",
    service: "Baum- & Heckenschnitt",
    quote: "Hat pünktlich und einwandfrei gearbeitet. Hatte sogar zwei Bäume zur Pflege, die ausgelichtet wurden und einwandfrei aussahen."
  },
  {
    author: "Kunde aus Fahrenzhausen",
    role: "Großprojekt",
    service: "Rodung (250 m²)",
    quote: "Unkomplizierter Austausch, schnelle Umsetzung, fairer Preis. Tolles Ergebnis."
  },
  {
    author: "Cedric, Lengdorf",
    role: "Gartenpflege",
    service: "Heckenschnitt",
    quote: "5 Sterne Bewertung - Exzellente Ausführung."
  },
  {
    author: "Helga Baumgartner",
    role: "Moosburg",
    service: "Neuanlage Hochbeet",
    quote: "Super schnelle und kompetente Ausführung des Auftrags. Sehr zu empfehlen!"
  },
  {
    author: "Familie aus Petershausen",
    role: "Heckenschnitt",
    service: "25m Hecke",
    quote: "Schnell und zuverlässig. Der Preis war ebenfalls sehr fair. Man findet selten noch solche Handwerker! Klare Empfehlung."
  },
  {
    author: "Harald, Pfaffenhofen",
    role: "Gartenpflege",
    service: "Rückschnitt",
    quote: "2 junge sympathische Männer. Alles zur vollsten Zufriedenheit erledigt. Hecke und Sträucher sehr sauber zugeschnitten."
  },
  {
    author: "Kunde aus Finsing",
    role: "Komplettpflege",
    service: "Gartenunterhalt",
    quote: "Schnelle, professionelle Abwicklung, saubere Arbeit. Empfehlung von mir."
  },
  {
    author: "Simone, Freising",
    role: "Gartenpflege",
    service: "Rundum-Service",
    quote: "Alles perfekt! Pünktlich und sauber."
  },
  {
    author: "Gabriele H., Moosburg",
    role: "Notfall-Einsatz",
    service: "Gartenpflege",
    quote: "Der junge, sympathische Mann kam gleich am nächsten Tag. Wir werden ihn auf jeden Fall wieder engagieren!"
  },
  {
    author: "Michael, Altdorf",
    role: "Baumfällung",
    service: "Wurzelentfernung",
    quote: "Sehr gute Kommunikation, pünktlich, sehr gute Arbeit. Sehr empfehlenswert! Danke für die schnelle Erledigung!"
  }
];