/**
 * @typedef {Object} Todo
 * @property {string} id - Unique task identifier
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {boolean} completed - Completion status
 * @property {Priority} priority - Priority level
 * @property {string|null} dueDate - Due date (YYYY-MM-DD or null)
 * @property {string} createdAt - Creation date (ISO string)
 * @property {string} updatedAt - Last updated date (ISO string)
 */

/** @typedef {'low' | 'medium' | 'high'} Priority */

/** @typedef {'all' | 'active' | 'completed'} FilterType */

/** @typedef {'newest' | 'oldest' | 'priority' | 'dueDate'} SortType */

export const TODO_STORAGE_KEY = 'staj-todo-app-data'

export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', badge: 'bg-anthracite-700/80 text-slate-400 border border-anthracite-600/50', dot: 'bg-slate-500' },
  { value: 'medium', label: 'Medium', badge: 'bg-amber-950/60 text-amber-400 border border-amber-800/40', dot: 'bg-amber-500' },
  { value: 'high', label: 'High', badge: 'bg-red-950/60 text-red-400 border border-red-800/40', dot: 'bg-red-500' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'priority', label: 'Priority' },
  { value: 'dueDate', label: 'Due date' },
]

const PRIORITY_WEIGHT = { high: 3, medium: 2, low: 1 }

/**
 * @param {Priority} priority
 * @returns {typeof PRIORITY_OPTIONS[number]}
 */
export function getPriorityMeta(priority) {
  return PRIORITY_OPTIONS.find((p) => p.value === priority) ?? PRIORITY_OPTIONS[1]
}

/**
 * @param {Todo[]} todos
 * @param {SortType} sort
 * @returns {Todo[]}
 */
export function sortTodos(todos, sort) {
  const copy = [...todos]
  switch (sort) {
    case 'oldest':
      return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'priority':
      return copy.sort(
        (a, b) => (PRIORITY_WEIGHT[b.priority] ?? 0) - (PRIORITY_WEIGHT[a.priority] ?? 0)
      )
    case 'dueDate':
      return copy.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      })
    case 'newest':
    default:
      return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}

/**
 * @param {string|null|undefined} dueDate
 * @param {boolean} completed
 * @returns {'overdue' | 'today' | 'upcoming' | null}
 */
export function getDueDateStatus(dueDate, completed) {
  if (!dueDate || completed) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate + 'T00:00:00')
  if (due < today) return 'overdue'
  if (due.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

/**
 * Creates a new Todo object
 * @param {Partial<Todo> & Pick<Todo, 'title'>} data
 * @returns {Todo}
 */
export function createTodo(data) {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    description: data.description?.trim() || '',
    completed: data.completed ?? false,
    priority: data.priority ?? 'medium',
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now,
  }
}

/**
 * Migrates legacy records to the current schema
 * @param {unknown} raw
 * @returns {Todo[]}
 */
export function normalizeTodos(raw) {
  if (!Array.isArray(raw)) return []
  return raw.map((item) => ({
    id: item.id ?? crypto.randomUUID(),
    title: String(item.title ?? ''),
    description: String(item.description ?? ''),
    completed: Boolean(item.completed),
    priority: ['low', 'medium', 'high'].includes(item.priority) ? item.priority : 'medium',
    dueDate: item.dueDate || null,
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
  }))
}
