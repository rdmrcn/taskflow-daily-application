export default function Header({ stats }) {
  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <header className="text-center mb-8 animate-fade-in">
      <div className="relative inline-flex mb-5">
        <div className="absolute inset-0 rounded-2xl bg-accent-500/20 blur-xl animate-pulse-soft" />
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-600 to-accent-800 text-white text-2xl font-bold shadow-glow border border-accent-500/30">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        Task<span className="text-accent-400">Flow</span>
      </h1>
      <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-md mx-auto">
        Your daily task manager app
      </p>

      {stats.total > 0 && (
        <div className="mt-6 max-w-sm mx-auto">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Progress</span>
            <span className="font-semibold text-accent-400">{progress}%</span>
          </div>
          <div className="h-2.5 bg-anthracite-800 rounded-full overflow-hidden border border-anthracite-600/40">
            <div
              className="h-full bg-gradient-to-r from-accent-700 via-accent-500 to-accent-400 rounded-full transition-all duration-700 ease-out shadow-glow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap justify-center gap-2 sm:gap-3 text-sm">
        <StatBadge label="Total" value={stats.total} variant="default" />
        <StatBadge label="Active" value={stats.active} variant="accent" />
        <StatBadge label="Done" value={stats.completed} variant="success" />
        {stats.overdue > 0 && (
          <StatBadge label="Overdue" value={stats.overdue} variant="danger" />
        )}
      </div>
    </header>
  )
}

function StatBadge({ label, value, variant }) {
  const styles = {
    default: 'bg-anthracite-800/80 text-slate-300 border-anthracite-600/50',
    accent: 'bg-accent-950/60 text-accent-300 border-accent-800/40',
    success: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30',
    danger: 'bg-red-950/40 text-red-400 border-red-800/30',
  }

  return (
    <span className={`px-3.5 py-1.5 rounded-full font-medium text-xs border ${styles[variant]}`}>
      {label}: <strong className="font-semibold">{value}</strong>
    </span>
  )
}
