/**
 * PerspectiveSVG — one-point perspective wireframe navigation
 * Vanishing point VP is fixed at (500, 295) in a 960×640 viewBox.
 * Each nav item is a 3D wireframe box; faces are determined by the
 * box's position relative to VP (right-of-VP → left face visible, etc.)
 */
import { useState } from 'react';
import { useLocation } from 'wouter';

const VP = { x: 500, y: 295 };

/** Interpolate (px,py) toward VP by fraction d (0=front, 1=VP) */
function toward(px: number, py: number, d: number) {
  return {
    x: +(px + d * (VP.x - px)).toFixed(1),
    y: +(py + d * (VP.y - py)).toFixed(1),
  };
}

/** Convert point array to SVG polygon points string */
function pts(...points: { x: number; y: number }[]): string {
  return points.map((p) => `${p.x},${p.y}`).join(' ');
}

// ─── 3D wireframe navigation box ─────────────────────────────────────────────

interface BoxProps {
  x1: number; y1: number;
  x2: number; y2: number;
  depth: number;
  label: string;
  labelSize?: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
  href: string;
}

function NavBox({
  x1, y1, x2, y2, depth,
  label, labelSize = 30,
  labelOffsetX = 12, labelOffsetY = 16,
  href,
}: BoxProps) {
  const [hovered, setHovered] = useState(false);
  const [, navigate] = useLocation();

  // Front-face corners
  const tl = { x: x1, y: y1 };
  const tr = { x: x2, y: y1 };
  const br = { x: x2, y: y2 };
  const bl = { x: x1, y: y2 };

  // Back-face corners (projected toward VP)
  const tlb = toward(x1, y1, depth);
  const trb = toward(x2, y1, depth);
  const brb = toward(x2, y2, depth);
  const blb = toward(x1, y2, depth);

  // Which faces are visible depends on position relative to VP
  const isRightOfVP = (x1 + x2) / 2 > VP.x;
  const isBelowVP   = (y1 + y2) / 2 > VP.y;

  // Visible side face (left if box is right of VP, else right)
  const sideFace = isRightOfVP
    ? [tl, bl, blb, tlb]   // left face
    : [tr, br, brb, trb];  // right face

  // Visible top/bottom face
  const hFace = isBelowVP
    ? [tl, tr, trb, tlb]   // top face visible (we look down)
    : [bl, br, brb, blb];  // bottom face visible (we look up)

  const fillOpacity = hovered ? 0.10 : 0;

  return (
    <g
      onClick={() => navigate(href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Front face */}
      <rect
        x={x1} y={y1} width={x2 - x1} height={y2 - y1}
        fill="currentColor" fillOpacity={fillOpacity}
        stroke="currentColor" strokeWidth="1"
      />
      {/* Side face */}
      <polygon
        points={pts(...sideFace)}
        fill="currentColor" fillOpacity={fillOpacity * 0.6}
        stroke="currentColor" strokeWidth="0.8"
      />
      {/* Top/bottom face */}
      <polygon
        points={pts(...hFace)}
        fill="currentColor" fillOpacity={fillOpacity * 0.4}
        stroke="currentColor" strokeWidth="0.8"
      />
      {/* Back face outline (faint) */}
      <polyline
        points={pts(tlb, trb, brb, blb, tlb)}
        fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.45"
      />
      {/* Nav label */}
      <text
        x={x1 + labelOffsetX}
        y={y2 - labelOffsetY}
        fill="currentColor"
        fontSize={labelSize}
        fontFamily="'ABC ROM', Arial, sans-serif"
        fontWeight="500"
        letterSpacing="-0.02em"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {label}
      </text>
    </g>
  );
}

// ─── ghost box (decorative, no label) ────────────────────────────────────────

function GhostBox({ x1, y1, x2, y2, depth, opacity = 0.35 }:
  { x1: number; y1: number; x2: number; y2: number; depth: number; opacity?: number }) {
  const tlb = toward(x1, y1, depth);
  const trb = toward(x2, y1, depth);
  const brb = toward(x2, y2, depth);
  const blb = toward(x1, y2, depth);
  return (
    <g strokeOpacity={opacity} stroke="currentColor" fill="none">
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} strokeWidth="0.7" />
      <line x1={x1} y1={y1} x2={tlb.x} y2={tlb.y} strokeWidth="0.5" />
      <line x1={x2} y1={y1} x2={trb.x} y2={trb.y} strokeWidth="0.5" />
      <line x1={x2} y1={y2} x2={brb.x} y2={brb.y} strokeWidth="0.5" />
      <line x1={x1} y1={y2} x2={blb.x} y2={blb.y} strokeWidth="0.5" />
      <polyline points={pts(tlb, trb, brb, blb, tlb)} strokeWidth="0.5" />
    </g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PerspectiveSVG() {
  const [, navigate] = useLocation();
  const [blogHovered, setBlogHovered] = useState(false);

  // Lines radiating from VP to the edges of the canvas
  const radials: [number, number][] = [
    // Four corners — always
    [0, 0], [960, 0], [0, 640], [960, 640],
    // Top edge subdivisions
    [160, 0], [330, 0], [660, 0], [810, 0],
    // Bottom edge subdivisions
    [160, 640], [330, 640], [660, 640], [810, 640],
    // Left & right edge mid-points
    [0, 120], [0, 470],
    [960, 120], [960, 470],
  ];

  // Nested rectangular frames centred near VP — creates the tunnel/corridor depth
  // [x1, y1, x2, y2]
  const frames: [number, number, number, number][] = [
    [72,  42,  892, 590],
    [170, 100, 800, 520],
    [270, 158, 712, 452],
    [355, 208, 630, 390],
    [422, 248, 572, 350],
  ];

  return (
    <svg
      viewBox="0 0 960 640"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ display: 'block', overflow: 'hidden' }}
      aria-label="Navigation"
    >
      {/* ── Perspective radial lines ── */}
      <g stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.28" fill="none">
        {radials.map(([ex, ey], i) => (
          <line key={i} x1={VP.x} y1={VP.y} x2={ex} y2={ey} />
        ))}
      </g>

      {/* ── Nested depth frames ── */}
      <g stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.38" fill="none">
        {frames.map(([x1, y1, x2, y2], i) => (
          <rect key={i} x={x1} y={y1} width={x2 - x1} height={y2 - y1} />
        ))}
      </g>

      {/* ── Decorative ghost boxes (left-center cluster, like reference) ── */}
      <GhostBox x1={120} y1={195} x2={310} y2={385} depth={0.38} opacity={0.28} />
      <GhostBox x1={150} y1={220} x2={280} y2={355} depth={0.42} opacity={0.20} />

      {/* ── Navigation boxes ── */}

      {/* PROJECTS — large platform, lower-left (≈ SOFTWARE in reference) */}
      <NavBox
        x1={18} y1={470} x2={440} y2={638}
        depth={0.28}
        label="PROJECTS"
        labelSize={38}
        href="/projects"
      />

      {/* MUSIC — centre floating box (≈ DESIGN in reference) */}
      <NavBox
        x1={455} y1={205} x2={745} y2={400}
        depth={0.36}
        label="MUSIC"
        labelSize={28}
        href="/creations"
      />

      {/* VISUALIZATIONS — upper-right box */}
      <NavBox
        x1={618} y1={45} x2={958} y2={272}
        depth={0.34}
        label="VISUALIZATIONS"
        labelSize={18}
        labelOffsetY={14}
        href="/creations"
      />

      {/* BLOG — floating text label, lower-right (≈ ART in reference) */}
      <text
        x={942} y={588}
        fill="currentColor"
        fillOpacity={blogHovered ? 1 : 0.82}
        fontSize="34"
        fontFamily="'ABC ROM', Arial, sans-serif"
        fontWeight="500"
        letterSpacing="-0.02em"
        textAnchor="end"
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => navigate('/creations')}
        onMouseEnter={() => setBlogHovered(true)}
        onMouseLeave={() => setBlogHovered(false)}
      >
        BLOG
      </text>
    </svg>
  );
}
