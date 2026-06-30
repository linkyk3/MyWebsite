/**
 * ConstellationMap
 * Organic diagrammatic canvas replacing the box-grid navigation.
 * 4 category nodes connected via thin technical lines to sub-nodes,
 * with the historical urbanisation map embedded at the centre core.
 *
 * Visual language: radial rail-survey diagram + circuit-diagram orthogonality
 * (refs: image_1782826039349.png, image_1782826032122.png, image_1782826034989.png)
 *
 * Map is rendered as an SVG <image> so it shares the same coordinate space
 * as the overlay lines — no letterbox-drift from preserveAspectRatio.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';

import map1778 from '@assets/macro_verstedelijking_h3_1778_1782822902181.png';
import map1873 from '@assets/macro_verstedelijking_h3_1873_1782822902180.png';
import map1969 from '@assets/macro_verstedelijking_h3_1969_1782822902180.png';
import map2026 from '@assets/macro_verstedelijking_h3_2026_1782822902180.png';

// ─── Types ────────────────────────────────────────────────────────────────────

type V2 = [number, number];

interface SubNode {
  id: string;
  pos: V2;
  label: string;
  labelAnchor?: 'start' | 'middle' | 'end';
  labelOffset?: V2;
}

interface Category {
  id: string;
  label: string;
  href: string;
  pos: V2;
  sub: SubNode[];
  labelAnchor: 'start' | 'middle' | 'end';
  labelOffset: V2;
}

// ─── SVG viewport ─────────────────────────────────────────────────────────────
const VW = 900;
const VH = 620;

// Centre of the map window (SVG units)
const CX = 450;
const CY = 310;
const MAP_W = 210;
const MAP_H = 155;

// ─── Constellation data ───────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    pos: [195, 125],
    labelAnchor: 'end',
    labelOffset: [-14, -12],
    sub: [
      { id: 'p1', pos: [52, 45],  label: 'Urban Flows',   labelAnchor: 'start', labelOffset: [8, -6] },
      { id: 'p2', pos: [68, 195], label: 'Infra Systems', labelAnchor: 'end',   labelOffset: [-8, 4] },
      { id: 'p3', pos: [255, 38], label: 'Spatial Logic', labelAnchor: 'start', labelOffset: [8, -6] },
    ],
  },
  {
    id: 'photography',
    label: 'Photography',
    href: '/creations',
    pos: [720, 108],
    labelAnchor: 'start',
    labelOffset: [14, -12],
    sub: [
      { id: 'ph1', pos: [858, 42],  label: 'Architecture', labelAnchor: 'end',    labelOffset: [-8, -6] },
      { id: 'ph2', pos: [868, 178], label: 'Field Notes',  labelAnchor: 'start',  labelOffset: [8, 4] },
      { id: 'ph3', pos: [662, 30],  label: 'Landscapes',   labelAnchor: 'middle', labelOffset: [0, -10] },
    ],
  },
  {
    id: 'music',
    label: 'Music',
    href: '/creations',
    pos: [162, 500],
    labelAnchor: 'end',
    labelOffset: [-14, 8],
    sub: [
      { id: 'm1', pos: [42, 582],  label: 'Recordings', labelAnchor: 'end',   labelOffset: [-8, 6] },
      { id: 'm2', pos: [46, 420],  label: 'Live Sets',  labelAnchor: 'end',   labelOffset: [-8, -6] },
      { id: 'm3', pos: [205, 592], label: 'Playlists',  labelAnchor: 'start', labelOffset: [8, 6] },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/creations',
    pos: [755, 502],
    labelAnchor: 'start',
    labelOffset: [14, 8],
    sub: [
      { id: 'b1', pos: [876, 575], label: 'Essays',   labelAnchor: 'start', labelOffset: [8, 6] },
      { id: 'b2', pos: [872, 432], label: 'Research', labelAnchor: 'start', labelOffset: [8, -6] },
      { id: 'b3', pos: [700, 592], label: 'Notes',    labelAnchor: 'middle', labelOffset: [0, 12] },
    ],
  },
];

// Lines from category nodes to the four corners of the map window
const CENTRE_CONNECTIONS: Record<string, V2> = {
  projects:    [CX - MAP_W / 2, CY - MAP_H / 2 + 20],
  photography: [CX + MAP_W / 2, CY - MAP_H / 2 + 20],
  music:       [CX - MAP_W / 2, CY + MAP_H / 2 - 20],
  blog:        [CX + MAP_W / 2, CY + MAP_H / 2 - 20],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function unitVec(a: V2, b: V2): V2 {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return [dx / len, dy / len];
}

/** Builds a path string of perpendicular tick marks along segment a→b */
function tickMarks(a: V2, b: V2, spacing = 38, tickLen = 4.5): string {
  const [ux, uy] = unitVec(a, b);
  const [px, py] = [-uy, ux]; // perpendicular
  const totalLen = Math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2);
  let d = '';
  for (let t = spacing; t < totalLen - 12; t += spacing) {
    const mx = lerp(a[0], b[0], t / totalLen);
    const my = lerp(a[1], b[1], t / totalLen);
    d += `M${mx - px*tickLen} ${my - py*tickLen} L${mx + px*tickLen} ${my + py*tickLen} `;
  }
  return d;
}

// ─── Map era cycle ────────────────────────────────────────────────────────────
const MAP_ERAS = [
  { src: map1778, year: '1778' },
  { src: map1873, year: '1873' },
  { src: map1969, year: '1969' },
  { src: map2026, year: '2026' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ConstellationMap() {
  const [, navigate] = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mapEra, setMapEra] = useState(0);
  const cycleRef = useRef<ReturnType<typeof setInterval>>(null);

  // Auto-cycle map eras
  useEffect(() => {
    cycleRef.current = setInterval(() => setMapEra(e => (e + 1) % MAP_ERAS.length), 3200);
    return () => { if (cycleRef.current) clearInterval(cycleRef.current); };
  }, []);

  const handleClick = useCallback((href: string) => navigate(href), [navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, href: string) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(href); }
    },
    [navigate]
  );

  return (
    <div className="w-full h-full relative select-none" aria-label="Navigation constellation">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        {/* ── Background cross-hair faint lines ── */}
        <line x1={CX} y1={0} x2={CX} y2={VH} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
        <line x1={0} y1={CY} x2={VW} y2={CY} stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />

        {/* ── Historical map — rendered as SVG <image> inside the same coordinate space ── */}
        <clipPath id="mapClip">
          <rect x={CX - MAP_W/2} y={CY - MAP_H/2} width={MAP_W} height={MAP_H} />
        </clipPath>
        <g clipPath="url(#mapClip)">
          {MAP_ERAS.map(({ src, year }, i) => (
            <image
              key={year}
              href={src}
              x={CX - MAP_W/2}
              y={CY - MAP_H/2}
              width={MAP_W}
              height={MAP_H}
              preserveAspectRatio="xMidYMid slice"
              style={{
                opacity: i === mapEra ? 0.5 : 0,
                transition: 'opacity 1.2s ease',
                filter: 'grayscale(1) contrast(1.1)',
              }}
            />
          ))}
        </g>

        {/* Map window border + corner registration ticks */}
        <rect
          x={CX - MAP_W/2} y={CY - MAP_H/2} width={MAP_W} height={MAP_H}
          fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.7"
        />
        {([[CX-MAP_W/2, CY-MAP_H/2],[CX+MAP_W/2, CY-MAP_H/2],[CX-MAP_W/2, CY+MAP_H/2],[CX+MAP_W/2, CY+MAP_H/2]] as V2[]).map(([cx, cy], i) => (
          <g key={i}>
            <line x1={cx-8} y1={cy} x2={cx+8} y2={cy} stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
            <line x1={cx} y1={cy-8} x2={cx} y2={cy+8} stroke="rgba(0,0,0,0.4)" strokeWidth="0.7" />
          </g>
        ))}

        {/* Map label + era stamp */}
        <text
          x={CX} y={CY - MAP_H/2 - 7}
          textAnchor="middle"
          fontFamily="'ABC ROM', sans-serif" fontWeight={300} fontSize={6.5}
          letterSpacing="0.18em" fill="rgba(0,0,0,0.35)"
          style={{ textTransform: 'uppercase', userSelect: 'none' }}
        >
          BE.MACRO — URBANISATION CORE
        </text>
        <text
          x={CX - MAP_W/2 + 5} y={CY + MAP_H/2 - 6}
          fontFamily="'ABC ROM', sans-serif" fontWeight={300} fontSize={6.5}
          letterSpacing="0.14em" fill="rgba(0,0,0,0.45)"
          style={{ userSelect: 'none' }}
        >
          {MAP_ERAS[mapEra].year}
        </text>

        {/* ── Category nodes ── */}
        {CATEGORIES.map(cat => {
          const isHovered = hovered === cat.id;
          const dimmed = hovered !== null && !isHovered;
          const lineStroke = isHovered ? '#FF0000' : 'rgba(0,0,0,0.22)';
          const lineW = isHovered ? 1 : 0.7;
          const cTarget = CENTRE_CONNECTIONS[cat.id];

          return (
            <g
              key={cat.id}
              role="button"
              tabIndex={0}
              aria-label={`Navigate to ${cat.label}`}
              style={{
                opacity: dimmed ? 0.18 : 1,
                transition: 'opacity 0.3s ease',
                cursor: 'pointer',
                outline: 'none',
              }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(cat.href)}
              onKeyDown={e => handleKeyDown(e, cat.href)}
              onFocus={() => setHovered(cat.id)}
              onBlur={() => setHovered(null)}
            >
              {/* Sub-node connections */}
              {cat.sub.map(s => (
                <g key={s.id}>
                  <line
                    x1={cat.pos[0]} y1={cat.pos[1]}
                    x2={s.pos[0]}   y2={s.pos[1]}
                    stroke={lineStroke}
                    strokeWidth={lineW}
                    strokeDasharray={isHovered ? 'none' : '4 3'}
                    style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
                  />
                  {isHovered && (
                    <path d={tickMarks(cat.pos, s.pos)} stroke="#FF0000" strokeWidth="0.7" fill="none" />
                  )}
                  <circle
                    cx={s.pos[0]} cy={s.pos[1]}
                    r={isHovered ? 3 : 1.8}
                    fill={isHovered ? '#FF0000' : 'rgba(0,0,0,0.3)'}
                    style={{ transition: 'r 0.25s, fill 0.25s' }}
                  />
                  <text
                    x={s.pos[0] + (s.labelOffset?.[0] ?? 8)}
                    y={s.pos[1] + (s.labelOffset?.[1] ?? 0)}
                    textAnchor={s.labelAnchor ?? 'start'}
                    fontFamily="'ABC ROM', sans-serif"
                    fontWeight={300} fontSize={7.5} letterSpacing="0.12em"
                    fill={isHovered ? 'rgba(0,0,0,0.7)' : 'transparent'}
                    style={{ textTransform: 'uppercase', transition: 'fill 0.2s', userSelect: 'none' }}
                  >
                    {s.label}
                  </text>
                </g>
              ))}

              {/* Centre connection */}
              {cTarget && (
                <line
                  x1={cat.pos[0]} y1={cat.pos[1]}
                  x2={cTarget[0]}  y2={cTarget[1]}
                  stroke={isHovered ? '#FF0000' : 'rgba(0,0,0,0.15)'}
                  strokeWidth={isHovered ? 1 : 0.6}
                  style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
                />
              )}

              {/* Hub circle */}
              <circle
                cx={cat.pos[0]} cy={cat.pos[1]}
                r={isHovered ? 6 : 4}
                fill="white" stroke={isHovered ? '#FF0000' : 'rgba(0,0,0,0.55)'}
                strokeWidth={isHovered ? 1.5 : 1}
                style={{ transition: 'r 0.25s, stroke 0.25s' }}
              />
              <circle
                cx={cat.pos[0]} cy={cat.pos[1]}
                r={isHovered ? 2.5 : 1.5}
                fill={isHovered ? '#FF0000' : 'rgba(0,0,0,0.55)'}
                style={{ transition: 'fill 0.25s, r 0.25s' }}
              />

              {/* Category label */}
              <text
                x={cat.pos[0] + cat.labelOffset[0]}
                y={cat.pos[1] + cat.labelOffset[1]}
                textAnchor={cat.labelAnchor}
                fontFamily="'ABC ROM', sans-serif"
                fontWeight={isHovered ? 450 : 350} fontSize={10} letterSpacing="0.13em"
                fill={isHovered ? '#FF0000' : 'rgba(0,0,0,0.75)'}
                style={{ textTransform: 'uppercase', transition: 'fill 0.25s', userSelect: 'none' }}
              >
                {cat.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
