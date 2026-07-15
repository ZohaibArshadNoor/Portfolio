import type { Project } from "@/types";

/**
 * =============================================================================
 * @EDIT PROJECTS
 * Search this phrase in the codebase to jump here and add/edit project cards.
 * Also update case-study pages automatically via slug + generateStaticParams.
 * =============================================================================
 */
export const projects: Project[] = [
  // @EDIT PROJECT_CAREERLENS
  {
    slug: "careerlens",
    title: "CareerLens",
    subtitle: "AI-Powered Career Preparation Platform",
    category: ["AI", "Machine Learning", "Full Stack"],
    shortDescription:
      "AI resume screening, adaptive mock interviews, and intelligent job recommendations in one platform.",
    description:
      "An AI-powered career-preparation platform that combines resume screening and role prediction, an adaptive AI mock-interview agent, and a multi-source job-recommendation engine.",
    problem:
      "Students and job seekers often struggle to identify suitable career paths, prepare for interviews, and find relevant job opportunities efficiently.",
    solution:
      "CareerLens unifies Machine Learning models, LLM-powered interview generation, and intelligent job recommendation into one platform. Owned the ML service: a TF-IDF + Logistic Regression resume classifier, a Groq-LLM interview agent, and a multi-source job-scraping pipeline targeting Rozee.pk, LinkedIn, and Indeed.",
    architecture:
      "FastAPI ML microservice for classification and interview generation, React frontend for the user experience, PostgreSQL for persistence, and a scraping pipeline (BeautifulSoup + Gemini) for live job data aggregation.",
    challenges: [
      "Training a reliable multi-class resume classifier across dozens of job categories",
      "Keeping interview prompts adaptive to each uploaded resume",
      "Aggregating job listings from heterogeneous sources with inconsistent schemas",
    ],
    results: [
      "Resume classifier trained on 13,000+ resumes across 42 categories",
      "Adaptive AI interview generation based on uploaded resumes",
      "Multi-source job recommendations from Rozee.pk, LinkedIn, and Indeed",
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "TF-IDF",
      "Logistic Regression",
      "Scikit-learn",
      "Groq API",
      "Gemini API",
      "BeautifulSoup",
      "JWT",
    ],
    github: "https://github.com/ZohaibArshadNoor",
    liveDemo: null,
    featured: true,
    image: "/images/projects/careerlens.svg",
  },
  // @EDIT PROJECT_PIPELINEAI
  {
    slug: "pipelineai",
    title: "PipelineAI",
    subtitle: "ICMF — Intelligent Context Management Framework",
    category: ["AI", "Machine Learning", "Backend"],
    shortDescription:
      "Middleware that fights Context Rotting in long LLM conversations with a four-layer memory architecture.",
    description:
      "An AI-powered context-management framework built as middleware for LLM-based conversational systems, solving Context Rotting — the degradation of LLM performance over long conversations.",
    problem:
      "Modern LLMs lose important information during long conversations because of context window limitations, causing degraded response quality over time.",
    solution:
      "PipelineAI (ICMF) compresses, ranks, retrieves, and injects relevant memories using a four-layer memory architecture, vector search, prompt optimization, human-in-the-loop review, and explainable AI across an 11-step LLM-integrated processing pipeline.",
    architecture:
      "Four-layer memory system with vector retrieval, context compression, prompt optimization, and an 11-step processing pipeline designed for multi-provider LLM integration.",
    challenges: [
      "Preserving critical context without exceeding token budgets",
      "Ranking memories by relevance across long conversation histories",
      "Making retrieval decisions explainable for human review",
    ],
    results: [
      "Significantly reduces unnecessary token usage",
      "Improves long-conversation memory retrieval",
      "Designed for integration with multiple LLM providers",
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "Vector Databases",
      "LLM APIs",
      "Prompt Engineering",
      "RAG",
      "Context Compression",
      "Explainable AI",
    ],
    github: null,
    liveDemo: null,
    featured: true,
    status: "In Progress — Final Year Project",
    image: "/images/projects/pipelineai.svg",
  },
  // @EDIT PROJECT_CIES
  {
    slug: "cies",
    title: "Customer Interaction Evaluation System",
    subtitle: "CIES — Monitoring & Evaluation Platform",
    category: ["Full Stack", "Backend"],
    shortDescription:
      "Desktop monitoring client plus ASP.NET MVC dashboard with an ML scoring layer for service quality.",
    description:
      "A full-stack employee-monitoring and evaluation system: a C# Windows Forms desktop client for interaction/typing analytics feeding into SQL Server, paired with an ASP.NET MVC web dashboard and an ML scoring layer for objective service-quality insight.",
    problem:
      "Organizations lack automated methods for evaluating employee communication behavior and service quality during work sessions.",
    solution:
      "Built a Windows Forms desktop client that captures interaction analytics, stores them in SQL Server, and surfaces insights through an ASP.NET MVC admin dashboard with an ML scoring layer for managers.",
    architecture:
      "Windows Forms client → Windows Services / SQL Server persistence → ASP.NET MVC dashboard with ML-based evaluation scoring.",
    challenges: [
      "Capturing interaction metrics without disrupting employee workflows",
      "Centralizing analytics for managerial review",
      "Translating raw activity data into meaningful evaluation scores",
    ],
    results: [
      "Tracks employee activity and interaction patterns",
      "Generates objective evaluation scores",
      "Provides a centralized management dashboard",
    ],
    tech: [
      "C#",
      "Windows Forms",
      "ASP.NET MVC",
      "SQL Server",
      "Windows Services",
      "ML Scoring",
    ],
    github: "https://github.com/ZohaibArshadNoor",
    liveDemo: null,
    image: "/images/projects/cies.svg",
  },
  // @EDIT PROJECT_MARKETING_AI — duplicate this object to add a NEW project
  {
    slug: "ai-digital-marketing-assistant",
    title: "AI Digital Marketing Assistant",
    subtitle: "Research & Design Phase",
    category: ["AI", "Machine Learning"],
    shortDescription:
      "Research platform for automating content generation, campaign analysis, and marketing decisions.",
    description:
      "A research-based AI platform that helps digital marketers automate content generation, campaign analysis, and marketing decision-making.",
    problem:
      "Digital marketers spend significant time on repetitive content creation and struggle to turn campaign data into actionable decisions quickly.",
    solution:
      "An AI assistant that combines LLM content generation, campaign analytics, and decision-support workflows into a unified research platform.",
    architecture:
      "Python/FastAPI backend with LLM integrations, analytics pipelines, and a React frontend for campaign workflows.",
    challenges: [
      "Designing reliable content-generation prompts for brand consistency",
      "Structuring campaign analytics for actionable recommendations",
    ],
    results: [
      "Currently in research and design phase",
      "Architecture defined for LLM + analytics integration",
    ],
    tech: ["Python", "LLMs", "Machine Learning", "Analytics", "FastAPI", "React"],
    github: null,
    liveDemo: null,
    status: "Research & Design Phase",
    image: "/images/projects/marketing-ai.svg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const PROJECT_FILTERS = [
  "All",
  "AI",
  "Full Stack",
  "Backend",
  "Machine Learning",
] as const;
