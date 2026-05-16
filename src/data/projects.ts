export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tags: string[];
  image: string;
  color: string;
  featured?: boolean;
  githubUrl: string;
  liveUrl: string;
}

export const PROJECTS: Project[] = [
  {
    id: 2,
    title: "Kimono Rental System",
    subtitle: "Serverless Booking Platform",
    description:
      "A complete serverless booking system built with React and Google Apps Script backend.",
    details: [
      "Zero-cost serverless architecture",
      "Automated Google Calendar sync",
      "Custom React frontend with Framer Motion animations",
    ],
    tags: ["React", "Google Apps Script", "Tailwind", "Framer"],
    image: "/kimono-website.png",
    color: "from-accent-gold/20 to-transparent",
    githubUrl: "https://github.com/quytrang601/kimono-web",
    liveUrl: "https://kimono-demo.vercel.app/",
  },
  {
    id: 1,
    title: "Tripify Webapp",
    subtitle: "AI Travel Engine",
    description:
      "Smart travel itinerary generator powered by Gemini 1.5 Flash.",
    details: [
      "Integrated Gemini 1.5 Flash for dynamic routing",
      "Full-stack Next.js architecture",
      "Interactive Mapbox integration",
    ],
    tags: ["Next.js", "TypeScript", "Gemini API", "Mapbox"],
    image: "/tripify-website.png",
    color: "from-cyan-900/20 to-transparent",
    githubUrl: "https://github.com/KiwisCodes/Tripify-Webapp",
    liveUrl: "https://trippy-landing-page.vercel.app/",
  },
  {
    id: 3,
    title: "Traffic Simulator",
    subtitle: "Team Lead • Frankfurt 🇩🇪",
    description:
      "Led a 5-person team to build a high-performance traffic simulation engine with Java 17 and TraCI.",
    details: [
      "Led 5-person team yielding 30% faster delivery",
      "Java 17 engine achieving 0.1s sync via TraCI",
      "Implemented Producer-Consumer pattern to eliminate UI latency",
    ],
    tags: ["Java", "Spring MVC", "TraCI", "Docker"],
    image: "/traffic-simulator.png",
    color: "from-blue-900/20 to-transparent",
    featured: true,
    githubUrl: "https://github.com/KiwisCodes/Java_OOP_Traffic_Simulator",
    liveUrl: "https://github.com/KiwisCodes/Java_OOP_Traffic_Simulator",
  },
  // {
  //   id: 4,
  //   title: 'FinTech Dashboard',
  //   subtitle: 'Real-time Analytics',
  //   description: 'A comprehensive dashboard for real-time financial tracking and visualization.',
  //   details: [
  //     'WebSocket integration for live data',
  //     'D3.js & Recharts for complex data viz',
  //     'Responsive modular architecture'
  //   ],
  //   tags: ['React', 'D3.js', 'Tailwind', 'WebSockets'],
  //   image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  //   color: 'from-emerald-900/20 to-transparent'
  // },
  // {
  //   id: 5,
  //   title: 'Smart Home Hub',
  //   subtitle: 'IoT Control Interface',
  //   description: 'Centralized control interface for IoT devices across the smart home network.',
  //   details: [
  //     'MQTT protocol integration',
  //     'State management with Redux',
  //     'Accessible UI design'
  //   ],
  //   tags: ['React Native', 'Redux', 'MQTT', 'IoT'],
  //   image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
  //   color: 'from-purple-900/20 to-transparent'
  // },
  // {
  //   id: 6,
  //   title: 'HealthSync',
  //   subtitle: 'Fitness Data Aggregator',
  //   description: 'App syncing metrics from wearables to provide a holistic health overview.',
  //   details: [
  //     'OAuth integration with Fitbit and Garmin',
  //     'Secure data storage pipeline',
  //     'Machine learning for trend prediction'
  //   ],
  //   tags: ['Python', 'FastAPI', 'PostgreSQL', 'OAuth'],
  //   image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop',
  //   color: 'from-rose-900/20 to-transparent'
  // },
  // {
  //   id: 7,
  //   title: 'AI Code Reviewer',
  //   subtitle: 'Developer Tooling',
  //   description: 'Automated code review bot providing real-time feedback on PRs.',
  //   details: [
  //     'GitHub App integration via Webhooks',
  //     'Abstract Syntax Tree (AST) parsing',
  //     'LLM-powered suggestion engine'
  //   ],
  //   tags: ['Node.js', 'GitHub API', 'OpenAI', 'AST'],
  //   image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
  //   color: 'from-orange-900/20 to-transparent'
  // },
  // {
  //   id: 8,
  //   title: 'EcoMarket',
  //   subtitle: 'Sustainable E-Commerce',
  //   description: 'Marketplace dedicated to verified sustainable and eco-friendly products.',
  //   details: [
  //     'Stripe integration for payments',
  //     'Green certification verification workflow',
  //     'Headless CMS for product management'
  //   ],
  //   tags: ['Next.js', 'Stripe', 'Sanity', 'Vercel'],
  //   image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=800&auto=format&fit=crop',
  //   color: 'from-lime-900/20 to-transparent'
  // }
];
