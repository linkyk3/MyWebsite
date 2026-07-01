/**
 * BelgianInfraSVG
 * Abstract technical diagram of Belgium's "diffused urban condition":
 * dense Flemish ribbon development, highway/rail corridors, fragmented
 * parcellation grids, and scattered node clusters — all self-tracing on load.
 */

export default function BelgianInfraSVG() {
  const line = (delay: number, length = 1400) => ({
    strokeDasharray: length,
    strokeDashoffset: length,
    animation: `drawLine 2.8s cubic-bezier(0.4,0,0.2,1) ${delay}s forwards`,
  });

  const dashed = (delay: number) => ({
    strokeDashoffset: 600,
    animation: `drawLine 2.8s cubic-bezier(0.4,0,0.2,1) ${delay}s forwards`,
  });

  const fade = (delay: number, dur = 0.6) => ({
    opacity: 0,
    animation: `fadeIn ${dur}s ease-out ${delay}s forwards`,
  });

  return (
    <svg
      viewBox="0 0 1000 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-foreground"
      data-testid="hero-belgian-infra-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ── BACKGROUND GRID: urban parcellation ── */}
      <g stroke="currentColor" strokeWidth="0.3" opacity="0.18">
        {/* Vertical grid lines */}
        {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960].map((x) => (
          <path key={`vg-${x}`} d={`M ${x},0 L ${x},360`} strokeDasharray="3 9" style={dashed(0.05)} />
        ))}
        {/* Horizontal grid lines */}
        {[60, 120, 180, 240, 300].map((y) => (
          <path key={`hg-${y}`} d={`M 0,${y} L 1000,${y}`} strokeDasharray="3 9" style={dashed(0.05)} />
        ))}
      </g>

      {/* ── E40 CORRIDOR: main east–west highway axis ── */}
      <g stroke="currentColor">
        {/* E40 main carriageway */}
        <path
          d="M -20,195 C 80,192 180,185 300,178 C 420,171 500,168 620,165 C 740,162 860,163 1020,160"
          strokeWidth="2.5"
          style={line(0, 1200)}
        />
        {/* E40 parallel lane */}
        <path
          d="M -20,205 C 80,202 180,195 300,188 C 420,181 500,178 620,175 C 740,172 860,173 1020,170"
          strokeWidth="1.2"
          style={line(0.08, 1200)}
        />
        {/* E40 median dashes */}
        <path
          d="M 0,200 L 1000,182"
          strokeWidth="0.6"
          strokeDasharray="18 12"
          style={dashed(0.12)}
        />
      </g>

      {/* ── RAIL CORRIDOR: Brussels–Ghent–Bruges axis ── */}
      <g stroke="currentColor">
        <path
          d="M -20,130 C 100,128 220,126 350,122 C 480,118 600,116 750,113 C 850,111 940,110 1020,109"
          strokeWidth="1.8"
          style={line(0.15, 1100)}
        />
        {/* Rail sleepers (tick marks) */}
        <g style={fade(0.9, 0.5)}>
          {[50, 100, 150, 200, 250, 310, 370, 430, 490, 550, 610, 670, 730, 790, 850, 910, 960].map((x, i) => {
            const y = 130 - x * 0.021;
            return (
              <path
                key={`sleeper-${i}`}
                d={`M ${x},${y - 5} L ${x},${y + 5}`}
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      </g>

      {/* ── RING ROAD: Brussels orbital (R0) ── */}
      <g stroke="currentColor" strokeWidth="1.6">
        <path
          d="M 320,20 C 380,18 430,30 460,60 C 490,90 498,130 498,168 C 498,206 490,248 460,278 C 430,308 380,322 320,320 C 260,318 210,304 180,274 C 150,244 142,200 142,168 C 142,136 150,92 180,62 C 210,32 260,22 320,20"
          style={line(0.25, 900)}
        />
      </g>

      {/* ── A12 CORRIDOR: Antwerp–Brussels radial ── */}
      <g stroke="currentColor">
        <path
          d="M 320,20 L 320,170"
          strokeWidth="2"
          style={line(0.5, 200)}
        />
        <path
          d="M 332,20 L 332,168"
          strokeWidth="1"
          style={line(0.55, 200)}
        />
      </g>

      {/* ── E17: Ghent–Kortrijk diagonal ── */}
      <g stroke="currentColor">
        <path
          d="M 0,60 C 80,80 140,110 200,140 C 240,160 275,170 320,170"
          strokeWidth="1.8"
          style={line(0.35, 500)}
        />
      </g>

      {/* ── RIBBON DEVELOPMENT: fragmented linear urbanisation ── */}
      {/* Dots along E40 representing diffused settlement */}
      <g style={fade(1.1, 0.8)}>
        {([
          [90, 175, 14], [130, 172, 10], [175, 170, 14], [230, 167, 10],
          [380, 161, 14], [440, 158, 10], [510, 155, 14], [575, 153, 10],
          [650, 150, 14], [720, 148, 10], [790, 147, 14], [850, 146, 10],
        ] as [number, number, number][]).map(([x, y, w], i) => (
          <rect
            key={`ribbon-${i}`}
            x={x - 3}
            y={y - 8}
            width={w}
            height={6}
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
          />
        ))}
      </g>

      {/* ── SECONDARY ROAD NETWORK: branching feeder roads ── */}
      <g stroke="currentColor" strokeWidth="0.9" opacity="0.7">
        <path d="M 220,130 L 220,195" style={line(0.6, 180)} />
        <path d="M 220,195 L 190,230 L 160,260" style={line(0.65, 180)} />
        <path d="M 460,165 L 460,220 L 490,255" style={line(0.7, 200)} />
        <path d="M 620,165 L 580,200 L 560,240" style={line(0.72, 200)} />
        <path d="M 750,162 L 750,230 L 720,280" style={line(0.75, 240)} />
        <path d="M 850,162 L 850,120 L 890,90" style={line(0.78, 180)} />
        <path d="M 142,168 L 80,200 L 40,230" style={line(0.68, 200)} />
      </g>

      {/* ── URBAN CORES: node clusters ── */}
      {/* Brussels */}
      <g style={fade(1.2)}>
        <circle cx="320" cy="168" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"
          style={{ strokeDasharray: 90, strokeDashoffset: 90, animation: 'drawLine 1s ease-out 1.2s forwards' }} />
        <circle cx="320" cy="168" r="4" fill="currentColor" opacity="0.5" />
      </g>
      {/* Ghent */}
      <g style={fade(1.35)}>
        <circle cx="142" cy="168" r="10" stroke="currentColor" strokeWidth="1.2" fill="none"
          style={{ strokeDasharray: 65, strokeDashoffset: 65, animation: 'drawLine 1s ease-out 1.35s forwards' }} />
        <circle cx="142" cy="168" r="3" fill="currentColor" opacity="0.4" />
      </g>
      {/* Leuven */}
      <g style={fade(1.45)}>
        <circle cx="498" cy="168" r="8" stroke="currentColor" strokeWidth="1.2" fill="none"
          style={{ strokeDasharray: 52, strokeDashoffset: 52, animation: 'drawLine 1s ease-out 1.45s forwards' }} />
        <circle cx="498" cy="168" r="2.5" fill="currentColor" opacity="0.4" />
      </g>
      {/* Antwerp (top of R0 radial) */}
      <g style={fade(1.55)}>
        <circle cx="320" cy="24" r="7" stroke="currentColor" strokeWidth="1.1" fill="none"
          style={{ strokeDasharray: 45, strokeDashoffset: 45, animation: 'drawLine 1s ease-out 1.55s forwards' }} />
        <circle cx="320" cy="24" r="2" fill="currentColor" opacity="0.4" />
      </g>
      {/* Kortrijk */}
      <g style={fade(1.6)}>
        <circle cx="80" cy="200" r="6" stroke="currentColor" strokeWidth="1" fill="none"
          style={{ strokeDasharray: 38, strokeDashoffset: 38, animation: 'drawLine 1s ease-out 1.6s forwards' }} />
      </g>
      {/* Liège */}
      <g style={fade(1.65)}>
        <circle cx="750" cy="162" r="7" stroke="currentColor" strokeWidth="1.1" fill="none"
          style={{ strokeDasharray: 45, strokeDashoffset: 45, animation: 'drawLine 1s ease-out 1.65s forwards' }} />
        <circle cx="750" cy="162" r="2" fill="currentColor" opacity="0.3" />
      </g>


      {/* ── CROSS-HATCH DETAIL: dense urban parcel at Brussels ── */}
      <g style={fade(1.5, 0.7)} stroke="currentColor" strokeWidth="0.4" opacity="0.3">
        {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
          <path key={`xh-${n}`} d={`M ${280 + n * 8},148 L ${360 + n * 8},188`} />
        ))}
        {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
          <path key={`xhb-${n}`} d={`M ${360 - n * 8},148 L ${280 - n * 8},188`} />
        ))}
      </g>

      {/* ── WATER (Scheldt / Meuse) — wide curved path ── */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.35">
        <path
          d="M 0,320 C 80,300 140,280 200,255 C 260,230 300,210 320,200 C 340,190 370,178 430,170"
          strokeDasharray="6 4"
          style={dashed(0.3)}
        />
        <path
          d="M 550,110 C 620,120 690,130 750,145 C 800,158 860,170 1000,175"
          strokeDasharray="6 4"
          style={dashed(0.4)}
        />
      </g>
    </svg>
  );
}
