import { useState } from 'react'
import { PRIORITY_OPTIONS } from '../interfaces/todo'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title, description, priority, dueDate: dueDate || null })
    setTitle('')
    setDescription('')
    setPriority('medium')
    setDueDate('')
    setShowDetails(false)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel rounded-2xl p-4 sm:p-5 mb-6 animate-slide-up"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full bg-accent-500" />
        <span className="text-xs font-semibold uppercase tracking-wider text-accent-400/80">
          New Task
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="input-field flex-1"
          maxLength={120}
        />
        <button type="submit" disabled={!title.trim()} className="btn-primary shrink-0">
          Add Task
        </button>
      </div>

      {showDetails ? (
        <div className="mt-4 space-y-3 pt-3 border-t border-anthracite-600/40">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)..."
            rows={2}
            className="input-field resize-none"
            maxLength={300}
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input-field py-2.5 text-sm"
              >
                {PRIORITY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                min={today}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="mt-3 text-sm text-accent-400/90 hover:text-accent-300 font-medium flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add details (description, priority, due date)
        </button>
      )}
    </form>
  )
}
