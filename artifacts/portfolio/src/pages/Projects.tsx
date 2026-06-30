import { Link } from 'wouter';

const urbanProjects = [
  {
    id: "001",
    title: "Transit Network Optimization",
    desc: "Modeling multimodal transit in a mid-size city using graph theory.",
    tags: ["GIS", "Network Analysis", "Python"]
  },
  {
    id: "002",
    title: "Zoning Reform Proposal",
    desc: "Rezoning study for mixed-use corridors.",
    tags: ["Urban Policy", "Spatial Analysis", "CAD"]
  },
  {
    id: "003",
    title: "Pedestrian Flow Simulation",
    desc: "Agent-based simulation of pedestrian density in public spaces.",
    tags: ["Simulation", "GIS", "Data Viz"]
  }
];

const processProjects = [
  {
    id: "004",
    title: "Supply Chain Resilience",
    desc: "Risk mapping and mitigation strategies for mid-tier manufacturing.",
    tags: ["Operations Research", "Optimization", "Excel/Solver"]
  },
  {
    id: "005",
    title: "Ergonomics Audit",
    desc: "Workstation redesign study using RULA methodology.",
    tags: ["Human Factors", "CAD", "Data Collection"]
  },
  {
    id: "006",
    title: "Production Scheduling",
    desc: "Integer programming model for a job-shop scheduling problem.",
    tags: ["Linear Programming", "Python", "OR-Tools"]
  }
];

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group border border-foreground p-6 flex flex-col gap-4 bg-background transition-colors duration-200 hover:border-t-2 hover:border-t-accent hover:border-r-foreground hover:border-b-foreground hover:border-l-foreground h-full relative cursor-pointer" data-testid={`project-${project.id}`}>
      <div className="font-mono text-xs tracking-widest text-muted-foreground">
        {project.id}
      </div>
      <h3 className="font-sans font-medium text-xl leading-tight">
        {project.title}
      </h3>
      <p className="font-sans text-sm text-foreground/70 flex-grow">
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tags.map((tag: string) => (
          <span key={tag} className="border border-foreground px-2 py-1 font-mono text-[10px] tracking-wider uppercase text-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="min-h-[100dvh] w-full bg-background pt-32 pb-24 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto flex flex-col gap-24">
      
      {/* SECTION A: URBAN PLANNING */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground pb-4">
          01 / SPATIAL SYSTEMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urbanProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Large Divider */}
      <div className="w-full h-px bg-foreground" />

      {/* SECTION B: INDUSTRIAL ENGINEERING */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground pb-4">
          02 / PROCESS SYSTEMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
