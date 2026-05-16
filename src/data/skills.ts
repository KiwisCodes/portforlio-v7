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

export const SKILLS: SkillGroup[] = [
  {
    id: 1,
    category: "Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C#", "SQL"],
    color: "text-accent-gold",
  },
  {
    id: 2,
    category: "Frameworks & Tools",
    items: ["Spring Boot", "React", "Next.js", "Docker", "Git", "CSS/Tailwind"],
    color: "text-accent-blue",
  },
  {
    id: 3,
    category: "AI Tools",
    items: ["Gemini API", "OpenAI", "LangChain"],
    color: "text-green-500",
  },
];

export const PROFICIENCIES: Proficiency[] = [
  { name: "Java", level: 90 },
  { name: "JavaScript / TS", level: 85 },
  { name: "C++ (for Leetcode)", level: 80 },
  { name: "React", level: 70 },
  { name: "Python", level: 60 },
];
