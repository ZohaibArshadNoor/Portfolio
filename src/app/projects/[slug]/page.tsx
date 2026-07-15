import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Zohaib Arshad Noor`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    { title: "Problem", body: project.problem },
    { title: "Solution / Approach", body: project.solution },
    project.architecture
      ? { title: "Architecture", body: project.architecture }
      : null,
  ].filter(Boolean) as { title: string; body: string }[];

  return (
    <article className="pb-24 pt-28">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `linear-gradient(135deg, rgba(0,229,255,0.15), rgba(139,92,246,0.2)), url(${project.image}) center/cover`,
          }}
          aria-hidden
        />
        <div className="container-grid relative py-16 md:py-24">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-cyan"
          >
            <FaArrowLeft size={12} /> Back to projects
          </Link>
          <div className="flex flex-wrap gap-2">
            {project.category.map((c) => (
              <span
                key={c}
                className="rounded-md bg-cyan/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan"
              >
                {c}
              </span>
            ))}
            {project.status && (
              <span className="rounded-md border border-purple/30 bg-purple/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="heading-display mt-4 text-4xl md:text-6xl">{project.title}</h1>
          {project.subtitle && (
            <p className="mt-2 text-lg text-purple">{project.subtitle}</p>
          )}
          <p className="mt-4 max-w-2xl text-text-muted">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-text-muted hover:border-cyan/40 hover:text-cyan"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 px-4 py-2 text-sm text-cyan"
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="container-grid mt-16 space-y-16">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="heading-display mb-4 text-2xl text-cyan md:text-3xl">
              {s.title}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
              {s.body}
            </p>
          </section>
        ))}

        {project.challenges && project.challenges.length > 0 && (
          <section>
            <h2 className="heading-display mb-4 text-2xl text-cyan md:text-3xl">
              Challenges
            </h2>
            <ul className="max-w-3xl space-y-3">
              {project.challenges.map((c) => (
                <li
                  key={c}
                  className="glass rounded-xl px-5 py-4 text-sm text-text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="heading-display mb-4 text-2xl text-cyan md:text-3xl">
            Results
          </h2>
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {project.results.map((r) => (
              <li
                key={r}
                className="glass gradient-border rounded-xl px-5 py-4 text-sm text-text-muted"
              >
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="heading-display mb-4 text-2xl text-cyan md:text-3xl">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-border bg-bg-surface/70 px-3 py-1.5 text-sm text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
