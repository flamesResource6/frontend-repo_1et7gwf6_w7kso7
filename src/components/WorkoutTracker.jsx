import { useState } from "react";
import { Activity, Dumbbell, Bike, FlameKindling, Play } from "lucide-react";

const exercises = [
  { key: 'running', label: 'Running', icon: Activity, color: 'from-rose-400 to-pink-500' },
  { key: 'gym', label: 'Gym', icon: Dumbbell, color: 'from-indigo-400 to-violet-500' },
  { key: 'cycling', label: 'Cycling', icon: Bike, color: 'from-emerald-400 to-teal-500' },
];

export default function WorkoutTracker(){
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(exercises[0]);

  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Today</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Workout Tracker</h3>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {exercises.map(ex => (
          <button key={ex.key} onClick={()=>{setSelected(ex); setOpen(true);}} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br hover:scale-[1.01] transition-all text-left from-white to-slate-50 dark:from-white/5 dark:to-white/0">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ex.color} text-white flex items-center justify-center mb-3`}>
              <ex.icon size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{ex.label}</p>
            <p className="text-xs text-slate-500">Tap to log</p>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4" onClick={()=>setOpen(false)}>
          <div className="w-full max-w-sm p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.color} text-white flex items-center justify-center`}>
                <selected.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Log {selected.label}</p>
                <p className="text-xs text-slate-500">Duration & calories</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Duration (min)</label>
                <input type="number" className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-white/5 text-sm outline-none" placeholder="30" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Calories</label>
                <input type="number" className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-white/5 text-sm outline-none" placeholder="250" />
              </div>
            </div>
            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 transition-colors">
              <Play size={16}/> Save workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
