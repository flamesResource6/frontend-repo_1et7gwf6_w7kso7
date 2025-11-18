import { Pencil, Trash2 } from "lucide-react";

const meals = ["breakfast", "lunch", "dinner", "snacks"];

export default function FoodDiary() {
  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-950/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Today</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Food Diary</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2 pr-3">Meal</th>
              <th className="py-2 pr-3">Food</th>
              <th className="py-2 pr-3">Qty</th>
              <th className="py-2 pr-3">Calories</th>
              <th className="py-2 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/10">
            {meals.map((m,i)=> (
              <tr key={m}>
                <td className="py-3 capitalize text-slate-700 dark:text-slate-300">{m}</td>
                <td className="py-3 text-slate-800 dark:text-slate-200">—</td>
                <td className="py-3 text-slate-800 dark:text-slate-200">—</td>
                <td className="py-3 font-medium text-slate-900 dark:text-white">0</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"><Pencil size={16}/></button>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
