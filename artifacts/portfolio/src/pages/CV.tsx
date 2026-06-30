export default function CV() {
  return (
    <div className="min-h-[100dvh] w-full bg-background pt-32 pb-24 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto flex flex-col gap-16">
      
      {/* Header */}
      <header className="flex flex-col gap-6 border-b border-foreground pb-12">
        <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-foreground">
          Seppe Goossens<sup className="font-mono text-sm md:text-xl ml-1 text-muted-foreground">1</sup> · 
          Urban Planner<sup className="font-mono text-sm md:text-xl ml-1 text-muted-foreground">2</sup> · 
          Industrial Engineer<sup className="font-mono text-sm md:text-xl ml-1 text-muted-foreground">3</sup>
        </h1>
        <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex gap-4">
          <span>1 — student</span>
          <span>2 — spatial systems</span>
          <span>3 — process optimization</span>
        </div>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-foreground">
        
        {/* Left Column: Education */}
        <section className="border-b md:border-b-0 md:border-r border-foreground pb-12 md:pb-0 md:pr-12 lg:pr-24 flex flex-col gap-8 pt-8 md:pt-0">
          <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Education</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <span className="font-mono text-xs text-muted-foreground">01</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-medium text-lg">University of Technology</h3>
                <p className="font-sans text-sm text-foreground/80">B.S. Industrial Engineering</p>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1">2021 — 2025</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="font-mono text-xs text-muted-foreground">02</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-medium text-lg">College of Design</h3>
                <p className="font-sans text-sm text-foreground/80">B.A. Urban Planning</p>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1">2021 — 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Skills */}
        <section className="pt-12 md:pt-0 md:pl-12 lg:pl-24 flex flex-col gap-8 pb-12">
          <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Capabilities</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground/20 pb-2">GIS & Spatial</h3>
              <ul className="flex flex-col gap-2 font-sans text-sm">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> ArcGIS Pro</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> QGIS</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> GeoPandas</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground/20 pb-2">CAD & Design</h3>
              <ul className="flex flex-col gap-2 font-sans text-sm">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> AutoCAD</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> Rhino 3D</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> Adobe CC</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground/20 pb-2">Engineering Tools</h3>
              <ul className="flex flex-col gap-2 font-sans text-sm">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> Excel / Solver</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> OR-Tools</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> Arena Simulation</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[10px] tracking-widest text-foreground uppercase border-b border-foreground/20 pb-2">Languages</h3>
              <ul className="flex flex-col gap-2 font-sans text-sm">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> Python</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> SQL</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-foreground"></span> R</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Experience Timeline */}
      <section className="flex flex-col gap-8 pb-24">
        <h2 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">Experience Profile</h2>
        
        <div className="flex flex-col">
          {[
            { company: "City Transit Authority", role: "Network Planning Intern", date: "May 2024 — Aug 2024", id: "1" },
            { company: "Apex Manufacturing", role: "Process Optimization Co-op", date: "Jan 2024 — May 2024", id: "2" },
            { company: "Regional Planning Commission", role: "GIS Research Assistant", date: "Jun 2023 — Dec 2023", id: "3" },
          ].map((job, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col border-t border-foreground transition-colors duration-200 hover:border-l-2 hover:border-l-accent hover:pl-4 pl-0 py-6"
            >
              <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-2">
                <div className="flex gap-2 items-baseline">
                  <h3 className="font-sans font-medium text-lg md:text-xl text-foreground">
                    {job.company}
                  </h3>
                  <sup className="font-mono text-xs text-muted-foreground">{job.id}</sup>
                  <span className="font-sans text-sm text-foreground/60 hidden md:inline ml-2">— {job.role}</span>
                </div>
                <div className="font-mono text-xs tracking-widest text-muted-foreground">
                  {job.date}
                </div>
              </div>
              <p className="font-sans text-sm text-foreground/60 md:hidden mt-1">{job.role}</p>
            </div>
          ))}
          <div className="border-t border-foreground w-full h-[1px]"></div>
        </div>
      </section>
    </div>
  );
}
