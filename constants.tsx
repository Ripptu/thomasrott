import React from 'react';
import { Leaf, Wrench, Snowflake, Phone, Calendar, ClipboardCheck, Home, Droplets, PaintBucket } from 'lucide-react';
import { ServicePackage, Testimonial, ProcessStep, GalleryItem, FAQItem } from './types.ts';

export const NAV_LINKS = [
  { label: 'Leistungen', href: '#services' },
  { label: 'Einblicke', href: '#gallery' },
  { label: 'Ablauf', href: '#process' },
  { label: 'Kontakt', href: '#contact' },
];

// COPYWRITING UPDATE: Sympathisch, bayerisch-herzlich, ehrlich und extrem stark für SEO.
export const HERO_HEADLINE = (
  <>
    Ihr Garten & Haus in <span className="font-serif italic font-normal text-forest-700">liebevollen Profi-Händen.</span>
  </>
);
export const HERO_SUBTEXT = "Servus, ich bin Thomas Rott! Vergessen Sie unzuverlässige Agenturen und anonyme Großfirmen. Als Ihr ehrlicher, bodenständiger Partner vor Ort kümmere ich mich persönlich um Ihr Grundstück im Raum Freising, Erding, Landshut & Umgebung. Mit Herzblut, eigenem Profi-Maschinenpark und dem Auge fürs Detail.";

export const LOCATION_CITIES = [
  "Freising", "Erding", "Landshut", "Moosburg", "München Nord", "Neufahrn", "Hallbergmoos", 
  "Wartenberg", "Dorfen", "Mainburg", "Haag an der Amper", "Zolling", "Nandlstadt", "Au in der Hallertau",
  "Marzling", "Langenbach", "Kirchdorf", "Fahrenzhausen", "Hörgertshausen", "Mauern", "Eching",
  "Garching", "Ismaning", "Unterschleißheim"
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    name: "Garten- & Heckenpflege",
    category: "Garten",
    description: "Ein Garten zum Aufatmen und Wohlfühlen. Ob Hecke stutzen, Rasenpflege, Unkrautbeseitigung oder fachgerechter Saisonschnitt – ich kümmere mich darum, dass Ihr privates Grün das ganze Jahr über glänzt.",
    badge: "Unsere Leidenschaft",
    features: [
      "Präziser Hecken- & Sträucherschnitt",
      "Erste-Klasse Rasenpflege & Vertikutieren",
      "Gründliche Unkraut- & Wildkrautbeseitigung",
      "Saisonale Gartenpflege & Laubservice"
    ],
    cta: "Garten-Gespräch vereinbaren"
  },
  {
    name: "Persönlicher Hausmeisterservice",
    category: "Haus",
    description: "Die Sorgenfrei-Garantie für Ihr Eigentum. Vom zuverlässigen Müllkübel-Service über Kontrollgänge bis hin zu kleinen Handwerkskniffen – ich halte Ihr Gebäude in Schuss und sichere den Wert Ihrer Immobilie.",
    features: [
      "Kleine Reparaturen & Instandhaltung",
      "Mülltonnen- & Bereitstellungsservice",
      "Regelmäßige Objekt- & Haustechnikkontrolle",
      "Leuchtmittelwechsel & Kleinmontagen"
    ],
    cta: "Objekt betreuen lassen"
  },
  {
    name: "Gründliche Reinigungsarbeiten",
    category: "Sauberkeit",
    description: "Strahlende Sauberkeit ohne Stress. Ich befreie Ihre Höfe, Einfahrten, Zuwege und Terrassen rückstandslos von Moos und Schmutz und reinige Treppenhäuser so sauber, dass das Nachhausekommen jeden Tag Freude bereitet.",
    features: [
      "Treppenhausreinigung für Mehrfamilienhäuser",
      "Hof-, Gehweg- & Einfahrtenreinigung",
      "Terrassenreinigung (Moos- & Algenbeseitigung)",
      "Zuverlässig-schonende Oberflächenpflege"
    ],
    cta: "Sauberkeits-Angebot einholen"
  },
  {
    name: "Zuverlässiger Winterdienst",
    category: "Sicherheit",
    description: "Schneefrei und sicher, noch bevor Sie aufstehen. Wenn der bayerische Winter einbricht, bin ich bereits für Sie aktiv. Zuverlässige Schneeräumung und umweltfreundliche Glättebekämpfung nach allen kommunalen Richtlinien.",
    features: [
      "Pünktliche Schneeräumung in den Morgenstunden",
      "Fachgerechter Streudienst bei Glatteis",
      "Einhaltung aller Ortssatzungen & Haftung",
      "24/7 Bereitschaft für Vertragspartner"
    ],
    cta: "Winterdienst sichern"
  },
  {
    name: "Präzise Erdarbeiten & Baggerarbeiten",
    category: "Bau & Garten",
    description: "Erdbewegungen mit Fingerspitzengefühl. Ob Geländenivellierung, präziser Grabenaushub für Leitungen oder die Vorbereitung von Tragschichten für Terrassen und Wege – mit modernem Bagger erledige ich das rasch und sauber.",
    features: [
      "Wendige Baggerarbeiten (auch bei Engpässen)",
      "Boden planieren & Gelände modellieren",
      "Grabenaushub für Kabel & Entwässerung",
      "Schottertragschichten herstellen"
    ],
    cta: "Baggerprojekt besprechen"
  },
  {
    name: "Fundamente für Wärmepumpen",
    category: "Bau",
    description: "Das perfekte Fundament für Ihre neue Wärmepumpe. Standfest gegossen, exakt eingemessen, inklusive staubfreier Kernbohrung durch die Kellerwand und sauberen Hausanschlussleitungen. Alles aus einer Hand.",
    features: [
      "Frostsicherer Aushub & Schotterbett",
      "Präzises Einschalen, Gießen & Glätten",
      "Erfahrene Kernbohrung durch die Außenmauer",
      "Fachgerechtes Einlegen der Zuleitungen"
    ],
    cta: "Fundament anfragen"
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
  },
  {
    src: "https://i.postimg.cc/jqcqHjMd/Whats-App-Image-2025-12-21-at-15-45-22.jpg",
    alt: "Arbeit am Objekt",
    title: "Einsatz vor Ort",
    category: "Objektbetreuung"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { 
    step: '01', 
    title: '1. Kostenlose Besichtigung', 
    desc: 'Ich komme vorbei und schaue mir an, was gemacht werden muss.',
    icon: Phone
  },
  { 
    step: '02', 
    title: '2. Faires Angebot', 
    desc: 'Sie bekommen einen transparenten Preis ohne versteckte Kosten.',
    icon: Calendar
  },
  { 
    step: '03', 
    title: '3. Zurücklehnen', 
    desc: 'Ich kümmere mich zuverlässig um die Arbeit – und Sie genießen das Ergebnis.',
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

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Welche Leistungen umfasst Ihre Gartenpflege in Freising und Umgebung?",
    answer: "Meine professionelle Gartenpflege reicht vom fachgerechten Rasenmähen und Vertikutieren über den präzisen Heckenschnitt, Strauchschnitt bis hin zu Unkrautbeseitigung, Laubentfernung und allgemeiner Saisonpflege. Ich stimme alle Maßnahmen individuell auf die Bedürfnisse Ihres Gartens ab, um einen langfristigen Werterhalt und ein makelloses Erscheinungsbild zu garantieren."
  },
  {
    question: "Erstellen Sie auch Fundamente für Wärmepumpen?",
    answer: "Ja, ich biete exakte Fundamentarbeiten speziell für Wärmepumpen an. Dies beinhaltet den präzisen Erdaushub, das Einbringen eines frostsicheren Schotterbetts mit Dränagegitter, das professionelle Einschalen, Gießen und Glätten des Betonfundaments. Auch Kernbohrungen für die Rohrdurchführung und das fachgerechte Verlegen der Anschlussleitungen gehören zu meinem Leistungsumfang."
  },
  {
    question: "Bieten Sie auch größere Erdarbeiten und Baggerarbeiten an?",
    answer: "Absolut. Mit meinem modernen Maschinenpark übernehme ich verschiedenste Baggerarbeiten, Bodennivellierungen, den Aushub von Leitungsgräben, Drainage-Arbeiten sowie das Vorbereiten von Tragschichten für Terrassen oder Zuwege. Auch der Abtransport und die Entsorgung von überschüssigem Erdaushub wird von mir zuverlässig abgewickelt."
  },
  {
    question: "Wie funktioniert die Zusammenarbeit beim Hausmeisterservice?",
    answer: "Zuverlässigkeit steht an erster Stelle. Nach einer gemeinsamen Erstbegehung definieren wir die genauen Intervalle und Tätigkeiten. Ob Leuchtmittelwechsel, kleinere Instandhaltungen, Bereitstellung der Mülltonnen oder regelmäßige Kontrollgänge – Sie haben immer mich als persönlichen Ansprechpartner und müssen sich um nichts weiter kümmern."
  },
  {
    question: "In welchen Städten und Gemeinden sind Sie aktiv?",
    answer: "Mein primäres Servicegebiet umfasst Freising, Erding, Landshut, Moosburg, Neufahrn, Hallbergmoos und Haag an der Amper sowie den gesamten nördlichen Raum von München. Je nach Projektgröße (wie z.B. bei aufwändigen Erdarbeiten oder Wärmepumpen-Fundamenten) nehme ich auch Aufträge in angrenzenden Regionen Oberbayerns und Niederbayerns entgegen."
  },
  {
    question: "Wie läuft der Prozess ab und wann erhalte ich mein Angebot?",
    answer: "Der Ablauf ist denkbar einfach und professionell: 1. Sie kontaktieren mich per Anruf oder WhatsApp für eine kostenlose, unverbindliche Erstbesichtigung vor Ort. 2. Ich begutachte das Projekt und erstelle Ihnen zeitnah ein transparentes Festpreis-Angebot ohne versteckte Nebenkosten. 3. Nach Ihrer Freigabe setzen wir die Arbeiten pünktlich, sauber und termingerecht um."
  }
];