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
    src: "https://www.my-hammer.de/images/sp/original/7e1c9b79-5161-4acf-953c-38b57a421414.jpg",
    alt: "Gepflegte Grünanlagen",
    title: "Grünpflege Detail",
    category: "Gartenpflege"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/733ca733-2ccc-4fab-9510-9da2f3386319.jpg",
    alt: "Professioneller Heckenschnitt",
    title: "Heckenschnitt",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/j5XT484R/Whats-App-Image-2025-12-21-at-15-46-05.jpg",
    alt: "Gepflegte Gartenanlage",
    title: "Grünanlagenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/1017dbcf-4967-4b7d-a1ed-60600b4b0896.jpg",
    alt: "Objektbetreuung Außenbereich",
    title: "Außenanlagen",
    category: "Objektbetreuung"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/bf72f244-f4df-4f53-aad2-e467440b0bc6.jpg",
    alt: "Rasenpflege und Instandhaltung",
    title: "Rasenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/e4e0441f-0fb6-4914-8e75-bcae6c92c672.jpg",
    alt: "Professioneller Maschineneinsatz",
    title: "Professionelles Gerät",
    category: "Technik"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/9d8c202b-9eb0-4c57-b6e9-ac4a38fa826d.jpg",
    alt: "Saubere Pflasterflächen",
    title: "Flächenpflege",
    category: "Objektbetreuung"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/bd5a0998-0ee7-4c64-98d5-f0775b48dd87.jpg",
    alt: "Baumpflege und Schnitt",
    title: "Baumpflege",
    category: "Baumpflege"
  },
  {
    src: "https://www.my-hammer.de/images/sp/original/76aed574-637e-479a-82bb-b001da011ba4.jpg",
    alt: "Objektansicht gepflegt",
    title: "Gesamteindruck",
    category: "Objektbetreuung"
  },
  // New Images added below
  {
    src: "https://i.postimg.cc/BQ2yjZP5/Whats-App-Image-2026-01-17-at-1-40-04-PM.jpg",
    alt: "Gartenpflege Projekt",
    title: "Gartenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/28nJ1jLw/Whats-App-Image-2026-01-17-at-1-39-57-PM.jpg",
    alt: "Professioneller Schnitt",
    title: "Schnittarbeiten",
    category: "Baumpflege"
  },
  {
    src: "https://i.postimg.cc/fTYFVWSg/Whats-App-Image-2026-01-17-at-1-39-56-PM.jpg",
    alt: "Objektbetreuung Ansicht",
    title: "Objektpflege",
    category: "Objektbetreuung"
  },
  {
    src: "https://i.postimg.cc/KvtV1c3p/Whats-App-Image-2026-01-17-at-1-39-53-PM.jpg",
    alt: "Grünanlage gepflegt",
    title: "Grünanlage",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/xTL7XjNs/Whats-App-Image-2026-01-17-at-1-39-41-PM-(1).jpg",
    alt: "Team bei der Arbeit",
    title: "Einsatz vor Ort",
    category: "Team"
  },
  {
    src: "https://i.postimg.cc/4NpMY4H0/Whats-App-Image-2026-01-17-at-1-39-41-PM.jpg",
    alt: "Pflegearbeiten",
    title: "Instandhaltung",
    category: "Objektbetreuung"
  },
  {
    src: "https://i.postimg.cc/P5h7YG1Q/Whats-App-Image-2026-01-17-at-1-39-27-PM-(6).jpg",
    alt: "Saubere Kanten",
    title: "Detailpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/6pwPnsCc/Whats-App-Image-2026-01-17-at-1-39-27-PM-(5).jpg",
    alt: "Heckenschnitt",
    title: "Heckenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/qv0Fyf2Q/Whats-App-Image-2026-01-17-at-1-39-27-PM-(4).jpg",
    alt: "Rasenpflege",
    title: "Rasenpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/RZ9YKrwX/Whats-App-Image-2026-01-17-at-1-39-27-PM-(3).jpg",
    alt: "Laubentfernung",
    title: "Saisonpflege",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/kg9HKrWH/Whats-App-Image-2026-01-17-at-1-39-27-PM-(1).jpg",
    alt: "Objektbetreuung",
    title: "Objektservice",
    category: "Objektbetreuung"
  },
  {
    src: "https://i.postimg.cc/DwFNLV1R/Whats-App-Image-2026-01-17-at-1-39-26-PM-(1).jpg",
    alt: "Außenanlage",
    title: "Außenbereich",
    category: "Objektbetreuung"
  },
  {
    src: "https://i.postimg.cc/dVvfrMGz/Whats-App-Image-2026-01-17-at-1-39-26-PM.jpg",
    alt: "Gepflegtes Ambiente",
    title: "Gartenambiente",
    category: "Gartenpflege"
  },
  {
    src: "https://i.postimg.cc/nhZWB8vf/Whats-App-Image-2026-01-17-at-1-39-25-PM.jpg",
    alt: "Detailarbeit",
    title: "Feinschliff",
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