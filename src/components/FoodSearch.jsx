import { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

export default function FoodSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query) { setResults([]); return; }
      setLoading(true);
      try {
        // Demo: generate mock items locally (replace with backend later)
        const baseFoods = [
          { name: 'Chicken Breast', calories: 165, carbs: 0, protein: 31, fat: 3.6 },
          { name: 'Brown Rice', calories: 216, carbs: 45, protein: 5, fat: 1.8 },
          { name: 'Avocado', calories: 160, carbs: 9, protein: 2, fat: 15 },
          { name: 'Greek Yogurt', calories: 100, carbs: 4, protein: 17, fat: 0.7 },
          { name: 'Banana', calories: 105, carbs: 27, protein: 1.3, fat: 0.3 },
        ];
        const filtered = baseFoods.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
        // add some variation
        setResults(filtered.map((f,i)=> ({ id: i+1, ...f })));
      } finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search foods…" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-white/5 text-sm outline-none focus:ring-4 focus:ring-indigo-500/10" />
        </div>
        <button className="px-3 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">Add custom</button>
      </div>
      <div className="mt-4 divide-y divide-slate-100 dark:divide-white/10">
        {loading && <div className="p-3 text-sm text-slate-500">Searching…</div>}
        {!loading && results.map(r => (
          <div key={r.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{r.name}</p>
              <p className="text-xs text-slate-500">{r.calories} kcal • C {r.carbs}g • P {r.protein}g • F {r.fat}g</p>
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200"><Plus size={14}/> Add to diary</button>
          </div>
        ))}
        {!loading && query && results.length === 0 && (
          <div className="p-3 text-sm text-slate-500">No results</div>
        )}
      </div>
    </div>
  );
}
