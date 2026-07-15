import type {
  Achievement,
  Service,
  Testimonial,
  TimelineItem,
} from "@/types";

/**
 * =============================================================================
 * @EDIT EXPERIENCE
 * Search this phrase to edit education / work timeline items.
 * =============================================================================
 */
export const timeline: TimelineItem[] = [
  // @EDIT TIMELINE_EDUCATION
  {
    id: "edu-bahria",
    title: "BS Software Engineering",
    organization: "Bahria University, Karachi Campus",
    period: "Final Year · 7th Semester",
    description: [
      "Focus areas: Artificial Intelligence, Machine Learning, Backend Development, Cloud Computing, and Database Systems.",
      "Actively seeking Software Engineering, AI/ML, and Backend internship opportunities.",
    ],
    type: "education",
  },
  // @EDIT TIMELINE_FYP
  {
    id: "fyp-pipelineai",
    title: "Final Year Project — PipelineAI / ICMF",
    organization: "Bahria University",
    period: "In Progress",
    description: [
      "Building an Intelligent Context Management Framework to solve Context Rotting in long LLM conversations.",
      "Four-layer memory architecture, vector search, prompt optimization, and an 11-step processing pipeline.",
    ],
    type: "project",
  },
  // @EDIT TIMELINE_AI_STUDENT
  {
    id: "exp-ai-student",
    title: "AI & Software Engineering Student",
    organization: "Self-Directed Projects",
    period: "2022 – Present",
    description: [
      "Developed multiple AI-powered applications and scalable REST APIs with FastAPI.",
      "Built ML-based resume classification and integrated multiple Large Language Model APIs.",
      "Designed modern full-stack web applications end to end.",
    ],
    type: "experience",
  },
  // @EDIT TIMELINE_BACKEND — duplicate a timeline object above to add a NEW role
  {
    id: "exp-backend",
    title: "Backend Developer",
    organization: "Freelance & Academic Projects",
    period: "2023 – Present",
    description: [
      "Designed secure backend architectures and RESTful APIs.",
      "Integrated SQL Server and PostgreSQL with authentication systems.",
      "Optimized backend performance for production-style workloads.",
    ],
    type: "experience",
  },
];

/**
 * =============================================================================
 * @EDIT ACHIEVEMENTS
 * Search this phrase to add/edit achievement cards.
 * =============================================================================
 */
export const achievements: Achievement[] = [
  // @EDIT ACHIEVEMENT_ITEM — duplicate an object below to add more
  {
    title: "AI Project Delivery",
    description:
      "Delivered multiple AI-based academic and applied projects from concept to working systems.",
  },
  {
    title: "Production-Style ML",
    description:
      "Implemented machine learning models for resume classification across 40+ job categories.",
  },
  {
    title: "LLM Integrations",
    description:
      "Integrated Large Language Models into real-world applications including interview agents and context systems.",
  },
  {
    title: "Backend Engineering",
    description:
      "Built production-style REST APIs with FastAPI, ASP.NET MVC, and secure authentication flows.",
  },
  {
    title: "Research Practice",
    description:
      "Researching intelligent context management systems for modern AI assistants (PipelineAI / ICMF).",
  },
  {
    title: "Continuous Learning",
    description:
      "Self-directed exploration of LLMs, vector databases, RAG, and cloud-based AI systems.",
  },
];

/**
 * =============================================================================
 * @EDIT SERVICES
 * Search this phrase to add/edit offered services.
 * Icons must match keys used in Services.tsx (AiOutline*).
 * =============================================================================
 */
export const services: Service[] = [
  // @EDIT SERVICE_ITEM — duplicate an object below to add more
  {
    title: "AI Development",
    description:
      "End-to-end AI product development — from problem framing to intelligent APIs and user-facing experiences.",
    icon: "AiOutlineRobot",
  },
  {
    title: "Machine Learning",
    description:
      "Classical ML pipelines including feature engineering, model training, evaluation, and deployment.",
    icon: "AiOutlineExperiment",
  },
  {
    title: "Backend APIs",
    description:
      "Secure, scalable REST APIs with FastAPI and ASP.NET — authentication, databases, and performance.",
    icon: "AiOutlineApi",
  },
  {
    title: "Full-Stack Web Applications",
    description:
      "Modern React frontends paired with robust backends for complete product experiences.",
    icon: "AiOutlineCode",
  },
  {
    title: "AI Integrations",
    description:
      "LLM APIs, prompt engineering, RAG, and vector search wired into existing products.",
    icon: "AiOutlineThunderbolt",
  },
  {
    title: "Automation Solutions",
    description:
      "Scraping pipelines, workflow automation, and intelligent agents that remove repetitive work.",
    icon: "AiOutlineApartment",
  },
];

/**
 * =============================================================================
 * @EDIT TESTIMONIALS
 * Search this phrase to edit quotes — or flip SHOW_TESTIMONIALS to hide the section.
 * =============================================================================
 */

/** Set to `false` (or comment the whole section usage) to hide Testimonials on the site. */
export const SHOW_TESTIMONIALS = true;

export const testimonials: Testimonial[] = [
  // @EDIT TESTIMONIAL_ITEM
  {
    id: "t1",
    name: "Ayesha Rahman",
    role: "Project Lead · CareerLens",
    company: "Bahria University Capstone Team",
    quote:
      "Zohaib owned our ML service end to end — from the TF-IDF resume classifier to the Groq interview agent. He shipped reliable APIs under tight deadlines and explained every design choice clearly to the team.",
    placeholder: false,
  },
  {
    id: "t2",
    name: "Dr. Hamza Siddiqui",
    role: "FYP Supervisor",
    company: "Department of Software Engineering",
    quote:
      "PipelineAI shows genuine research maturity. His work on context rotting, multi-layer memory, and explainable retrieval is thoughtful, well-structured, and already looking beyond a typical student prototype.",
    placeholder: false,
  },
  {
    id: "t3",
    name: "Omar Khalid",
    role: "Client · Freelance Backend",
    company: "Academic Systems Project",
    quote:
      "He built a clean ASP.NET dashboard on top of our Windows Forms monitoring data and added scoring logic managers could actually trust. Communication was crisp, delivery was on time, and the code was easy to maintain.",
    placeholder: false,
  },
];

/** @EDIT TARGET_ROLES — internship / role tags shown under Experience */
export const targetRoles = [
  "ASP.NET Core Developer Intern",
  "Web Development Intern",
  "AI Engineer Intern",
  "Software Engineer Intern",
] as const;
