"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryPopup } from "@/components/ui/CategoryPopup";
import { ProjectCard } from "./ProjectCard";
import { projects, PROJECT_FILTERS } from "@/data/projects";
import type { ProjectCategory } from "@/types";

const FILTER_ACCENTS: Record<string, string> = {
  All: "#00E5FF",
  AI: "#8B5CF6",
  "Full Stack": "#3B82F6",
  Backend: "#22D3EE",
  "Machine Learning": "#A78BFA",
};

export function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");
  const [popupFilter, setPopupFilter] = useState<
    (typeof PROJECT_FILTERS)[number] | null
  >(null);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) =>
      p.category.includes(filter as ProjectCategory)
    );
  }, [filter]);

  const popupProjects = useMemo(() => {
    if (!popupFilter || popupFilter === "All") return projects;
    return projects.filter((p) =>
      p.category.includes(popupFilter as ProjectCategory)
    );
  }, [popupFilter]);

  const closePopup = useCallback(() => setPopupFilter(null), []);

  const onFilterClick = (f: (typeof PROJECT_FILTERS)[number]) => {
    setFilter(f);
    // Open popup for specific categories; "All" just filters the grid
    if (f === "All") {
      setPopupFilter(null);
      return;
    }
    setPopupFilter((prev) => (prev === f ? null : f));
  };

  return (
    <section id="projects" className="section">
      <div className="container-grid">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Click a category label to preview matching projects in a popup — the grid below updates too."
        />

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Project filters"
        >
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => onFilterClick(f)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                filter === f || popupFilter === f
                  ? "bg-cyan/15 text-cyan border border-cyan/40 shadow-[0_0_18px_rgba(0,229,255,0.2)]"
                  : "border border-border text-text-muted hover:border-cyan/30 hover:text-text"
              }`}
              data-cursor="hover"
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <CategoryPopup
        open={Boolean(popupFilter)}
        title={popupFilter ?? ""}
        accent={FILTER_ACCENTS[popupFilter ?? "All"]}
        subtitle={`${popupProjects.length} project${popupProjects.length === 1 ? "" : "s"} in this category`}
        onClose={closePopup}
      >
        <motion.ul
          className="space-y-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {popupProjects.map((project) => (
            <motion.li
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.94 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 340, damping: 24 },
                },
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-2xl border border-border bg-bg-surface/60 p-4 transition-all hover:border-cyan/40 hover:shadow-[0_0_28px_rgba(0,229,255,0.15)]"
                onClick={closePopup}
                data-cursor="hover"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {project.category.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-cyan/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cyan"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h4 className="heading-display mt-2 text-lg text-text group-hover:text-cyan">
                  {project.title}
                </h4>
                <p className="mt-1 text-sm text-text-muted">
                  {project.shortDescription}
                </p>
                <p className="mt-3 text-xs font-semibold text-cyan">
                  Open case study →
                </p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </CategoryPopup>
    </section>
  );
}
