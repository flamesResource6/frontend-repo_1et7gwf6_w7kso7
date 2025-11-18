import { Home, Search, Dumbbell, Target, User, Crown } from "lucide-react";

const NavItem = ({ icon: Icon, label, active }) => (
  <div className={`group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all hover:bg-slate-900/5 dark:hover:bg-white/5 ${active ? 'bg-slate-900/5 dark:bg-white/5' : ''}`}>
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
      <Icon size={18} />
    </div>
    <span className={`text-sm font-medium ${active ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{label}</span>
  </div>
);

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 p-4 gap-3 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl">
      <div className="flex items-center gap-2 px-2 py-1 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20" />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">FitTrack</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">Nutrition & Fitness</p>
        </div>
      </div>

      <NavItem icon={Home} label="Dashboard" active />
      <NavItem icon={Search} label="Food Search" />
      <NavItem icon={Dumbbell} label="Workouts" />
      <NavItem icon={Target} label="Goals" />
      <div className="mt-auto" />
      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200/60 dark:border-amber-500/20">
        <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-300">
          <Crown size={18} />
          <span className="text-sm font-semibold">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-amber-900/70 dark:text-amber-200/80">Unlock AI meal plans, advanced charts, and more.</p>
        <button className="mt-3 w-full text-sm font-semibold py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-colors">Upgrade</button>
      </div>

      <div className="flex items-center gap-3 px-2 py-2 mt-2">
        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Alex Morgan</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">View Profile</p>
        </div>
        <User size={18} className="text-slate-500" />
      </div>
    </aside>
  );
}
