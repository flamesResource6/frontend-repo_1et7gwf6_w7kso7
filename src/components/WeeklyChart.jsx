import { useEffect, useRef } from "react";

// Premium animated chart using Canvas for smoothness
export default function WeeklyChart({ data = [1800, 2000, 1750, 2100, 1950, 2200, 1850], macros = [
  { c: 180, p: 120, f: 60 },
  { c: 200, p: 130, f: 70 },
  { c: 160, p: 110, f: 55 },
  { c: 210, p: 140, f: 65 },
  { c: 190, p: 125, f: 70 },
  { c: 230, p: 150, f: 80 },
  { c: 170, p: 115, f: 60 },
], labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }) {
  const canvasRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padding = { l: 36, r: 16, t: 16, b: 28 };
    const chartW = width - padding.l - padding.r;
    const chartH = height - padding.t - padding.b;
    const maxVal = Math.max(...data) * 1.1;

    // gradient fill
    const grad = ctx.createLinearGradient(0, padding.t, 0, height - padding.b);
    grad.addColorStop(0, 'rgba(99,102,241,0.35)');
    grad.addColorStop(1, 'rgba(99,102,241,0.05)');

    // draw axes
    ctx.clearRect(0,0,width,height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(148,163,184,0.4)';
    ctx.beginPath();
    ctx.moveTo(padding.l, height - padding.b);
    ctx.lineTo(width - padding.r, height - padding.b);
    ctx.stroke();

    // bars animation
    let progress = 0; // 0..1
    const bars = data.map((v, i) => ({
      x: padding.l + (i + 0.5) * (chartW / data.length),
      y: padding.t + (1 - v/maxVal) * chartH,
      v
    }));

    function draw() {
      ctx.clearRect(0,0,width,height);
      // axis
      ctx.strokeStyle = 'rgba(148,163,184,0.4)';
      ctx.beginPath();
      ctx.moveTo(padding.l, height - padding.b);
      ctx.lineTo(width - padding.r, height - padding.b);
      ctx.stroke();

      const bw = Math.min(42, chartW / data.length - 18);

      bars.forEach((b,i) => {
        const h = (height - padding.b - b.y) * progress;
        const x = b.x - bw/2;
        const y = height - padding.b - h;
        // shadow
        ctx.fillStyle = 'rgba(99,102,241,0.15)';
        ctx.fillRect(x+1, y+2, bw, h);
        // bar
        const g = ctx.createLinearGradient(0, y, 0, height - padding.b);
        g.addColorStop(0, '#818cf8');
        g.addColorStop(1, '#a78bfa');
        ctx.fillStyle = g;
        ctx.beginPath();
        const radius = 10;
        const r = Math.min(radius, h);
        ctx.moveTo(x, y+r);
        ctx.arcTo(x, y, x+r, y, r);
        ctx.lineTo(x+bw-r, y);
        ctx.arcTo(x+bw, y, x+bw, y+r, r);
        ctx.lineTo(x+bw, y+h);
        ctx.lineTo(x, y+h);
        ctx.closePath();
        ctx.fill();

        // label
        ctx.fillStyle = 'rgba(30,41,59,0.8)';
        ctx.font = '12px Inter, ui-sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], b.x, height - 8);
      });

      progress += (1 - progress) * 0.08;
      if (progress < 0.999) requestAnimationFrame(draw);
    }

    draw();

    // hover tooltip
    function onMove(e){
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left);
      const my = (e.clientY - rect.top);
      const bw = Math.min(42, chartW / data.length - 18);
      const items = data.map((v,i)=>{
        const x = padding.l + (i + 0.5) * (chartW / data.length) - bw/2;
        const y = padding.t + (1 - v/maxVal) * chartH;
        const h = (height - padding.b - y);
        return {x,y,h,i};
      });
      let hovered = null;
      for(const it of items){
        if (mx >= it.x && mx <= it.x + bw && my >= height - padding.b - it.h && my <= height - padding.b){ hovered = it; break; }
      }
      const tip = tooltipRef.current;
      if (hovered){
        const m = macros[hovered.i];
        tip.style.opacity = 1;
        tip.style.transform = `translate(${mx+12}px, ${my-12}px)`;
        tip.innerHTML = `<div class='px-3 py-2 rounded-xl border border-slate-200 bg-white shadow-lg text-xs font-medium'>${labels[hovered.i]} • ${data[hovered.i]} kcal<br/><span class='text-slate-500 text-[11px]'>C ${m.c}g • P ${m.p}g • F ${m.f}g</span></div>`;
      } else {
        tip.style.opacity = 0;
      }
    }
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', () => { tooltipRef.current.style.opacity = 0; });
    return () => {
      canvas.removeEventListener('mousemove', onMove);
    }
  }, [data, macros]);

  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">This week</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Weekly Analytics</h3>
        </div>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-56"/>
        <div ref={tooltipRef} className="pointer-events-none absolute top-0 left-0 transition-opacity duration-150 opacity-0" />
      </div>
    </div>
  );
}
