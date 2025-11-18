import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  return (
    <header className="sticky top-0 z-20 bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-inner" />
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">FitTrack</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setDark(d => !d)} className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500" />
        </div>
      </div>
    </header>
  );
}
