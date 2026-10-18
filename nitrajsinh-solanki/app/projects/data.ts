// app/projects/data.ts

import { STATS } from "./stats";

export type BadgeColor = "teal" | "amber" | "violet" | "orange" | "blue";
export type ProjectCategory = "hackathon" | "client" | "personal";

export interface ProjectLink {
  label: string;
  href: string;
  icon: "github" | "live" | "demo" | "explorer";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  badge: string;
  badgeColor: BadgeColor;
  description: string;
  /** Complete search/social snippet, separate from the longer on-page copy. */
  seoDescription: string;
  /** Date this project's content was last updated (YYYY-MM-DD). */
  updated: string;
  longDescription: string;
  caseStudy: {
    challenge: string;
    approach: string;
    contribution: string;
    outcome: string;
  };
  tech: string[];
  features: string[];
  links: ProjectLink[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  iconPath: string;
  image?: string;
  award?: {
    prize: string;
    place?: string;
    event: string;
  };
  client?: {
    name: string;
    location: string;
  };
  teamNote?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "library-inventory-system",
    title: "Library & Book Store Inventory System",
    shortTitle: "Library Inventory System",
    category: "hackathon",
    badge: "🏆 $90 · 3rd Place",
    badgeColor: "teal",
    description:
      "Full-featured library management system with three user roles — Admin, Librarian, User. Handles book lifecycle, borrowing, fines, AI-powered descriptions, and email notifications.",
    seoDescription: "Role-based library system (Admin, Librarian, User) with borrowing, automatic fines, email OTP and Gemini AI. 3rd place, StackUp Hackathon.",
    updated: "2026-10-19",
    longDescription:
      "Built for the StackUp Hackathon, this system covers the complete lifecycle of a library — from adding books and managing users to borrowing, tracking overdue returns, and calculating fines automatically. Admins can promote users to Librarian role, configure fare settings, and monitor all transactions from a central dashboard. Book cover images are stored on Supabase Storage, and Google Gemini AI auto-generates book descriptions on demand.",
    caseStudy: {
      challenge: "A library needs one place to manage its catalogue, members, borrowing, overdue returns and fines, while restricting sensitive actions to the right roles.",
      approach: "Combine a Next.js and TypeScript interface with MongoDB/Mongoose data models, NextAuth and JWT sessions, email OTP verification, Supabase Storage for book covers, and Gemini for optional AI-written descriptions.",
      contribution: "Implemented Admin, Librarian and User workflows; protected dashboard routes; book borrowing and return logic; automatic fine calculations; configurable borrowing rules; email verification; cover uploads; and AI-assisted descriptions.",
      outcome: "Delivered a demonstrable end-to-end library workflow and earned 3rd place ($90) in the StackUp Hackathon. Separate demos show the Admin, Librarian and User experiences.",
    },
    tech: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Supabase Storage", "Google Gemini AI", "NextAuth", "JWT", "Nodemailer", "Tailwind CSS"],
    features: [
      "Three role system — Admin, Librarian, User with route-level protection",
      "AI-generated book descriptions via Google Gemini",
      "Borrow & return system with automatic fine calculation",
      "Email OTP verification before account activation",
      "Book cover image uploads to Supabase Storage",
      "Admin dashboard with analytics — user count, active borrows, overdue list",
      "Configurable fare settings — borrowing fees, late penalties, borrowing limits",
      "JWT + NextAuth session management",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/library-inventory-system", icon: "github" },
      { label: "Admin Demo", href: "https://youtu.be/_1GYteabksM?feature=shared", icon: "demo" },
      { label: "User Demo", href: "https://youtu.be/G3F-GpxAswI?feature=shared", icon: "demo" },
      { label: "Librarian Demo", href: "https://youtu.be/gHpUR4IV91c?feature=shared", icon: "demo" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    award: { prize: "$90", place: "3rd Place", event: "StackUp Hackathon" },
  },
  {
    id: "2",
    slug: "biomap",
    title: "BioMap — Scientific Explorer Platform",
    shortTitle: "BioMap",
    category: "hackathon",
    badge: "🏆 $70 · 4th Place",
    badgeColor: "teal",
    description:
      "Scientific web app unifying biodiversity maps, chemistry data, NASA space media, environmental monitoring, and educational resources — powered by 6 major public APIs.",
    seoDescription: "BioMap unifies biodiversity maps, chemistry data and NASA media from 6 public APIs in one Next.js app. 4th place, StackUp May 2025 Challenge.",
    updated: "2026-10-19",
    longDescription:
      "BioMap brings together six distinct scientific domains into one cohesive platform. Users can explore global species distributions on an interactive Leaflet map, search chemical compounds via PubChem, browse NASA's image and video archive, monitor environmental data by location, look up species taxonomy via iNaturalist, and access curated Wikipedia articles. Authentication uses OTP-based email verification with JWT sessions protecting all dashboard routes.",
    caseStudy: {
      challenge: "Biodiversity records, chemical references, environmental context, space media and educational material live in separate public data sources, making cross-domain exploration cumbersome.",
      approach: "Build one Next.js and TypeScript platform that connects GBIF, PubChem, NASA Images, OpenStreetMap Nominatim, iNaturalist and Wikipedia, with MongoDB-backed accounts and OTP/JWT-protected dashboard routes.",
      contribution: "Integrated the interactive species map, compound lookup, NASA media gallery, location-based environmental view, species taxonomy and conservation details, and educational article browsing into a shared interface.",
      outcome: "Delivered a multi-domain scientific explorer and placed 4th ($70) in the StackUp May 2025 Challenge.",
    },
    tech: ["Next.js 14", "TypeScript", "MongoDB", "Tailwind CSS", "Leaflet", "OpenStreetMap", "GBIF API", "PubChem API", "NASA Images API", "iNaturalist API", "Wikipedia API", "JWT"],
    features: [
      "Interactive biodiversity map with GBIF species occurrence data",
      "Chemistry database with molecular structures via PubChem",
      "NASA space media gallery — images and videos",
      "Environmental monitoring by location via OpenStreetMap Nominatim",
      "Species database with taxonomy and conservation status",
      "Wikipedia-powered educational resources section",
      "OTP-based email verification + JWT session management",
      "Protected dashboard routes and API endpoints",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/biomap", icon: "github" },
      { label: "Live App", href: "https://biomap-nitrajsinh-solankis-projects.vercel.app", icon: "live" },
      { label: "Demo Video", href: "https://youtu.be/df_NNqL2DzA?feature=shared", icon: "demo" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    award: { prize: "$70", place: "4th Place", event: "StackUp May 2025 Challenge" },
  },
  {
    id: "3",
    slug: "nft-marketplace-aptos",
    title: "NFT Marketplace on Aptos Blockchain",
    shortTitle: "Aptos NFT Marketplace",
    category: "hackathon",
    badge: "💰 $60 Bounty",
    badgeColor: "violet",
    description:
      "Feature-rich NFT marketplace powered by Aptos Move smart contracts. Supports auctions, royalties, offers, batch transfers, APT token payments, and a creator tipping system.",
    seoDescription: "NFT marketplace on Aptos built with Move smart contracts: auctions, royalties, offers, batch transfers and creator tips. $60 StackUp bounty.",
    updated: "2026-10-19",
    longDescription:
      "Built on the Aptos blockchain using the Move programming language, this marketplace enables users to mint, list, bid on, and trade NFTs with full on-chain logic. The smart contract handles auctions with time-based expiry, royalty enforcement on every secondary sale (5% default, 15% max), batch NFT transfers, an offer/counter-offer system, and a creator tipping mechanism — all paid in APT tokens. The React frontend connects via Petra Wallet.",
    caseStudy: {
      challenge: "A basic NFT listing page is not enough for a marketplace that needs transparent on-chain sales, timed auctions, creator rewards and flexible buyer-seller negotiation.",
      approach: "Use Aptos Move smart contracts for transaction rules and a React frontend connected through the Petra wallet and Aptos wallet adapter.",
      contribution: "Implemented marketplace flows for minting and listings, timed auctions, secondary-sale royalties, batch transfers, offers and counteroffers, APT payments, and creator tipping.",
      outcome: "Deployed the marketplace contract to Aptos Testnet and claimed a $60 bounty in the StackUp Aptos challenge.",
    },
    tech: ["Aptos Blockchain", "Move Language", "Aptos CLI", "React", "react-router-dom", "@aptos-labs/wallet-adapter-react", "Petra Wallet", "Web3"],
    features: [
      "On-chain auction system with custom start price and duration",
      "Royalty enforcement on every secondary sale (5% default, 15% max)",
      "Batch NFT transfers — multiple NFTs in one transaction",
      "Offer system — make, accept, or decline offers on listed NFTs",
      "Advanced filtering by rarity, price range, and listing date",
      "APT token payments for all marketplace transactions",
      "Creator tipping — direct APT donations to NFT creators",
      "Deployed on Aptos Testnet",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/aptos4-bounty-nft", icon: "github" },
      { label: "Demo Video", href: "https://youtu.be/ktyZZIuZpNY?feature=shared", icon: "demo" },
      { label: "Contract Explorer", href: "https://explorer.aptoslabs.com/account/0x3ed23f75dc96ed785388d48d31252e98e3b031fb3cdca6175f0a9c75d4489521/modules/code/NFTMarketplace?network=testnet", icon: "explorer" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    award: { prize: "$60 Bounty", event: "StackUp Bounty Challenge" },
  },
  {
    id: "4",
    slug: "moodify",
    title: "Moodify — AI Music Streaming App",
    shortTitle: "Moodify",
    category: "hackathon",
    badge: "🎖 $20 Merit Prize",
    badgeColor: "amber",
    description:
      "AI-powered music platform that recommends and streams music based on location, weather, and behaviour. Streams from Jamendo, Deezer, and Audius via Gemini AI recommendations.",
    seoDescription: "Moodify is an AI music app that recommends tracks by location and weather with Gemini and streams from Jamendo, Deezer and Audius. StackUp merit prize.",
    updated: "2026-10-19",
    longDescription:
      "Moodify is a context-aware music platform built with a two-person team. The Gemini AI engine ingests your current weather (OpenWeather API), location, time of day, and listening history to generate hyper-personalised track recommendations. Users can stream from three independent sources — Jamendo, Deezer, and Audius — through a single unified interface, upload their own tracks to Cloudinary, and chat with an AI music assistant in a conversational interface.",
    caseStudy: {
      challenge: "Music discovery can feel generic when it ignores a listener’s context, and tracks from different streaming catalogues are fragmented across services.",
      approach: "Use Gemini AI with weather, location, time of day and listening history to guide recommendations, while bringing Jamendo, Deezer and Audius into one Next.js interface.",
      contribution: "In a two-person team, focused on AI integration, API orchestration, authentication and application architecture; the project also includes an AI music chat, unified player, playlists and user uploads.",
      outcome: "Delivered a context-aware, multi-source music experience and received a $20 merit prize in the StackUp Hackathon.",
    },
    tech: ["Next.js 15", "React 19", "MongoDB", "Google Gemini AI", "Cloudinary", "Jamendo API", "Deezer API", "Audius API", "OpenWeather API", "TheAudioDB", "JWT", "Tailwind CSS"],
    features: [
      "Weather + location based AI music recommendations via Gemini",
      "Behavioural recommendations from listening history and liked tracks",
      "Multi-source streaming — Jamendo, Deezer, Audius in one UI",
      "Conversational AI music chat — describe mood, get track suggestions",
      "Custom music player with audio visualizer and queue system",
      "Upload your own tracks to Cloudinary with metadata",
      "Personal library — saved albums, playlists, liked tracks",
      "AI-generated listening behaviour summaries",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/nitrajsinh-solanki/hackathon_may_stackup", icon: "github" },
      { label: "Demo Video", href: "https://youtu.be/MAW5gd2lZxM?feature=shared", icon: "demo" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
    award: { prize: "$20 Merit Prize", event: "StackUp Hackathon" },
    teamNote: "Built in a team of 2 — Nitrajsinh Solanki (AI, APIs, Auth, Architecture) & Amar Tiwari (UI/UX, Music Player, Geo/Weather)",
  },
  {
    id: "5",
    slug: "math-genius-ai",
    title: "Math Genius AI — Learning Platform",
    shortTitle: "Math Genius AI",
    category: "hackathon",
    badge: "🎖 $10 Merit Prize",
    badgeColor: "blue",
    description:
      "AI-powered math education platform with adaptive quizzes, handwriting recognition, conversational AI tutor, performance tracking, and PDF report generation.",
    seoDescription: "Math Genius AI is a learning platform with adaptive quizzes, handwriting recognition, an AI tutor and PDF reports. StackUp Hackathon merit prize.",
    updated: "2026-10-19",
    longDescription:
      "Math Genius AI targets students learning Algebra, Geometry, Trigonometry, Calculus, Statistics, and more. Gemini AI dynamically generates topic-specific questions at the right difficulty level, adapting as the student improves. A Canvas API drawing board captures handwritten equations and sends them to Gemini for recognition and step-by-step solving. The conversational AI tutor answers math questions in plain language with full working shown.",
    caseStudy: {
      challenge: "Students need practice that adapts to their progress, help understanding handwritten equations, and feedback they can review after a session.",
      approach: "Combine Gemini-generated quizzes and tutoring with a Canvas drawing board, MongoDB progress data, JWT authentication and PDF reporting.",
      contribution: "Built adaptive topic quizzes, handwriting-to-solution flows, a conversational tutor with step-by-step explanations, performance tracking, and downloadable quiz reports.",
      outcome: "Delivered an interactive maths-learning platform covering topics from Algebra to Calculus and received a $10 merit prize in the StackUp Hackathon.",
    },
    tech: ["Next.js", "TypeScript", "Google Gemini AI", "MongoDB", "Canvas API", "jsPDF", "Express.js", "Node.js", "JWT", "Nodemailer", "Tailwind CSS"],
    features: [
      "Gemini AI generates adaptive topic-specific quiz questions",
      "Quiz difficulty adjusts automatically based on student performance",
      "Handwriting recognition — draw equations on Canvas, AI solves them",
      "Conversational AI math tutor with step-by-step explanations",
      "Covers Algebra, Geometry, Trigonometry, Calculus, Statistics, and more",
      "Performance tracking and learning analytics over time",
      "PDF report generation of quiz results via jsPDF",
      "OTP email verification + JWT session authentication",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/hackathon-feb", icon: "github" },
      { label: "Demo Video", href: "https://youtu.be/_UfK5yp_wGk?feature=shared", icon: "demo" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    award: { prize: "$10 Merit Prize", event: "StackUp Hackathon" },
  },
  {
    id: "6",
    slug: "meeting-insights-generator",
    title: "Meeting Insights Generator",
    shortTitle: "Meeting Insights",
    category: "hackathon",
    badge: "🤖 Hackathon Submission",
    badgeColor: "amber",
    description:
      "Multimodal AI app that transcribes meeting audio, summarizes with AI, retrieves visual highlights from Pexels, and converts summaries back to speech — full end-to-end pipeline.",
    seoDescription: "Multimodal GenAI app that transcribes meeting audio, summarizes it, fetches Pexels visual highlights and reads summaries back as speech.",
    updated: "2026-10-19",
    longDescription:
      "Built for the 'From Words to Worlds — Multimodal GenAI' hackathon, this app handles the complete meeting intelligence pipeline. Upload a recording and AssemblyAI transcribes it to full text. The Facebook Bart Large CNN model on Hugging Face then summarizes the transcript. Key points from the summary drive Pexels image searches for visual highlights. Finally Deepgram converts the summary to an audio file, and everything is stored persistently on Cloudinary.",
    caseStudy: {
      challenge: "Reviewing a long meeting recording manually takes time, and a plain transcript does not provide a concise, listenable summary with supporting visuals.",
      approach: "Connect AssemblyAI transcription, Hugging Face’s BART summarization model, Pexels image search, Deepgram text-to-speech and Cloudinary storage in one React/Vite and Node/Express application.",
      contribution: "Integrated the audio upload-to-output pipeline: transcription, text summarization, visual highlights matched to key points, spoken summaries and persistent storage.",
      outcome: "Delivered a multimodal workflow that turns meeting audio into text, a concise summary, related imagery and audio playback for the hackathon submission.",
    },
    tech: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "AssemblyAI", "HuggingFace Bart CNN", "Pexels API", "Deepgram API", "Cloudinary", "JWT"],
    features: [
      "Audio upload → full text transcription via AssemblyAI",
      "AI summarization using Facebook Bart Large CNN (HuggingFace)",
      "Visual highlights — Pexels images matched to key summary points",
      "Text-to-speech audio output of summary via Deepgram",
      "All generated content stored persistently on Cloudinary",
      "Full multimodal pipeline: speech → text → summary → image → audio",
      "React + Vite frontend with Node.js/Express backend",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/Meeting-Genius", icon: "github" },
      { label: "Demo Video", href: "https://youtu.be/x_GMz0qJ9Zg", icon: "demo" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    award: { prize: "Submission", event: "From Words to Worlds — Multimodal GenAI" },
  },
  {
    id: "7",
    slug: "rust-file-server",
    title: "Rust Simple File Server",
    shortTitle: "Rust File Server",
    category: "hackathon",
    badge: "⚡ Bounty Claimed",
    badgeColor: "orange",
    description:
      "A basic HTTP file server built entirely from scratch in Rust — no web framework. Custom HTTP request/response parser over raw TCP streams. First to complete all objectives.",
    seoDescription: "HTTP file server written from scratch in Rust with a custom request parser over raw TCP and no web framework. First to finish the StackUp Rust bounty.",
    updated: "2026-10-19",
    longDescription:
      "This project was built for the StackUp Rust Bounty Challenge — the first submission to complete all objectives. The server binds a TcpListener to port 7878 and handles each connection with a custom HTTP parser that reads raw bytes, extracts the method and path, locates the file on disk, detects its MIME type via mime_guess, and writes a full HTTP response back over the stream — all without any web framework dependency.",
    caseStudy: {
      challenge: "A small file server should serve files over HTTP without relying on a web framework, making the underlying TCP and HTTP handling explicit.",
      approach: "Build directly on Rust’s TcpListener, raw byte streams, custom request/response handling, MIME detection and filesystem traversal utilities.",
      contribution: "Implemented request parsing, method and path handling, file lookup, MIME-type headers, status responses, directory traversal and URL encoding/decoding.",
      outcome: "Completed the StackUp Rust Bounty Challenge objectives first, without using a web framework.",
    },
    tech: ["Rust", "Cargo", "walkdir", "infer", "url-escape", "mime_guess", "TCP/HTTP", "Systems Programming"],
    features: [
      "Raw TCP listener — no web framework whatsoever",
      "Custom HTTP request parser — method, path, headers from raw bytes",
      "Custom HTTP response builder with correct status codes",
      "MIME type detection via mime_guess for proper Content-Type headers",
      "Recursive directory traversal using walkdir",
      "URL encoding/decoding via url-escape",
      "First submission to complete all StackUp Rust Bounty objectives",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/simple-file-server", icon: "github" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    award: { prize: "Bounty Claimed", event: "StackUp Rust Bounty Challenge" },
  },
  {
    id: "8",
    slug: "floris-restaurant",
    title: "Floris Restaurant & Banquet Website",
    shortTitle: "Floris Restaurant",
    category: "client",
    badge: "🌐 Live Client",
    badgeColor: "orange",
    description:
      "Production website for a premium dining & banquet venue in Patan. Dark fire-branded SPA with animated navbar, menu section, gallery, and booking CTA.",
    seoDescription: "Production website for Floris Restaurant & Banquet in Patan: a React 19 and Vite single-page site with menu, gallery and booking call to action.",
    updated: "2026-10-19",
    longDescription:
      "Floris Restaurant & Banquet is a premium dining and events venue in Patan, Gujarat. The website is a single-page React application built with a fully custom fire brand design system — deep black backgrounds with orange/amber fire gradients, glowing shadows, and smooth scroll navigation. Every section from hero to contact is designed to convert visitors into bookings, with a prominent 'Book a Table' CTA and IntersectionObserver-driven active nav highlighting.",
    caseStudy: {
      challenge: "A restaurant and banquet venue needs a branded online presence that helps visitors explore its offering and find the booking/contact path on mobile or desktop.",
      approach: "Build a React 19 and Vite single-page site with a custom black-and-fire visual identity, Tailwind styling and section-based navigation.",
      contribution: "Created the hero and venue sections, menu and gallery presentation, animated mobile navigation, scroll-aware active links and a clear Book a Table call to action.",
      outcome: "Delivered a live client website for Floris Restaurant & Banquet, with the production site hosted on Vercel.",
    },
    tech: ["React 19", "Vite", "Tailwind CSS", "Lucide React", "Vercel", "JavaScript (JSX)"],
    features: [
      "Custom fire brand design system — orange/amber gradients, glow shadows",
      "IntersectionObserver active section tracking in navbar",
      "Smooth scroll SPA — Home, About, Banquet, Menu, Gallery, Contact",
      "Animated hamburger mobile menu",
      "Gallery section with photo display",
      "Book a Table CTA wired to contact section",
      "Deployed and live on Vercel",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki/floris-restaurant", icon: "github" },
      { label: "Live Website", href: "https://floris-restaurant.vercel.app", icon: "live" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z",
    client: { name: "Floris Restaurant & Banquet", location: "Patan, Gujarat, India" },
  },
  {
    id: "9",
    slug: "ice-saathi",
    title: "Aman Sales — Ice Saathi Platform",
    shortTitle: "Ice Saathi",
    category: "client",
    badge: "🌐 Live · icesaathi.co.in",
    badgeColor: "blue",
    description:
      "End-to-end business management platform for a wholesale ice distributor. Manages customers, subscriptions, billing, deliveries, and serves as the complete backend for the companion Flutter app.",
    seoDescription: "Next.js platform for Aman Sales, a wholesale ice distributor in Gandhidham: customers, subscriptions, billing, deliveries and the API for a Flutter app.",
    updated: "2026-10-19",
    longDescription:
      "Ice Saathi is a full business operating system built for Aman Sales, a wholesale ice distributor in Gandhidham associated with Shreeji Ice Creams. The platform handles the entire business workflow — customer onboarding, subscription management, billing, add-on tracking, delivery assignments, and payment recording. It also exposes a complete REST API consumed by the Aman Sales Delivery Partner Flutter app, including live GPS location tracking and FCM push notifications to delivery partners.",
    caseStudy: {
      challenge: "A wholesale ice distributor needs customer, subscription, billing and delivery operations connected to the mobile workflow used by delivery partners.",
      approach: "Build a Next.js and TypeScript operations platform backed by MongoDB, role-aware authentication and REST API routes, with Firebase Cloud Messaging for notifications.",
      contribution: "Implemented customer and subscription management, payment and add-on records, delivery assignments, admin-side live location visibility, delivery-partner OTP access and the API used by the companion app.",
      outcome: "Delivered the Ice Saathi business platform for Aman Sales and published it at icesaathi.co.in.",
    },
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Firebase FCM", "REST API", "JWT", "Next.js API Routes"],
    features: [
      "Customer management — onboarding, subscriptions, billing",
      "Delivery assignment and tracking dashboard",
      "Live GPS location of delivery partners on admin map",
      "FCM push notifications to delivery partners for new orders",
      "Full REST API backend for the companion Flutter app",
      "Add-on and payment recording system",
      "OTP-based authentication for delivery partners",
      "Live at www.icesaathi.co.in",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki", icon: "github" },
      { label: "Live Platform", href: "https://www.icesaathi.co.in", icon: "live" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    client: { name: "Aman Sales (Shreeji Ice Creams)", location: "Gandhidham, Gujarat, India" },
  },
  {
    id: "10",
    slug: "ice-saathi-delivery-app",
    title: "Aman Sales Delivery Partner App",
    shortTitle: "Delivery Partner App",
    category: "client",
    badge: "📱 Production Flutter",
    badgeColor: "blue",
    description:
      "Flutter mobile app for Aman Sales delivery partners. Features OTP login, live GPS tracking, order management, sticky notes, and FCM push notifications for new order assignments.",
    seoDescription: "Flutter app for Aman Sales delivery partners with OTP login, live GPS tracking, order management and FCM push notifications for new assignments.",
    updated: "2026-10-19",
    longDescription:
      "The companion mobile app for the Ice Saathi platform, built in Flutter for Android. Delivery partners log in via OTP, view their assigned ice delivery orders, mark deliveries complete, look up customer details via a Go-To search, and create sticky notes linked to customers. The app runs a background location service that continuously sends GPS coordinates to the Ice Saathi backend so the admin can track all delivery partners live on a map. Firebase Cloud Messaging handles real-time push notifications for new order assignments.",
    caseStudy: {
      challenge: "Delivery partners need a simple mobile workflow for assigned orders while dispatchers need timely location updates and reliable order notifications.",
      approach: "Build an Android app with Flutter and Dart; use Dio for API calls, Provider for state, background location reporting, SharedPreferences for session persistence and Firebase Cloud Messaging.",
      contribution: "Implemented OTP login, pending and completed order views, customer search, customer-linked notes, profile updates and password-change verification, alongside background GPS reporting and push notifications.",
      outcome: "Delivered the mobile companion to Ice Saathi, connecting field delivery actions and location updates to the business platform.",
    },
    tech: ["Flutter", "Dart", "Firebase FCM", "Provider", "Dio", "Background Location", "SharedPreferences", "Android"],
    features: [
      "OTP-based login with pending approval state for new partners",
      "Pending and delivered orders management",
      "Background GPS location service — live tracking on admin dashboard",
      "FCM push notifications for new order assignments",
      "Go-To feature — search any registered customer by name",
      "Sticky notes linked to customers with product row widgets",
      "Full profile management with OTP-secured password change",
      "Session persistence via SharedPreferences",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Nitrajsinh-Solanki", icon: "github" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    client: { name: "Aman Sales", location: "Gandhidham, Gujarat, India" },
  },
  {
    id: "11",
    slug: "hourbit",
    title: "HourBit — All-in-One Productivity Suite",
    shortTitle: "HourBit",
    category: "personal",
    badge: "🌐 Live · Personal Project",
    badgeColor: "teal",
    description:
      "Free all-in-one productivity web app for employees — Work Hours Tracker with live leave prediction, Brain Quiz, Personal Diary, Typing Speed Test, and Expense Tracker. 5 tools in one secure app.",
    seoDescription: "HourBit is a free Next.js productivity suite: work-hours tracker with leave prediction, brain quiz, diary, typing test and expense tracker.",
    updated: "2026-10-19",
    longDescription:
      "HourBit is a comprehensive productivity suite designed for employees on flexible schedules. The Work Tracker lets users clock in/out, deduct breaks, and get real-time leave time predictions. Brain Quiz features categories, subcategories, XP rewards, and a leaderboard. The Personal Diary supports rich journaling with search, export, and reminder toasts. The Typing Test measures WPM and accuracy over time. The Expense Tracker manages wallet balance, categorized transactions, and spending analytics — all behind a secure OTP-based auth system with full admin panel.",
    caseStudy: {
      challenge: "Employees often rely on separate tools for time tracking, personal notes, learning breaks, typing practice and expense awareness.",
      approach: "Bring five workflows into one Next.js 16 and TypeScript app using MongoDB/Mongoose, JWT/OTP authentication and Recharts for analytics.",
      contribution: "Built work-hour and break tracking with leave-time prediction, a quiz with XP and leaderboard, a searchable diary with exports, typing-speed history, expense tracking and an admin panel.",
      outcome: "Delivered a single productivity suite with a mobile-optimised, PWA-ready experience and a live app deployment.",
    },
    tech: ["Next.js 16", "TypeScript", "MongoDB", "Mongoose", "JWT", "Nodemailer", "Tailwind CSS", "Recharts", "jsPDF", "bcryptjs", "react-hot-toast"],
    features: [
      "Work Hours Tracker — clock-in, breaks, smart leave time prediction",
      "Brain Quiz — categories, levels, XP rewards system, global leaderboard",
      "Personal Diary — rich journaling, search, date range filter, CSV/PDF export",
      "Typing Speed Test — WPM & accuracy tracking with historical analysis",
      "Expense Tracker — wallet, categorized transactions, spending analytics via Recharts",
      "Full Admin Panel — user management, quiz content, XP rewards, roles",
      "OTP email verification + JWT session authentication",
      "PWA-ready with manifest and mobile-optimized layout",
    ],
    links: [
      { label: "Live App", href: "https://hourbit-web.vercel.app/dashboard/today", icon: "live" },
    ],
    gradientFrom: "#F0EEE8",
    gradientTo: "#E8E6E0",
    accentColor: "#4F46E5",
    iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const countBy = (category: ProjectCategory) =>
  PROJECTS.filter((project) => project.category === category).length;
const liveCount = PROJECTS.filter((project) =>
  project.links.some((link) => link.icon === "live")
).length;

if (
  PROJECTS.length !== STATS.total ||
  countBy("hackathon") !== STATS.hackathon ||
  countBy("client") !== STATS.client ||
  countBy("personal") !== STATS.personal ||
  liveCount !== STATS.live
) {
  throw new Error("app/projects/stats.ts is out of sync with PROJECTS in data.ts");
}

export { STATS };
