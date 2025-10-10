

type Project = {
  id: string;
  title: string;            // e.g., "CricksLab – Smarter Cricket UX"
  tags: string[];           // e.g., ["Product Design", "Dashboard Design", ...]
  heroImage: { src: string; alt: string };        // large left image
  secondaryImage: { src: string; alt: string };   // top-right image
  summary: string;          // right-bottom description card
  link?: string;            // optional external case-study link
};

const projects: Project[] = [
  {
    id: "p1",
    title: "CricksLab – Smarter Cricket UX",
    tags: [
      "Product Design",
      "Dashboard Design",
      "Mobile App",
      "Interface Design & UX",
      "Data Insights",
      "Fantasy App",
      "SaaS",
    ],
    heroImage: {
      src: "https://picsum.photos/seed/crickslab-hero/1200/720",
      alt: "CricksLab redesigned app shown on a laptop",
    },
    secondaryImage: {
      src: "https://picsum.photos/seed/crickslab-secondary/800/600",
      alt: "CricksLab analytics dashboard preview",
    },
    summary:
      "We redesigned CricksLab from scratch, enhancing UX usability and effortless match tracking for cricket fans. Post-launch, the successful revamped app crossed 10K+ downloads and improved retention significantly.",
    link: "#",
  },
  {
    id: "p2",
    title: "FitFlow – Actionable Health Dashboards",
    tags: [
      "Product Design",
      "HealthTech",
      "Mobile App",
      "Data Visualization",
      "SaaS",
    ],
    heroImage: {
      src: "https://picsum.photos/seed/fitflow-hero/1200/720",
      alt: "FitFlow dashboard on laptop showing KPIs",
    },
    secondaryImage: {
      src: "https://picsum.photos/seed/fitflow-secondary/800/600",
      alt: "FitFlow mobile screens and charts",
    },
    summary:
      "Designed a modular insights layer with habits, trends, and cohort analysis. Ship-ready components reduced time-to-feature by ~35% and boosted DAU with better streak mechanics.",
    link: "#",
  },
  // leave `id` here; more projects will be added later
];

function ExternalLinkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M10 7h7v7" />
      <path d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4" />
    </svg>
  );
}

const TagChip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm">
    {label}
  </span>
);

const ProjectBlock = ({ project }: { project: Project }) => (
  <section
    key={project.id}
    className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:px-6 lg:px-8"
  >
    {/* Header */}
    <div className="mb-5 flex items-start justify-between gap-4">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        {project.title}
      </h2>

      {project.link && (
        <a
          href={project.link}
          className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-gray-700 transition hover:shadow-md"
          aria-label="Open case study"
        >
          <ExternalLinkIcon className="h-4.5 w-4.5 transition group-hover:scale-110" />
        </a>
      )}
    </div>

    {/* Tags */}
    <div className="mb-8 flex flex-wrap gap-2">
      {project.tags.map((t) => (
        <TagChip key={t} label={t} />
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
      {/* Left: Hero image (takes 2 cols on large) */}
      <div className="lg:col-span-2">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Right column: secondary image + summary card */}
      <div className="flex flex-col gap-6">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <img
            src={project.secondaryImage.src}
            alt={project.secondaryImage.alt}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-emerald-50 p-5 text-sm leading-relaxed text-gray-800 shadow-sm">
          {project.summary}
        </div>
      </div>
    </div>
  </section>
);

export default function OurProjects() {
  return (
    <div className="bg-gray-50">
      {projects.map((p) => (
        <ProjectBlock key={p.id} project={p} />
      ))}
    </div>
  );
}
