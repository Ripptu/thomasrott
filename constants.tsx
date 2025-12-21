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
    author: "Kunde aus Landshut",
    role: "23. Nov 2025",
    service: "Pflegen und Entfernen von Rasen, Hecken und Sträuchern",
    quote: "Alles super, freundlich, zuverlässig und saubere Arbeit. Gerne bis zum nächsten Bedarf, der sicher kommen wird."
  },
  {
    author: "Kunde aus Hörgertshausen",
    role: "15. Nov 2025",
    service: "Bäume zurückschneiden, Heckenschnitt, Rasen mähen",
    quote: "Hat pünktlich und einwandfrei gearbeitet. Hatte sogar zwei Bäume zur Pflege, die ausgelichtet wurden und einwandfrei aussahen."
  },
  {
    author: "Kunde aus Fahrenzhausen",
    role: "31. Okt 2025",
    service: "Heckenschnitt, Rasen mähen, Hecke entfernen (250 m²)",
    quote: "Unkomplizierter Austausch, schnelle Umsetzung, fairer Preis. Tolles Ergebnis."
  },
  {
    author: "Cedric, Lengdorf",
    role: "26. Okt 2025",
    service: "Bäume zurückschneiden, Heckenschnitt (500 m²)",
    quote: "5 Sterne Bewertung (Kein Text hinterlegt)"
  },
  {
    author: "Rott Helmut, Gammelsdorf",
    role: "8. Okt 2025",
    service: "Bäume zurückschneiden (1000 m²)",
    quote: "Auftrag muss noch ausgeführt werden. // Antwort des Handwerkers: Danke für Ihre Rückmeldung! Der Auftrag steht noch aus. Sobald die Arbeiten abgeschlossen sind, hoffe ich, dass Sie mit dem Ergebnis genauso zufrieden sein werden."
  },
  {
    author: "Helga Baumgartner, Moosburg",
    role: "30. Sep 2025",
    service: "Abbau eines alten Hochbeets und Erstellen eines neuen",
    quote: "Super schnelle und kompetente Ausführung des Auftrags. Sehr zu empfehlen!"
  },
  {
    author: "Kunde aus Petershausen",
    role: "26. Sep 2025",
    service: "Heckenschnitt (25 Meter)",
    quote: "Wir haben die Firma Rott mit dem Schneiden unserer 25 Meter langen Hecke beauftragt. Die Arbeiten wurden schnell und zuverlässig erledigt. Der Preis war ebenfalls sehr fair. Man findet selten noch solche Handwerker! Klare Empfehlung."
  },
  {
    author: "Harald, Pfaffenhofen",
    role: "20. Sep 2025",
    service: "Heckenschnitt, Pflanzen behandeln (100 m²)",
    quote: "2 junge sympathische Männer. Alles zur vollsten Zufriedenheit erledigt. Hecke und Sträucher sehr sauber zugeschnitten. Sogar komplett entfernt. Immer wieder gerne. Preislich ok."
  },
  {
    author: "Mercedes Schulz, Pfaffenhofen",
    role: "16. Sep 2025",
    service: "Rasen mähen (300 m²)",
    quote: "5 Sterne Bewertung (Kein Text hinterlegt)"
  },
  {
    author: "Kunde aus Finsing",
    role: "15. Sep 2025",
    service: "Pflegen und Entfernen von Rasen, Hecken und Sträuchern",
    quote: "Schnelle, professionelle Abwicklung, saubere Arbeit. Empfehlung von mir."
  },
  {
    author: "Simone, Freising",
    role: "9. Sep 2025",
    service: "Pflegen und Entfernen von Rasen, Hecken und Sträuchern",
    quote: "Alles perfekt!"
  },
  {
    author: "Hattenhauer Gabriele, Moosburg",
    role: "11. Aug 2025",
    service: "Pflegen und Entfernen von Rasen, Hecken und Sträuchern",
    quote: "Der junge, sympathische Mann kam gleich am nächsten Tag und hat seine Aufgaben schnell und zuverlässig erledigt. Wir werden ihn auf jeden Fall wieder engagieren! Dankeschön!"
  },
  {
    author: "Michael, Altdorf",
    role: "5. Aug 2025",
    service: "Bäume zurückschneiden, Wurzeln entfernen (100 m²)",
    quote: "Sehr gute Kommunikation, pünktlich, sehr gute Arbeit und Abwicklung des Auftrages. Sehr empfehlenswert! Danke für die schnelle Erledigung!"
  }
];