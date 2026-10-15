export const profile = {
  name: "Nitrajsinh Solanki",
  givenName: "Nitrajsinh",
  familyName: "Solanki",
  email: "nrsolanki2005@gmail.com",
  headline: "Full-Stack Developer",
  tagline:
    "Full-stack developer in Gujarat, India. Next.js, React, ASP.NET Core, Angular, Flutter.",
  role: {
    title: "Full Stack Engineer Intern",
    org: "VeloxCore Private Limited",
    since: "January 2026",
    stack: ".NET (ASP.NET Core) and Angular",
  },
  education: [
    {
      level: "B.E. Computer Engineering",
      school: "Government Engineering College (GEC), Patan",
      board: "Gujarat Technological University (GTU)",
      period: "2022 – May 2026",
      score: "CGPA 7.43",
    },
    {
      level: "HSC (Science)",
      school: "Sheth C.M. Higher Secondary School, Gandhinagar",
      board: "GSEB",
      period: "March 2022",
      score: "77.53%",
    },
    {
      level: "SSC",
      school: "Smt. Purbai Kanji Rajgor High School, Bhadreshwar",
      board: "GSEB",
      period: "March 2020",
      score: "86.67%",
    },
  ],
  awards: [
    { text: "3rd Place ($90), StackUp Hackathon: Library & Book Store Inventory System" },
    { text: "4th Place ($70), StackUp May 2025 Challenge: BioMap" },
    { text: "$60 Bounty, StackUp Bounty Challenge: Aptos NFT Marketplace" },
    { text: "$20 Merit Prize, StackUp Hackathon: Moodify" },
    { text: "$10 Merit Prize, StackUp Hackathon: Math Genius AI" },
    { text: "First submission to complete all objectives, StackUp Rust Bounty Challenge" },
  ],
  knowsAbout: [
    "Next.js", "React", "TypeScript", "Node.js", "ASP.NET Core", "Angular",
    "Flutter", "MongoDB", "REST API design", "Aptos blockchain", "Rust",
    "Google Gemini AI",
  ],
  skills: {
    Languages: ["JavaScript (ES2022+)", "TypeScript", "C#", "Dart", "Rust", "Move (Aptos)", "Java", "C"],
    Frontend: ["React.js", "Next.js", "Angular", "Tailwind CSS", "Vite", "Canvas API", "Leaflet.js", "Recharts"],
    Backend: ["Node.js", "Express.js", "Next.js API Routes", "ASP.NET Core (.NET)", "REST API Design"],
    Databases: ["PostgreSQL", "Prisma ORM", "MongoDB", "Mongoose ODM", "MySQL", "SQL Server"],
    Mobile: ["Flutter (Android)", "Firebase FCM", "Background Location", "Provider", "Dio"],
    "Auth & Security": ["JWT", "OTP Email Auth", "NextAuth", "Session Management", "Cookies", "RBAC"],
    "AI & Blockchain": ["Google Gemini AI", "AssemblyAI", "HuggingFace", "Deepgram", "Aptos Blockchain", "Move Language"],
    "Tools & Infrastructure": ["Vercel", "Git & GitHub", "Docker (basic)", "Postman", "VS Code", "Linux", "Cloudinary", "Firebase"],
  } as Record<string, string[]>,
  experience: [
    {
      title: "Full Stack Engineer Intern",
      org: "VeloxCore Private Limited",
      place: "Gujarat, India",
      period: "Jan 2026 – Present",
      bullets: [
        "Build and maintain enterprise-grade web applications with ASP.NET Core and Angular, owning delivery from schema design and REST API architecture to component-driven UI.",
        "Design and implement RESTful APIs for real production workloads; write reusable Angular components, services and modules.",
        "Collaborate on code reviews, architecture decisions and best practices, shipping C# and SQL Server features that stay maintainable.",
      ],
    },
    {
      title: "Freelance Full-Stack Developer",
      org: "Independent Client Work",
      place: "Gujarat, India",
      period: "2024 – 2025",
      bullets: [
        "Ice Saathi (icesaathi.co.in): Next.js and TypeScript business platform with a companion Flutter delivery-partner app, for Aman Sales, a wholesale ice distributor in Gandhidham.",
        "Floris Restaurant & Banquet: production React 19 and Vite website for a dining venue in Patan, optimised for speed and SEO.",
      ],
    },
    {
      title: "Hackathon & Bounty Participant",
      org: "StackUp (Global Platform)",
      place: "Remote",
      period: "2024 – 2025",
      bullets: [
        "Competed in 5 global hackathon and bounty challenges across blockchain, AI and full-stack categories; $250+ in prizes.",
        "Worked with Move on Aptos, Rust systems programming, Google Gemini AI and multimodal GenAI under tight deadlines.",
      ],
    },
  ],
} as const;
