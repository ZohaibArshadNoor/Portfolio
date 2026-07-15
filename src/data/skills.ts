import type { SkillCategory } from "@/types";

/**
 * =============================================================================
 * @EDIT SKILLS
 * Search this phrase to add/edit skill categories and individual skills.
 * =============================================================================
 */
export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    color: "#00E5FF",
    skills: ["Python", "C#", "JavaScript", "TypeScript"],
  },
  {
    name: "AI / Machine Learning",
    color: "#8B5CF6",
    skills: [
      "Machine Learning",
      "Scikit-learn",
      "TF-IDF",
      "Logistic Regression",
      "LLM APIs",
      "Prompt Engineering",
      "Vector Databases",
    ],
  },
  {
    name: "Backend",
    color: "#3B82F6",
    skills: ["FastAPI", "ASP.NET MVC", "REST APIs"],
  },
  {
    name: "Frontend",
    color: "#22D3EE",
    skills: ["React", "HTML", "CSS", "SCSS"],
  },
  {
    name: "Data & Databases",
    color: "#A78BFA",
    skills: ["PostgreSQL", "SQL Server", "Firebase"],
  },
  {
    name: "Tools & Platforms",
    color: "#60A5FA",
    skills: ["Git", "GitHub", "GitHub Actions", "Vercel"],
  },
];

export const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((skill) => ({
    name: skill,
    category: c.name,
    color: c.color,
  }))
);
