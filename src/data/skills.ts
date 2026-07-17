export interface SkillGroup {
  id: number;
  category: string;
  items: string[];
  color: string;
}

export interface Proficiency {
  name: string;
  level: number;
}

// Detailed knowledge map: skill name → list of sub-skills / frameworks / tools used with it
export const SKILL_DETAILS: Record<string, string[]> = {
  // ─── Languages ───────────────────────────────────────────────────────────────
  "JavaScript": [
    "ES6+ syntax", "Async/Await & Promises", "Event Loop understanding",
    "DOM manipulation", "Closures & Prototypes", "Modules (ESM / CJS)",
    "Fetch API", "Web Workers", "Node.js runtime",
    "npm / pnpm package management",
  ],
  "TypeScript": [
    "Strict mode", "Generics", "Utility types (Partial, Pick, Record…)",
    "Type guards & narrowing", "Declaration files (.d.ts)",
    "Discriminated unions", "Interface vs Type alias",
    "Integration with React & Next.js",
  ],
  "Java": [
    "Java 17 / 21 features", "OOP principles", "Collections framework",
    "Streams & Lambdas", "Multithreading & Concurrency",
    "Spring Boot ecosystem", "Spring MVC & REST APIs",
    "JPA / Hibernate", "Maven & Gradle", "JUnit 5",
    "Design Patterns (Builder, Factory, Singleton, Observer)",
    "Producer-Consumer pattern", "TraCI integration",
  ],
  "Python": [
    "Data manipulation (pandas, NumPy)", "FastAPI / Flask",
    "Async programming", "Web scraping (BeautifulSoup, Playwright)",
    "Machine Learning basics (scikit-learn)", "PostgreSQL with SQLAlchemy",
    "OAuth integration", "Pytest",
  ],
  "C#": [
    ".NET 8", "ASP.NET Core", "LINQ", "Entity Framework Core",
    "Dependency Injection", "async/await in .NET",
    "REST API design", "Unit testing with xUnit",
  ],
  "SQL": [
    "PostgreSQL", "MySQL", "Complex joins & subqueries",
    "Indexing & query optimization", "Stored procedures",
    "Transactions & ACID", "ORMs (Hibernate, EF Core)",
  ],
  "Git": [
    "Branching strategies (Git Flow, trunk-based)",
    "Rebase vs Merge", "Conflict resolution",
    "Cherry-pick", "Stash", "Interactive rebase",
    "Tagging & versioning", "Hooks",
  ],

  // ─── Frameworks & Tools ───────────────────────────────────────────────────────
  "React": [
    "Hooks (useState, useEffect, useRef, useMemo, useCallback)",
    "Context API", "Custom hooks", "React Router",
    "Framer Motion animations", "Code splitting & lazy loading",
    "Performance optimisation", "Zustand / Redux state management",
  ],
  "Next.js": [
    "App Router & Pages Router", "Server Components",
    "API routes", "SSR / SSG / ISR", "Middleware",
    "Image optimisation", "Vercel deployment",
  ],
  "Spring Boot": [
    "REST API design", "Spring Security & JWT",
    "Spring Data JPA", "Actuator & monitoring",
    "Bean lifecycle & DI", "Validation & error handling",
    "Microservices basics", "Docker containerisation",
  ],
  ".NET": [
    "ASP.NET Core Web API", "Minimal APIs",
    "Entity Framework Core", "LINQ",
    "Dependency Injection container",
    "Background services (IHostedService)",
    "SignalR for real-time", "xUnit & NUnit testing",
  ],
  "Docker": [
    "Dockerfile authoring", "Multi-stage builds",
    "Docker Compose", "Networking & volumes",
    "Container orchestration basics",
    "Image optimisation strategies",
  ],
  "GitHub": [
    "Pull requests & code review", "GitHub Actions CI/CD",
    "Branch protection rules", "GitHub Projects",
    "Issues & milestones", "GitHub Pages",
    "Secrets management", "Dependabot",
  ],
  "Tailwind CSS": [
    "Utility-first design system", "Responsive breakpoints",
    "Dark mode variants", "Custom theme config",
    "JIT mode", "Component extraction",
    "Animation utilities", "Tailwind v4",
  ],
  "FastAPI": [
    "Async endpoints with async/await", "Pydantic models & validation",
    "Dependency injection system", "OpenAPI / Swagger auto-docs",
    "OAuth2 & JWT authentication", "SQLAlchemy integration",
    "Background tasks", "WebSocket support",
    "Pytest-based testing", "Docker deployment",
  ],
  "C++": [
    "STL (vector, map, set, queue)", "Pointers & memory management",
    "OOP in C++", "Templates", "Algorithm & complexity analysis",
    "LeetCode problem solving", "Competitive programming patterns",
    "Graph traversal (BFS/DFS)", "Dynamic programming",
  ],

  // ─── CI/CD ─────────────────────────────────────────────────────────────────
  "GitHub Actions": [
    "Workflow YAML authoring", "Triggered on push / PR / schedule",
    "Matrix builds", "Reusable workflows",
    "Secrets & environment variables", "Self-hosted runners",
    "Deploy to AWS / Vercel / Docker Hub", "Status badges",
  ],
  "Docker Hub": [
    "Public & private image registries", "Image tagging & versioning",
    "Automated builds from GitHub", "Multi-arch images",
  ],
  "SonarQube": [
    "Static code analysis", "Code smell detection",
    "Security vulnerability scanning", "Coverage gate enforcement",
    "Integration with GitHub Actions",
  ],

  // ─── Cloud ─────────────────────────────────────────────────────────────────
  "EC2": [
    "Instance types & sizing", "Auto Scaling Groups",
    "Key pairs & SSH access", "Security Groups & NACLs",
    "AMIs & snapshots", "Elastic IPs", "User data scripts",
  ],
  "S3": [
    "Bucket policies & ACLs", "Versioning & lifecycle rules",
    "Static website hosting", "Pre-signed URLs",
    "S3 Event notifications", "Cross-region replication",
  ],
  "RDS": [
    "PostgreSQL & MySQL on RDS", "Multi-AZ deployments",
    "Read replicas", "Automated backups & snapshots",
    "Parameter groups", "VPC integration",
  ],
  "Lambda": [
    "Serverless function authoring (Java / Python / Node.js)",
    "Event triggers (S3, SQS, API Gateway)", "Lambda layers",
    "Cold start optimisation", "Environment variables",
    "Concurrency & throttling limits",
  ],
  "ECS": [
    "Task definitions & services", "Fargate (serverless containers)",
    "EC2 launch type", "Service auto scaling",
    "ALB integration", "ECR image pull",
  ],
  "ECR": [
    "Private Docker image registry", "Image scanning for vulnerabilities",
    "Lifecycle policies", "IAM-based access control",
    "Integration with ECS & GitHub Actions",
  ],
  "CloudWatch": [
    "Metrics & dashboards", "Log groups & log insights",
    "Alarms & notifications (SNS)", "Container Insights",
    "Custom metrics via SDK",
  ],
  "IAM": [
    "Users, groups & roles", "Policies (managed & inline)",
    "Least-privilege principle", "Instance profiles",
    "Cross-account roles", "MFA enforcement",
  ],
  "VPC": [
    "Subnets (public & private)", "Internet Gateway & NAT Gateway",
    "Route tables", "Security Groups",
    "VPC Peering", "Endpoints",
  ],
  "API Gateway": [
    "REST & HTTP APIs", "Lambda proxy integration",
    "Authorizers (JWT / Cognito)", "Rate limiting & throttling",
    "Stage variables", "CORS configuration",
  ],
  "CloudFront": [
    "CDN distribution setup", "Custom origins (S3 / ALB)",
    "Cache behaviours & TTL", "HTTPS & SSL certificates (ACM)",
    "Geo-restriction", "WAF integration",
  ],
  "Route 53": [
    "DNS record management (A, CNAME, Alias)",
    "Routing policies (weighted, latency, failover)",
    "Health checks", "Domain registration",
  ],
  "SQS": [
    "Standard & FIFO queues", "Dead-letter queues",
    "Visibility timeout", "Long polling",
    "Lambda trigger integration", "Message batch processing",
  ],
  "SNS": [
    "Topics & subscriptions", "Fan-out pattern",
    "Email / SMS / Lambda / SQS targets",
    "Message filtering", "FIFO topics",
  ],
  "Secrets Manager": [
    "Secure storage of API keys & DB credentials",
    "Automatic rotation", "IAM-based access",
    "Integration with ECS, Lambda, RDS",
  ],

  // ─── AI Tools ─────────────────────────────────────────────────────────────────
  "Gemini 3.5 Flash": [
    "Current production model (May 2026)", "1M token context window",
    "Frontier-level intelligence at low cost", "Complex coding tasks",
    "Multi-step agentic workflows", "Sub-agent deployment",
    "Function calling & tool use", "Structured JSON output",
    "Fast inference for production",
  ],
  "Gemini 3.5 Pro": [
    "Flagship reasoning model (2026)", "2M token context window",
    "Deep Think reasoning layer", "Advanced code generation",
    "Long-document analysis", "Multimodal inputs",
    "Complex multi-step reasoning",
  ],
  "Gemini Live": [
    "Real-time voice & video conversation", "Low-latency streaming responses",
    "Multimodal live interactions", "Interrupt & resume mid-conversation",
    "Integration with Google ecosystem", "Ambient & hands-free usage",
  ],
  "Antigravity": [
    "Agentic coding sessions", "Multi-file refactoring",
    "Planning & execution workflows", "Context-aware code edits",
    "Autonomous task completion",
  ],
  "Antigravity IDE": [
    "In-editor AI pair programming", "Real-time code suggestions",
    "Diff-based file edits", "Project-aware completions",
    "Skill & knowledge item system",
  ],
  "Antigravity CLI": [
    "Terminal-based agentic tasks", "Shell command execution",
    "Automated code transformations", "Script generation",
    "CI/CD pipeline assistance",
  ],
};

export const SKILLS: SkillGroup[] = [
  {
    id: 1,
    category: "Languages",
    items: ["C#", "Java", "C++", "Python", "JavaScript", "TypeScript", "SQL"],
    color: "text-accent-gold",
  },
  {
    id: 2,
    category: "Frameworks & Tools",
    items: ["Spring Boot", ".NET", "Next.js", "React", "FastAPI", "Docker", "Git", "GitHub", "Tailwind CSS"],
    color: "text-accent-blue",
  },
  {
    id: 3,
    category: "AI Tools",
    items: ["Gemini 3.5 Flash", "Gemini 3.5 Pro", "Gemini Live", "Antigravity", "Antigravity IDE", "Antigravity CLI"],
    color: "text-green-500",
  },
  {
    id: 4,
    category: "CI/CD",
    items: ["GitHub Actions", "Docker", "Docker Hub", "SonarQube"],
    color: "text-orange-400",
  },
  {
    id: 5,
    category: "Cloud — AWS",
    items: ["EC2", "S3", "RDS", "Lambda", "ECS", "ECR", "CloudWatch", "IAM", "VPC", "API Gateway", "CloudFront", "Route 53", "SQS", "SNS", "Secrets Manager"],
    color: "text-yellow-500",
  },
];

export const PROFICIENCIES: Proficiency[] = [
  { name: "C#",         level: 85 },
  { name: "Java",       level: 80 },
  { name: "C++",        level: 75 },
  { name: "Python",     level: 70 },
  { name: "JavaScript", level: 65 },
  { name: "TypeScript", level: 60 },
];
