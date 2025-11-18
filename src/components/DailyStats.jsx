import { useMemo } from "react";

function ProgressRing({ value, size = 120, stroke = 12, track = "#e5e7eb", color = "#10b981" }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.min(Math.max(value, 0), 100) / 100 * circumference;
  return (
    <svg width={size} height={size} className="drop-shadow-sm">
      <circle cx={size/2} cy={size/2} r={radius} stroke={track} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference - dash}`} transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  );
}

export default function DailyStats({ caloriesIn = 1650, caloriesOut = 450, goal = 2000, macros = { carbs: 180, protein: 120, fat: 60 } }) {
  const progress = useMemo(() => Math.round((caloriesIn/goal) * 100), [caloriesIn, goal]);
  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Today</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Daily Stats</h3>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">On track</div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <ProgressRing value={progress} />
          <div>
            <div className="text-3xl font-semibold text-slate-900 dark:text-white">{caloriesIn}<span className="text-base font-normal text-slate-500">/ {goal}</span></div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Calories eaten</p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{caloriesOut} kcal burned</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(macros).map(([k,v]) => (
            <div key={k} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{k}</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{v}g</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
