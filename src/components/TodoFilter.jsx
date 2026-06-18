import { SORT_OPTIONS } from '../interfaces/todo'

export default function TodoFilter({
  filter,
  sort,
  search,
  stats,
  allCompleted,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onToggleAll,
  onClearCompleted,
}) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="space-y-3 mb-4">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="input-field pl-10 py-2.5 text-sm"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex rounded-xl bg-anthracite-900/80 p-1 border border-anthracite-600/40">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === key
                  ? 'bg-accent-700/80 text-white shadow-glow-sm border border-accent-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-anthracite-700/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field py-2 text-sm w-full sm:w-auto sm:min-w-[160px]"
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm pt-1 border-t border-anthracite-600/30">
        {stats.total > 0 && (
          <button
            onClick={onToggleAll}
            className="text-accent-400 hover:text-accent-300 font-medium px-3 py-2 rounded-lg hover:bg-accent-950/40 transition-colors"
          >
            {allCompleted ? 'Mark all as active' : 'Complete all'}
          </button>
        )}
        {stats.overdue > 0 && (
          <span className="text-red-400 font-medium px-3 py-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {stats.overdue} overdue
          </span>
        )}
        {stats.completed > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-red-400/90 hover:text-red-300 font-medium px-3 py-2 rounded-lg hover:bg-red-950/30 transition-colors ml-auto"
          >
            Clear completed ({stats.completed})
          </button>
        )}
      </div>
    </div>
  )
}
