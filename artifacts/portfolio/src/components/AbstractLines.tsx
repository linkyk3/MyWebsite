import { useRef, useEffect, useCallback } from 'react';

// ─── Static node grid ─────────────────────────────────────────────────────────
// Nodes are defined in a normalised [0,1] coordinate space and scaled at draw time.
const BASE_NODES: [number, number][] = [
  [0.04, 0.25], [0.04, 0.75],
  [0.16, 0.10], [0.16, 0.50], [0.16, 0.90],
  [0.28, 0.30], [0.28, 0.70],
  [0.40, 0.15], [0.40, 0.50], [0.40, 0.85],
  [0.52, 0.35], [0.52, 0.65],
  [0.64, 0.20], [0.64, 0.50], [0.64, 0.80],
  [0.76, 0.40], [0.76, 0.70],
  [0.88, 0.10], [0.88, 0.50], [0.88, 0.90],
  [1.00, 0.30], [1.00, 0.65],
];

// Pairs of node indices that are connected
const EDGES: [number, number][] = [
  [0,2],[0,3],[1,3],[1,4],
  [2,5],[3,5],[3,6],[4,6],
  [5,7],[5,8],[6,8],[6,9],
  [7,10],[8,10],[8,11],[9,11],
  [10,12],[10,13],[11,13],[11,14],
  [12,15],[13,15],[13,16],[14,16],
  [15,17],[15,18],[16,18],[16,19],
  [17,20],[18,20],[18,21],[19,21],
  // a few long diagonals for variety
  [0,5],[1,6],[4,9],[9,14],[14,19],[7,12],[12,17],
];

const INFLUENCE_RADIUS = 0.35; // normalised units
const MAX_BEND = 0.06;          // how far the control point shifts (normalised)

export default function AbstractLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<{ nx: number; ny: number } | null>(null);
  const raf = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Scale node positions into canvas pixels
    const nodes = BASE_NODES.map(([nx, ny]) => [nx * W, ny * H] as [number, number]);

    ctx.clearRect(0, 0, W, H);

    const mx = mouse.current ? mouse.current.nx * W : -9999;
    const my = mouse.current ? mouse.current.ny * H : -9999;

    EDGES.forEach(([ai, bi]) => {
      const [ax, ay] = nodes[ai];
      const [bx, by] = nodes[bi];

      // Midpoint of edge
      const midX = (ax + bx) / 2;
      const midY = (ay + by) / 2;

      // Distance from mouse to edge midpoint (normalised)
      const dx = (midX - mx) / W;
      const dy = (midY - my) / H;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Bend the line toward the mouse when close
      let cpx = midX;
      let cpy = midY;

      if (dist < INFLUENCE_RADIUS) {
        const t = 1 - dist / INFLUENCE_RADIUS; // 0→1 as mouse approaches
        // Pull control point toward mouse
        cpx = midX + (mx - midX) * t * MAX_BEND * (W / Math.max(W, H));
        cpy = midY + (my - midY) * t * MAX_BEND * (H / Math.max(W, H));

        // Colour: lerp toward accent (#FF0000) at close range
        const intensity = Math.pow(t, 2);
        const r = Math.round(intensity * 255);
        const g = 0;
        const b = 0;
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 + intensity * 0.55})`;
        ctx.lineWidth = 0.5 + intensity * 0.8;
      } else {
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 0.5;
      }

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(cpx, cpy, bx, by);
      ctx.stroke();
    });

    // Nodes
    nodes.forEach(([x, y]) => {
      const dx = (x - mx) / W;
      const dy = (y - my) / H;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const near = dist < INFLUENCE_RADIUS * 0.5;

      ctx.beginPath();
      ctx.arc(x, y, near ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = near ? '#FF0000' : 'rgba(0,0,0,0.25)';
      ctx.fill();
    });

    raf.current = requestAnimationFrame(draw);
  }, []);

  // Resize observer — keep canvas pixel dimensions in sync
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = Math.round(width * devicePixelRatio);
        canvas.height = Math.round(height * devicePixelRatio);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    });
    ro.observe(canvas);

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouse.current = null;
  }, []);

  return (
    <div
      className="w-full h-full bg-background relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
