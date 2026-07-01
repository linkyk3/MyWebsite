import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Sub-pages riding the orb, sized by importance
───────────────────────────────────────────────*/
interface Page { label: string; href: string; s: number; theta: number; phi: number; }
const PAGES: Page[] = [
  { label: 'Selected Works', href: '/projects',  s: 0.18, theta: 0.50, phi: 0.20 },
  { label: 'Music',          href: '/creations', s: 0.11, theta: 1.10, phi: 2.10 },
  { label: 'Blog',           href: '/creations', s: 0.10, theta: 0.75, phi: 3.60 },
  { label: 'Visualizations', href: '/creations', s: 0.09, theta: 1.45, phi: 1.05 },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────*/
function spherePoint(R: number, theta: number, phi: number): [number, number, number] {
  return [
    R * Math.sin(theta) * Math.cos(phi),
    -R * Math.cos(theta),          // Y-up
    R * Math.sin(theta) * Math.sin(phi),
  ];
}

// Rotate around Y then tilt around X
function applyRotation(x: number, y: number, z: number, yaw: number, tilt: number) {
  // Y rotation
  const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const ry = y;
  const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  // X tilt
  const ry2 = ry * Math.cos(tilt) - rz * Math.sin(tilt);
  const rz2 = ry * Math.sin(tilt) + rz * Math.cos(tilt);
  return [rx, ry2, rz2] as [number, number, number];
}

function project(rx: number, ry: number, rz: number, cx: number, cy: number, focal: number) {
  const s = focal / (focal + rz);
  return { sx: cx + rx * s, sy: cy + ry * s, rz, scale: s };
}

/* ─────────────────────────────────────────────
   Main render
───────────────────────────────────────────────*/
function render(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  yaw: number,
  hitBoxes: { x: number; y: number; r: number; href: string }[]
) {
  ctx.clearRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) * 0.29;
  const TILT = 0.32;
  const FOCAL = Math.max(W, H) * 1.4;
  const FG = '#ffffff';

  function proj(x: number, y: number, z: number) {
    const [rx, ry, rz] = applyRotation(x, y, z, yaw, TILT);
    return project(rx, ry, rz, cx, cy, FOCAL);
  }

  /* ── great circles ── */
  function greatCircle(
    nx: number, ny: number, nz: number,
    solidAlpha: number, dashAlpha: number,
    lw = 0.7
  ) {
    const STEPS = 160;
    // Basis perpendicular to normal
    let ux: number, uy: number, uz: number;
    if (Math.abs(nx) < 0.9) { ux = 0;   uy = nz;  uz = -ny; }
    else                      { ux = -nz; uy = 0;   uz = nx;  }
    const uL = Math.hypot(ux, uy, uz) || 1;
    ux /= uL; uy /= uL; uz /= uL;
    const vx = ny * uz - nz * uy;
    const vy = nz * ux - nx * uz;
    const vz = nx * uy - ny * ux;

    ctx.lineWidth = lw;
    ctx.strokeStyle = FG;

    for (let i = 0; i < STEPS; i++) {
      const t0 = (i / STEPS) * Math.PI * 2;
      const t1 = ((i + 1) / STEPS) * Math.PI * 2;
      const p0x = R * (Math.cos(t0) * ux + Math.sin(t0) * vx);
      const p0y = R * (Math.cos(t0) * uy + Math.sin(t0) * vy);
      const p0z = R * (Math.cos(t0) * uz + Math.sin(t0) * vz);
      const p1x = R * (Math.cos(t1) * ux + Math.sin(t1) * vx);
      const p1y = R * (Math.cos(t1) * uy + Math.sin(t1) * vy);
      const p1z = R * (Math.cos(t1) * uz + Math.sin(t1) * vz);
      const a0 = proj(p0x, p0y, p0z);
      const a1 = proj(p1x, p1y, p1z);
      const front = (a0.rz + a1.rz) < 0;

      ctx.globalAlpha = front ? solidAlpha : dashAlpha;
      ctx.setLineDash(front ? [] : [3, 4]);
      ctx.beginPath();
      ctx.moveTo(a0.sx, a0.sy);
      ctx.lineTo(a1.sx, a1.sy);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }

  // Orb lattice — equator + two meridians + two diagonals (matches reference)
  greatCircle(0, 1, 0, 0.85, 0.18, 0.8);  // equator
  greatCircle(1, 0, 0, 0.75, 0.15, 0.75); // meridian (pitch)
  greatCircle(0, 0, 1, 0.70, 0.14, 0.70); // meridian (roll)
  greatCircle(0.707, 0, 0.707, 0.40, 0.08, 0.55); // diagonal
  greatCircle(0, 0.707, 0.707, 0.40, 0.08, 0.55); // diagonal

  /* ── intersection tick marks ── */
  ctx.strokeStyle = FG;
  ctx.lineWidth = 0.8;
  const TICK = R * 0.06;
  const tickPts: [number, number, number][] = [
    [R, 0, 0], [-R, 0, 0],
    [0, R, 0], [0, -R, 0],
    [0, 0, R], [0, 0, -R],
    [R * 0.707, 0, R * 0.707], [-R * 0.707, 0, -R * 0.707],
    [-R * 0.707, 0, R * 0.707], [R * 0.707, 0, -R * 0.707],
  ];
  tickPts.forEach(([x, y, z]) => {
    const p = proj(x, y, z);
    const front = p.rz < 0;
    ctx.globalAlpha = front ? 0.75 : 0.15;
    ctx.setLineDash(front ? [] : [2, 2]);
    ctx.beginPath();
    ctx.moveTo(p.sx - TICK, p.sy);
    ctx.lineTo(p.sx + TICK, p.sy);
    ctx.moveTo(p.sx, p.sy - TICK);
    ctx.lineTo(p.sx, p.sy + TICK);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  /* ── axes extending beyond orb ── */
  const AX = R * 1.55;
  const axes: [[number,number,number],[number,number,number]][] = [
    [[-AX,0,0],[AX,0,0]],
    [[0,-AX,0],[0,AX,0]],
    [[0,0,-AX],[0,0,AX]],
  ];
  ctx.lineWidth = 0.65;
  ctx.strokeStyle = FG;
  axes.forEach(([a, b]) => {
    const pa = proj(...a), pb = proj(...b);
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(pa.sx, pa.sy);
    ctx.lineTo(pb.sx, pb.sy);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  /* ── cubes ── */
  hitBoxes.length = 0; // reset each frame

  PAGES.forEach(({ label, href, s: sRel, theta, phi }) => {
    const s = R * sRel;
    const [ox, oy, oz] = spherePoint(R, theta, phi);

    // Local frame: n = outward normal, t1 = longitude tangent, t2 = latitude tangent
    const nLen = R;
    const nx = ox / nLen, ny = oy / nLen, nz = oz / nLen;
    // t1: along longitude (dθ direction)
    const ct = Math.cos(theta), st = Math.sin(theta);
    const cp = Math.cos(phi), sp = Math.sin(phi);
    const t1x = ct * cp, t1y = st, t1z = ct * sp; // actually d/dtheta of sphere point / |...|
    // t2: along azimuth
    const t2x = -sp, t2y = 0, t2z = cp;

    // Cube center sits just above sphere surface
    const offset = s * 0.5;
    const ccx = ox + nx * offset;
    const ccy = oy + ny * offset;
    const ccz = oz + nz * offset;

    // 8 corners in world space
    const corners: [number, number, number][] = [];
    for (const da of [-s, s]) for (const db of [-s, s]) for (const dc of [-s, s]) {
      corners.push([
        ccx + da * t1x + db * t2x + dc * nx,
        ccy + da * t1y + db * t2y + dc * ny,
        ccz + da * t1z + db * t2z + dc * nz,
      ]);
    }

    // 12 edges (index pairs)
    const EDGES = [
      [0,1],[2,3],[4,5],[6,7], // along t2
      [0,2],[1,3],[4,6],[5,7], // along t1
      [0,4],[1,5],[2,6],[3,7], // along n
    ];

    const pcorners = corners.map(([x, y, z]) => proj(x, y, z));
    const centerP = proj(ccx, ccy, ccz);
    const isFront = centerP.rz < 0;

    ctx.strokeStyle = FG;
    ctx.lineWidth = isFront ? 1.1 : 0.5;

    EDGES.forEach(([ai, bi]) => {
      const pa = pcorners[ai], pb = pcorners[bi];
      const edgeFront = (pa.rz + pb.rz) < 0;
      ctx.globalAlpha = edgeFront ? 0.92 : 0.18;
      ctx.setLineDash(edgeFront ? [] : [2, 3]);
      ctx.beginPath();
      ctx.moveTo(pa.sx, pa.sy);
      ctx.lineTo(pb.sx, pb.sy);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Leader dot at cube face center (closest corner cluster)
    const frontCorners = pcorners.filter(p => p.rz < 0);
    const dotX = frontCorners.reduce((a, p) => a + p.sx, 0) / (frontCorners.length || 1);
    const dotY = frontCorners.reduce((a, p) => a + p.sy, 0) / (frontCorners.length || 1);

    // Label — font size proportional to cube size, capped
    const fontSize = Math.round(Math.max(10, Math.min(15, s * 0.38 + 9)));
    ctx.font = `300 ${fontSize}px "ABC ROM", "Arial", sans-serif`;
    ctx.textAlign = 'left';

    const labelX = centerP.sx + s * centerP.scale * 1.1 + 6;
    const labelY = centerP.sy;

    ctx.globalAlpha = isFront ? 0.88 : 0.12;
    ctx.fillStyle = FG;
    // keep label inside canvas width
    if (labelX < W - 4) {
      ctx.fillText(label, labelX, labelY + fontSize * 0.35);
    }

    // Hit box for click detection
    const tw = ctx.measureText(label).width;
    hitBoxes.push({ x: labelX + tw / 2, y: labelY, r: Math.max(s * centerP.scale, 20), href });

    ctx.globalAlpha = 1;
  });
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────────*/
export default function OrbScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize to container
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      const w = p.clientWidth, h = p.clientHeight;
      if (w > 0 && h > 0) { canvas.width = w; canvas.height = h; }
    };
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    let animId: number;
    const startMs = Date.now();
    let lastMs = startMs;
    let yaw = 0;
    const hitBoxes: { x: number; y: number; r: number; href: string }[] = [];

    const MAX_SPD = 2.6;   // rad/s initial
    const MIN_SPD = 0.10;  // rad/s idle hover
    const DECAY  = 1800;   // ms

    function frame() {
      try {
        const now = Date.now();
        const dt = Math.min((now - lastMs) / 1000, 0.1); // cap dt
        lastMs = now;
        const elapsed = now - startMs;
        const spd = MIN_SPD + (MAX_SPD - MIN_SPD) * Math.exp(-elapsed / DECAY);
        yaw += spd * dt;
        if (canvas.width > 0 && canvas.height > 0) {
          render(ctx, canvas.width, canvas.height, yaw, hitBoxes);
        }
      } catch (_) { /* ignore per-frame errors */ }
      animId = requestAnimationFrame(frame);
    }
    frame();

    // Click → navigate
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const hb of hitBoxes) {
        const dx = mx - hb.x, dy = my - hb.y;
        if (Math.sqrt(dx * dx + dy * dy) < hb.r) {
          window.location.href = hb.href;
          break;
        }
      }
    };
    canvas.addEventListener('click', onClick);

    // Cursor
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const hit = hitBoxes.some(hb => Math.hypot(mx - hb.x, my - hb.y) < hb.r);
      canvas.style.cursor = hit ? 'pointer' : 'default';
    };
    canvas.addEventListener('mousemove', onMove);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="orb-scene"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
