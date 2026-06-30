
export default function TracingSVG() {
  const getStyle = (delay: number) => ({
    strokeDasharray: 2000,
    strokeDashoffset: 2000,
    animation: `drawLine 2.5s ease-out ${delay}s forwards`,
  });

  // For dashed lines — preserves the dash pattern attribute, only animates offset
  const getDashedStyle = (delay: number, dashOffset = 2000) => ({
    strokeDashoffset: dashOffset,
    animation: `drawLine 2.5s ease-out ${delay}s forwards`,
  });

  return (
    <svg 
      viewBox="0 0 800 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-full text-foreground"
      data-testid="hero-tracing-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        {/* Main flow line */}
        <path d="M -50,150 C 150,150 250,50 400,50 C 550,50 650,250 850,250" style={getStyle(0)} />
        <path d="M 400,50 C 450,50 500,100 500,200 C 500,300 600,350 850,350" style={getStyle(0.2)} />
        
        {/* Branching pipes */}
        <path d="M 250,100 L 250,300 C 250,350 300,380 450,380" style={getStyle(0.4)} />
        <path d="M 500,200 L 300,200 C 250,200 200,250 200,350" style={getStyle(0.5)} />
        <path d="M 600,150 L 600,50 C 600,20 650,-10 750,-10" style={getStyle(0.6)} />
        
        {/* Technical cross-hatches / guides */}
        <path d="M 100,0 L 100,400" strokeDasharray="4 4" style={getDashedStyle(0.1)} />
        <path d="M 0,200 L 800,200" strokeDasharray="4 4" style={getDashedStyle(0.1)} />
        <path d="M 400,0 L 400,400" strokeDasharray="2 6" style={getDashedStyle(0.3)} />
        <path d="M 700,0 L 700,400" strokeDasharray="2 6" style={getDashedStyle(0.3)} />

        {/* Junction Nodes */}
        <circle cx="250" cy="100" r="8" className="fill-background" stroke="currentColor" style={{...getStyle(0.8), strokeDasharray: 100, strokeDashoffset: 100}} />
        <circle cx="400" cy="50" r="10" className="fill-background" stroke="currentColor" style={{...getStyle(0.9), strokeDasharray: 100, strokeDashoffset: 100}} />
        <circle cx="500" cy="200" r="12" fill="none" stroke="currentColor" style={{...getStyle(1.0), strokeDasharray: 100, strokeDashoffset: 100}} />
        <circle cx="600" cy="150" r="6" className="fill-background" stroke="currentColor" style={{...getStyle(1.1), strokeDasharray: 100, strokeDashoffset: 100}} />
        <circle cx="650" cy="250" r="8" fill="none" stroke="currentColor" style={{...getStyle(1.2), strokeDasharray: 100, strokeDashoffset: 100}} />
        
        {/* Node Labels */}
        <g style={{ opacity: 0, animation: 'fadeIn 0.5s ease-out 1.5s forwards' }} className="font-mono text-[10px] fill-current">
          <text x="265" y="95">J-01</text>
          <text x="415" y="45">N-400</text>
          <text x="520" y="195">SYS.2</text>
          <text x="615" y="145">J-04</text>
          <text x="665" y="245">OUT.1</text>
        </g>
        
        {/* Cross Connectors */}
        <g style={{ opacity: 0, animation: 'fadeIn 0.5s ease-out 1.2s forwards' }}>
          <path d="M 245,100 L 255,100 M 250,95 L 250,105" />
          <path d="M 395,50 L 405,50 M 400,45 L 400,55" />
          <path d="M 495,200 L 505,200 M 500,195 L 500,205" />
          <path d="M 595,150 L 605,150 M 600,145 L 600,155" />
          <path d="M 645,250 L 655,250 M 650,245 L 650,255" />
        </g>
        
        {/* Fine radiation lines */}
        <path d="M 400,50 L 430,20" strokeWidth="0.5" style={getStyle(1.2)} />
        <path d="M 400,50 L 370,20" strokeWidth="0.5" style={getStyle(1.2)} />
        <path d="M 500,200 L 540,160" strokeWidth="0.5" style={getStyle(1.3)} />
        <path d="M 500,200 L 540,240" strokeWidth="0.5" style={getStyle(1.3)} />
      </g>
    </svg>
  );
}