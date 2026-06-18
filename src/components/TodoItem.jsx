import { useEffect, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { getDueDateStatus, getPriorityMeta, PRIORITY_OPTIONS } from '../interfaces/todo'

const DUE_DATE_LABELS = {
  overdue: { text: 'Overdue', className: 'bg-red-950/60 text-red-400 border border-red-800/40' },
  today: { text: 'Today', className: 'bg-amber-950/60 text-amber-400 border border-amber-800/40' },
  upcoming: { text: '', className: 'bg-anthracite-700/60 text-slate-400 border border-anthracite-600/40' },
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const priorityMeta = getPriorityMeta(todo.priority)
  const dueStatus = getDueDateStatus(todo.dueDate, todo.completed)

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(todo.title)
      setEditDescription(todo.description)
      setEditPriority(todo.priority)
      setEditDueDate(todo.dueDate || '')
    }
  }, [todo, isEditing])

  const handleSave = () => {
    if (!editTitle.trim()) return
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      dueDate: editDueDate || null,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate || '')
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleCancel()
  }

  if (isEditing) {
    return (
      <li
        className="bg-accent-950/30 border border-accent-700/40 rounded-xl p-4 shadow-glow-sm animate-slide-up"
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-3 rounded-full bg-accent-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">Editing</span>
        </div>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="input-field mb-2"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows={2}
          className="input-field resize-none mb-3"
        />
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="input-field py-2 text-sm flex-1"
          >
            {PRIORITY_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="input-field py-2 text-sm flex-1"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn-primary px-4 py-2 text-sm">
            Save
          </button>
          <button onClick={handleCancel} className="btn-ghost">
            Cancel
          </button>
        </div>
      </li>
    )
  }

  return (
    <>
      <li
        className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 animate-slide-up ${
          todo.completed
            ? 'bg-anthracite-900/40 border-anthracite-700/40 opacity-75'
            : dueStatus === 'overdue'
              ? 'bg-red-950/20 border-red-800/40 hover:border-red-700/50 hover:shadow-glow-sm'
              : 'bg-anthracite-850/60 border-anthracite-600/40 hover:border-accent-700/40 hover:shadow-glow-sm'
        }`}
      >
        <button
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-accent-600 border-accent-500 text-white shadow-glow-sm'
              : 'border-anthracite-500 hover:border-accent-500 hover:bg-accent-950/40'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`font-medium ${
                todo.completed ? 'line-through text-slate-500' : 'text-slate-100'
              }`}
            >
              {todo.title}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityMeta.badge}`}>
              {priorityMeta.label}
            </span>
          </div>
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.completed ? 'text-slate-600' : 'text-slate-400'}`}>
              {todo.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {todo.dueDate && (
              <span
                className={`px-2 py-0.5 rounded-full font-medium ${
                  dueStatus ? DUE_DATE_LABELS[dueStatus].className : 'bg-anthracite-700/60 text-slate-500 border border-anthracite-600/40'
                }`}
              >
                {dueStatus === 'overdue' || dueStatus === 'today'
                  ? DUE_DATE_LABELS[dueStatus].text
                  : new Date(todo.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                    })}
              </span>
            )}
            <span className="text-slate-600">
              {new Date(todo.updatedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-accent-400 hover:bg-accent-950/40 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete task"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        onConfirm={() => {
          onDelete(todo.id)
          setShowDeleteConfirm(false)
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  )
}
