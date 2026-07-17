export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string; // e.g. "Internship", "Part-time", "Full-time", "Independent"
  description: string[];
  tags: string[];
  /** Swap these src strings with your own image URLs or local paths */
  photos: { src: string; alt: string }[];
  /** Dynamic platform download/access links (optional) */
  downloadLinks?: {
    ios: string;
    android: string;
    macos: string;
    windows: string;
    web: string;
  };
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 1,
    role: "Creator & Lead Engineer",
    company: "Noteee (Multi-Platform Markdown App)",
    location: "Independent Project",
    period: "2025 – 2026 (1 Year)",
    type: "Independent",
    description: [
      "Architected and developed 'Noteee', a rich markdown note-taking app optimized across phones, tablets, laptops, and web browsers.",
      "Engineered an offline-first workspace using SQLite, local filesystem APIs, and sync engines to ensure real-time text backup.",
      "Designed a fluid, high-performance UI using React Native, React, and TypeScript with buttery reanimated transitions."
    ],
    tags: ["React Native", "React", "TypeScript", "SQLite", "Tailwind CSS", "Cross-Platform"],
    photos: [
      { src: "", alt: "Noteee Layout" },
      { src: "", alt: "Noteee Editor" },
      { src: "", alt: "Noteee File Manager" },
    ],
    downloadLinks: {
      ios: "https://apps.apple.com/app/noteee",
      android: "https://play.google.com/store/apps/details?id=app.noteee",
      macos: "https://noteee.app/download/macos",
      windows: "https://noteee.app/download/windows",
      web: "https://noteee.app",
    }
  },
  {
    id: 2,
    role: "Software Developer",
    company: "Netcompany",
    location: "Ho Chi Minh City, Vietnam",
    period: "2026 – Present",
    type: "Full-time",
    description: [
      "Designed and shipped business-critical enterprise applications using C# and .NET Core, ensuring high-scale system stability.",
      "Integrated microservices architecture, implementing clean database interfaces with Entity Framework Core and SQL Server.",
      "Leveraged Netcompany's industry-leading software delivery standards to optimize production CI/CD automation pipelines.",
      "Refined database structures and stored procedures, achieving a significant performance speedup for core reporting features."
    ],
    tags: ["C#", ".NET Core", "Entity Framework", "SQL Server", "Microservices", "CI/CD"],
    photos: [
      { src: "", alt: "Netcompany Project" },
      { src: "", alt: "System Architecture" },
      { src: "", alt: "Agile Standup" },
    ],
  },
];
