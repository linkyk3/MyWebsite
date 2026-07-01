import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

// ── Types & math ──────────────────────────────────────────────────────────────
type V3 = [number, number, number];

const add  = ([ax,ay,az]: V3, [bx,by,bz]: V3): V3 => [ax+bx, ay+by, az+bz];
const ry   = ([x,y,z]: V3, a: number): V3 => { const c=Math.cos(a),s=Math.sin(a); return [x*c+z*s,y,-x*s+z*c]; };
const rx   = ([x,y,z]: V3, a: number): V3 => { const c=Math.cos(a),s=Math.sin(a); return [x,y*c-z*s,y*s+z*c]; };
const proj = ([x,y,z]: V3, fov: number, cx: number, cy: number): [number,number,number] => {
  const d = fov / (z + fov);
  return [x*d + cx, y*d + cy, d];
};

// ── Scene constants ───────────────────────────────────────────────────────────
const SPHERE_R  = 95;
const ORBIT_R   = 195;
const CUBE_H    = 20;      // half-size of each cube
const FOV       = 480;
const TILT_X    = 0.28;    // fixed world tilt (≈16°) so we see slightly from above
const BOB_AMP   = 10;
const ROT_SPEED = 0.18;    // rad/s

// ── Page entries ─────────────────────────────────────────────────────────────
const PAGES = [
  { label: 'Selected Works', href: '/projects',  angle: 0,              yBase: -28, bobPhase: 0                },
  { label: 'Blog',           href: '/creations', angle: Math.PI * 0.5,  yBase:  22, bobPhase: Math.PI * 0.5   },
  { label: 'Music',          href: '/creations', angle: Math.PI,        yBase: -38, bobPhase: Math.PI          },
  { label: 'Visualizations', href: '/creations', angle: Math.PI * 1.5,  yBase:  18, bobPhase: Math.PI * 1.5   },
];

// ── Cube geometry ─────────────────────────────────────────────────────────────
const h = CUBE_H;
const CUBE_VERTS: V3[] = [
  [-h,-h,-h],[h,-h,-h],[h,h,-h],[-h,h,-h],   // back face
  [-h,-h, h],[h,-h, h],[h,h, h],[-h,h, h],   // front face
];
const CUBE_EDGES = [
  [0,1],[1,2],[2,3],[3,0],   // back
  [4,5],[5,6],[6,7],[7,4],   // front
  [0,4],[1,5],[2,6],[3,7],   // sides
];

// ── Wireframe sphere ──────────────────────────────────────────────────────────
function buildSphere(r: number, lat: number, lon: number): [V3,V3][] {
  const lines: [V3,V3][] = [];
  // Latitude rings
  for (let i = 1; i < lat; i++) {
    const phi = (i / lat) * Math.PI;
    const y = r * Math.cos(phi), rr = r * Math.sin(phi);
    for (let j = 0; j < lon; j++) {
      const a0 = (j/lon)*Math.PI*2, a1 = ((j+1)/lon)*Math.PI*2;
      lines.push([[rr*Math.cos(a0),y,rr*Math.sin(a0)],[rr*Math.cos(a1),y,rr*Math.sin(a1)]]);
    }
  }
  // Longitude arcs
  for (let j = 0; j < lon; j++) {
    const phi = (j/lon)*Math.PI*2;
    for (let i = 0; i < lat; i++) {
      const a0=(i/lat)*Math.PI, a1=((i+1)/lat)*Math.PI;
      const p0: V3=[r*Math.sin(a0)*Math.cos(phi),r*Math.cos(a0),r*Math.sin(a0)*Math.sin(phi)];
      const p1: V3=[r*Math.sin(a1)*Math.cos(phi),r*Math.cos(a1),r*Math.sin(a1)*Math.sin(phi)];
      lines.push([p0,p1]);
    }
  }
  return lines;
}
const SPHERE_LINES = buildSphere(SPHERE_R, 10, 16);

// ── Axes ──────────────────────────────────────────────────────────────────────
const AX = SPHERE_R * 1.45;
const AXES = [
  { from: [-AX,0,0] as V3, to: [AX,0,0] as V3, label: 'X', lp: [AX+14,0,0] as V3 },
  { from: [0,-AX,0] as V3, to: [0,AX,0] as V3, label: 'Y', lp: [0,-AX-14,0] as V3 },
  { from: [0,0,-AX] as V3, to: [0,0,AX] as V3, label: 'Z', lp: [0,0,AX+14] as V3  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function SphereScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, navigate] = useLocation();
  const hoverIdx   = useRef(-1);
  const animId     = useRef(0);
  const cubeCenters = useRef<[number,number][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let t = 0;
    let dpr = 1;

    // ── Resize ──
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width  = rect.width  + 'px';
      canvas.style.height = rect.height + 'px';
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    // ── Helpers ──
    const fg = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-foreground').trim() || '#ffffff';

    // ── Draw loop ──
    const draw = () => {
      const W = canvas.width / dpr, H = canvas.height / dpr;
      const cx = W / 2, cy = H / 2;
      const col = fg();

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      // World transform: slow Y rotation + fixed X tilt
      const angleY = t * ROT_SPEED;
      const xform = (p: V3): V3 => rx(ry(p, angleY), TILT_X);

      // ── Sphere ──
      ctx.beginPath();
      for (const [a, b] of SPHERE_LINES) {
        const [ax,ay] = proj(xform(a), FOV, cx, cy);
        const [bx,by] = proj(xform(b), FOV, cx, cy);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
      }
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Axes ──
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 0.7;
      for (const ax of AXES) {
        const [x0,y0] = proj(xform(ax.from), FOV, cx, cy);
        const [x1,y1] = proj(xform(ax.to),   FOV, cx, cy);
        ctx.beginPath();
        ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
        ctx.strokeStyle = col;
        ctx.stroke();
        // arrowhead
        const dx = x1-x0, dy = y1-y0, len = Math.hypot(dx,dy);
        if (len > 0) {
          const ux = dx/len, uy = dy/len;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - ux*6 + uy*3, y1 - uy*6 - ux*3);
          ctx.lineTo(x1 - ux*6 - uy*3, y1 - uy*6 + ux*3);
          ctx.closePath();
          ctx.fillStyle = col;
          ctx.fill();
        }
        // label
        const [lx,ly] = proj(xform(ax.lp), FOV, cx, cy);
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ax.label, lx, ly);
      }

      // ── Cubes ──
      ctx.globalAlpha = 1;
      const cubeData = PAGES.map((pg, i) => {
        const bob = Math.sin(t * 0.9 + pg.bobPhase) * BOB_AMP;
        const localC: V3 = [
          ORBIT_R * Math.cos(pg.angle),
          pg.yBase + bob,
          ORBIT_R * Math.sin(pg.angle),
        ];
        const worldC = xform(localC);
        const [sx, sy] = proj(worldC, FOV, cx, cy);
        return { pg, i, localC, worldC, sx, sy };
      });

      // back-to-front
      cubeData.sort((a, b) => a.worldC[2] - b.worldC[2]);

      const centers: [number,number][] = [];
      for (const { pg, i, localC, worldC, sx, sy } of cubeData) {
        centers[i] = [sx, sy];
        const hovered = hoverIdx.current === i;
        const color = hovered ? '#FF0000' : col;

        // project each vertex: local vert → add to local center → world xform → project
        const pverts = CUBE_VERTS.map(v => proj(xform(add(v, localC)), FOV, cx, cy));

        // draw edges
        ctx.beginPath();
        for (const [vi, vj] of CUBE_EDGES) {
          ctx.moveTo(pverts[vi][0], pverts[vi][1]);
          ctx.lineTo(pverts[vj][0], pverts[vj][1]);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = hovered ? 1.3 : 0.9;
        ctx.globalAlpha = hovered ? 1 : 0.85;
        ctx.stroke();

        // label below cube
        const scale = proj(worldC, FOV, cx, cy)[2]; // perspective scale
        const labelY = sy + CUBE_H * scale * FOV * 0.018 + 10;
        ctx.fillStyle = color;
        ctx.globalAlpha = hovered ? 1 : 0.65;
        ctx.font = `${hovered ? '500' : '300'} 10.5px "ABC ROM", system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(pg.label, sx, labelY);
      }

      cubeCenters.current = centers;
      ctx.restore();
      t += 1 / 60;
      animId.current = requestAnimationFrame(draw);
    };

    animId.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId.current); ro.disconnect(); };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let closest = -1, bestD = 45;
    cubeCenters.current.forEach(([sx, sy], i) => {
      const d = Math.hypot(mx - sx, my - sy);
      if (d < bestD) { closest = i; bestD = d; }
    });
    hoverIdx.current = closest;
    canvasRef.current!.style.cursor = closest >= 0 ? 'pointer' : 'default';
  };

  const onClick = () => {
    const i = hoverIdx.current;
    if (i >= 0) navigate(PAGES[i].href);
  };

  return (
    <div style={{ flex: 1, minHeight: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { hoverIdx.current = -1; }}
        onClick={onClick}
      />
    </div>
  );
}
