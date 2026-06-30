/**
 * UrbanHistoryMap
 * Historical layered map of Belgian urbanisation (Greater Brussels region).
 * 4 chronological eras displayed as crossfading image layers.
 * SVG arterial network traces itself on top when infrastructure era is active.
 */

import { useState, useCallback } from 'react';

import map1778 from '@assets/macro_verstedelijking_h3_1778_1782822902181.png';
import map1873 from '@assets/macro_verstedelijking_h3_1873_1782822902180.png';
import map1969 from '@assets/macro_verstedelijking_h3_1969_1782822902180.png';
import map2026 from '@assets/macro_verstedelijking_h3_2026_1782822902180.png';

const ERAS = [
  { year: '1778', label: 'Pre-Industrial', src: map1778, hasInfra: false },
  { year: '1873', label: 'Industrial', src: map1873, hasInfra: false },
  { year: '1969', label: 'Post-War', src: map1969, hasInfra: true },
  { year: '2026', label: 'Diffused', src: map2026, hasInfra: true },
] as const;

// ─── SVG path definitions ─────────────────────────────────────────────────────
// viewBox: 0 0 1000 770  (matches image proportions, Brussels ≈ 395,360)
// Black paths = highways  |  Red paths = rail corridors

/** Main arterial highways present by 1969 */
const HIGHWAYS_1969 = [
  // R0 — Brussels ring road
  'M 495,360 C 495,272 452,212 395,212 C 338,212 295,272 295,360 C 295,448 338,508 395,508 C 452,508 495,448 495,360',
  // E40W — Brussels → Ghent (west)
  'M 395,360 C 330,345 258,328 175,315 C 100,303 45,295 -10,288',
  // E40E / A3 — Brussels → Leuven → east
  'M 395,360 C 480,330 548,308 615,285 C 720,258 850,242 1010,228',
  // E19N — Brussels → Antwerp (north)
  'M 395,360 C 405,288 418,215 428,145 C 436,88 440,38 445,-10',
  // E19S — Brussels → Charleroi (south)
  'M 395,360 C 382,440 368,522 352,600 C 338,660 325,715 315,775',
  // E411 — Brussels → Namur → Luxembourg (SE)
  'M 395,360 C 472,408 562,468 655,535 C 748,598 855,660 960,730',
  // A8 — Brussels → Halle → SW
  'M 395,360 C 342,392 278,424 208,455 C 148,482 88,508 28,538',
  // A12 — Brussels → Mechelen → NE
  'M 395,360 C 442,304 494,252 548,200 C 592,158 645,118 708,78',
  // E25 — Leuven → Hasselt → NE radial
  'M 615,285 C 665,235 722,188 790,148 C 848,115 905,90 975,62',
  // Leuven SE connector
  'M 615,285 C 652,330 690,385 730,445 C 762,495 798,548 845,608',
];

/** Additional paths added / completed by 2026 */
const HIGHWAYS_2026_EXTRA = [
  // E314 — Leuven → Hasselt (more eastern extension)
  'M 790,148 C 850,118 920,92 1000,68',
  // A54 — Sambreville axis (Charleroi→Namur connector)
  'M 655,535 C 700,560 742,580 785,598',
  // R0 inner connector SE
  'M 475,460 C 530,480 580,495 635,505',
  // Secondary N-S axis west
  'M 180,315 C 165,380 152,450 140,528 C 130,590 118,645 105,710',
  // NW secondary axis
  'M 265,240 C 220,218 172,198 118,178 C 72,160 28,145 -10,130',
  // E40 continuation east of Leuven
  'M 615,285 C 695,268 788,250 895,235',
];

/** Rail corridors (present from 1969, same extent for 2026) */
const RAIL_1969 = [
  // Rail BXL → Leuven → Liège (L.36)
  'M 395,360 C 480,332 548,310 615,285 C 700,254 810,232 940,215',
  // Rail BXL → Ghent → Bruges (L.50)
  'M 395,360 C 325,342 248,326 162,312 C 95,300 42,292 -10,285',
  // Rail BXL → Antwerp (L.25)
  'M 395,360 C 408,290 420,218 432,148 C 442,90 446,42 450,-10',
  // Rail BXL → Charleroi (L.124)
  'M 395,360 C 380,445 364,530 345,615 C 330,680 318,730 308,780',
  // Rail BXL → Namur (L.161)
  'M 395,360 C 468,408 552,460 640,520 C 718,572 810,628 912,692',
  // Rail BXL → Luxembourg (L.162, branches at Namur)
  'M 640,520 C 710,560 790,608 880,665 C 945,710 990,742 1010,762',
  // Rail Leuven → Hasselt
  'M 615,285 C 670,248 730,212 800,180 C 856,154 910,132 972,108',
];

/** Extra rail added / densified by 2026 */
const RAIL_2026_EXTRA = [
  // High-speed extension east
  'M 940,215 C 980,205 1010,198 1040,192',
  // Suburban ring connector
  'M 450,-10 C 520,20 590,58 652,112 C 700,158 740,210 760,260',
];

// ─── Animation helpers ────────────────────────────────────────────────────────
const DRAW_DUR = 3.2; // seconds for each path to fully draw

// Total stagger time before dashed overlay fades in (after last rail path finishes drawing)
const RAIL_1969_REVEAL_END = 0.8 + RAIL_1969.length * 0.15 + DRAW_DUR;
const RAIL_2026_REVEAL_END = 1.2 + RAIL_2026_EXTRA.length * 0.15 + DRAW_DUR;

function pathStyle(idx: number, base: number, totalLength = 1600): React.CSSProperties {
  return {
    strokeDasharray: totalLength,
    strokeDashoffset: totalLength,
    animation: `drawLine ${DRAW_DUR}s cubic-bezier(0.4,0,0.2,1) ${base + idx * 0.12}s forwards`,
  };
}

/** Solid-path reveal animation — no dash pattern so dashoffset properly draws the path */
function railRevealStyle(idx: number, base: number): React.CSSProperties {
  return {
    strokeDasharray: 1400,
    strokeDashoffset: 1400,
    animation: `drawLine ${DRAW_DUR}s cubic-bezier(0.4,0,0.2,1) ${base + idx * 0.15}s forwards`,
  };
}

/** Dashed overlay — static, fades in after the reveal completes */
function railDashFadeStyle(revealEnd: number): React.CSSProperties {
  return {
    opacity: 0,
    animation: `fadeIn 0.3s ease-out ${revealEnd}s forwards`,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function UrbanHistoryMap() {
  const [activeEra, setActiveEra] = useState(0);
  const [animKey, setAnimKey] = useState(0); // bump to restart svg animation

  const goToEra = useCallback((idx: number) => {
    setActiveEra(idx);
    setAnimKey((k) => k + 1);
  }, []);

  const currentEra = ERAS[activeEra];
  const showInfra = currentEra.hasInfra;
  const show2026Extra = activeEra === 3;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-black select-none" data-testid="urban-history-map">
      {/* ── Era label ── */}
      <div className="absolute top-4 left-5 z-20 flex flex-col gap-0.5 pointer-events-none">
        <span
          className="uppercase text-white/50"
          style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.14em' }}
        >
          BE.MACRO — Diffused Urban Condition
        </span>
        <span
          className="text-white/80"
          style={{ fontFamily: "'ABC ROM'", fontWeight: 500, fontSize: '1.1rem', lineHeight: 1 }}
        >
          {currentEra.year}
        </span>
        <span
          className="uppercase text-white/40"
          style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.55rem', letterSpacing: '0.12em' }}
        >
          {currentEra.label}
        </span>
      </div>

      {/* ── Legend (visible when infra active) ── */}
      {showInfra && (
        <div
          className="absolute top-4 right-5 z-20 flex flex-col gap-1 pointer-events-none"
          style={{ opacity: showInfra ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-[2px] bg-black/70" />
            <span
              className="uppercase text-white/40"
              style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.5rem', letterSpacing: '0.1em' }}
            >
              Highway
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-[1.5px]" style={{ background: '#FF0000', opacity: 0.7 }} />
            <span
              className="uppercase text-white/40"
              style={{ fontFamily: "'JetBrains Mono'", fontSize: '0.5rem', letterSpacing: '0.1em' }}
            >
              Rail
            </span>
          </div>
        </div>
      )}

      {/* ── Map image layers (crossfade) ── */}
      <div className="absolute inset-0 z-0">
        {ERAS.map((era, i) => (
          <img
            key={era.year}
            src={era.src}
            alt={`Belgian urbanisation ${era.year}`}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              opacity: i === activeEra ? 1 : 0,
              transition: 'opacity 0.9s ease-in-out',
            }}
            draggable={false}
          />
        ))}
      </div>

      {/* ── SVG infrastructure overlay ── */}
      <svg
        key={animKey}
        viewBox="0 0 1000 770"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
        style={{ opacity: showInfra ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
        data-testid="infra-svg-overlay"
      >
        {/* Highways 1969 */}
        <g stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {HIGHWAYS_1969.map((d, i) => (
            <path key={`hw69-${i}`} d={d} style={pathStyle(i, 0)} />
          ))}
        </g>

        {/* Highway extras 2026 */}
        {show2026Extra && (
          <g stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {HIGHWAYS_2026_EXTRA.map((d, i) => (
              <path key={`hw26-${i}`} d={d} style={pathStyle(i, 0.4)} />
            ))}
          </g>
        )}

        {/* Rail 1969 — layer 1: solid reveal (no dash pattern, so dashoffset draws correctly) */}
        <g stroke="#CC0000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {RAIL_1969.map((d, i) => (
            <path key={`rail69-reveal-${i}`} d={d} style={railRevealStyle(i, 0.8)} />
          ))}
        </g>
        {/* Rail 1969 — layer 2: dashed overlay fades in after reveal completes */}
        <g
          stroke="#CC0000" strokeWidth="1.4" strokeLinecap="round"
          strokeDasharray="10 5" strokeLinejoin="round"
          style={railDashFadeStyle(RAIL_1969_REVEAL_END)}
        >
          {RAIL_1969.map((d, i) => (
            <path key={`rail69-dash-${i}`} d={d} />
          ))}
        </g>

        {/* Rail extras 2026 — layer 1: solid reveal */}
        {show2026Extra && (
          <g stroke="#CC0000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            {RAIL_2026_EXTRA.map((d, i) => (
              <path key={`rail26-reveal-${i}`} d={d} style={railRevealStyle(i, 1.2)} />
            ))}
          </g>
        )}
        {/* Rail extras 2026 — layer 2: dashed overlay */}
        {show2026Extra && (
          <g
            stroke="#CC0000" strokeWidth="1.4" strokeLinecap="round"
            strokeDasharray="10 5" strokeLinejoin="round"
            style={railDashFadeStyle(RAIL_2026_REVEAL_END)}
          >
            {RAIL_2026_EXTRA.map((d, i) => (
              <path key={`rail26-dash-${i}`} d={d} />
            ))}
          </g>
        )}

        {/* Brussels node */}
        {showInfra && (
          <g>
            <circle
              cx="395" cy="360" r="10"
              stroke="#111" strokeWidth="2" fill="white"
              style={{ strokeDasharray: 65, strokeDashoffset: 65, animation: 'drawLine 0.8s ease-out 0.3s forwards' }}
            />
            <circle cx="395" cy="360" r="3.5" fill="#111"
              style={{ opacity: 0, animation: 'fadeIn 0.4s ease-out 1s forwards' }}
            />
          </g>
        )}

        {/* Leuven node */}
        {showInfra && (
          <g>
            <circle
              cx="615" cy="285" r="7"
              stroke="#111" strokeWidth="1.8" fill="white"
              style={{ strokeDasharray: 45, strokeDashoffset: 45, animation: 'drawLine 0.8s ease-out 0.5s forwards' }}
            />
            <circle cx="615" cy="285" r="2.5" fill="#111"
              style={{ opacity: 0, animation: 'fadeIn 0.4s ease-out 1.2s forwards' }}
            />
          </g>
        )}

        {/* City labels */}
        {showInfra && (
          <g
            style={{ opacity: 0, animation: 'fadeIn 0.5s ease-out 1.8s forwards' }}
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            fill="#222"
            letterSpacing="0.08em"
          >
            <text x="410" y="353">BXL</text>
            <text x="630" y="278">LVN</text>
          </g>
        )}
      </svg>

      {/* ── Timeline stepper ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex border-t border-white/10">
        {ERAS.map((era, i) => {
          const isActive = i === activeEra;
          return (
            <button
              key={era.year}
              onClick={() => goToEra(i)}
              data-testid={`era-btn-${era.year}`}
              aria-pressed={isActive}
              aria-label={`Era ${era.year} – ${era.label}`}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors cursor-pointer relative"
              style={{ background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.5)' }}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
              )}
              <span
                className={isActive ? 'text-white' : 'text-white/40'}
                style={{ fontFamily: "'ABC ROM'", fontWeight: isActive ? 500 : 350, fontSize: '0.78rem', lineHeight: 1 }}
              >
                {era.year}
              </span>
              <span
                className={isActive ? 'text-white/60' : 'text-white/25'}
                style={{ fontFamily: "'ABC ROM'", fontWeight: 300, fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                {era.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
