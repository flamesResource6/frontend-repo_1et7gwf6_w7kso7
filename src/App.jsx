import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import DailyStats from './components/DailyStats'
import WeeklyChart from './components/WeeklyChart'
import FoodSearch from './components/FoodSearch'
import FoodDiary from './components/FoodDiary'
import WorkoutTracker from './components/WorkoutTracker'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl rounded-full" />
      </div>

      <Topbar />
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-4 md:gap-6">
        <Sidebar />

        <main className="py-4 md:py-6">
          {/* hero header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Welcome back, Alex</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Here’s your health snapshot and tools for today.</p>
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 transition-colors">
              Upgrade to Pro
            </button>
          </div>

          {/* grid sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="xl:col-span-1"><DailyStats /></div>
            <div className="xl:col-span-2"><WeeklyChart /></div>
            <div className="md:col-span-2 xl:col-span-2"><FoodSearch /></div>
            <div className="md:col-span-1 xl:col-span-1"><WorkoutTracker /></div>
            <div className="md:col-span-2 xl:col-span-3"><FoodDiary /></div>
          </div>

          {/* AI Suggestions placeholder */}
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white dark:from-white dark:to-slate-100 dark:text-slate-900 border border-slate-800/50 dark:border-slate-200/60">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm opacity-80">Coming soon</p>
                <h3 className="text-xl font-semibold">AI Meal & Snack Suggestions</h3>
                <p className="text-sm opacity-80">Personalized recommendations based on your goals and diary.</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white dark:text-slate-900 dark:bg-slate-900/10 dark:hover:bg-slate-900/15 border border-white/20 dark:border-slate-900/20">
                Notify me when ready
              </button>
            </div>
          </div>

          {/* mobile navbar */}
          <div className="lg:hidden sticky bottom-3 mt-6 z-20">
            <div className="mx-auto max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-2 flex items-center justify-around">
              <button className="px-3 py-2 rounded-xl text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-slate-900">Dashboard</button>
              <button className="px-3 py-2 rounded-xl text-sm">Search</button>
              <button className="px-3 py-2 rounded-xl text-sm">Workouts</button>
              <button className="px-3 py-2 rounded-xl text-sm">Profile</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
