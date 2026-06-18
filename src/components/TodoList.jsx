import TodoItem from './TodoItem'

const EMPTY_MESSAGES = {
  all: {
    emoji: '📋',
    title: 'No tasks yet',
    subtitle: 'Add your first task above to get started',
  },
  active: {
    emoji: '🎉',
    title: 'All tasks completed',
    subtitle: 'Great work! Add a new task whenever you are ready',
  },
  completed: {
    emoji: '✨',
    title: 'No completed tasks',
    subtitle: 'Completed tasks will appear here',
  },
  search: {
    emoji: '🔍',
    title: 'No results found',
    subtitle: 'Try a different search term',
  },
}

export default function TodoList({ todos, filter, search, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    const key = search.trim() ? 'search' : filter
    const { emoji, title, subtitle } = EMPTY_MESSAGES[key] ?? EMPTY_MESSAGES.all

    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-anthracite-800/60 border border-anthracite-600/40 mb-5">
          <span className="text-4xl">{emoji}</span>
        </div>
        <p className="text-slate-300 font-medium">{title}</p>
        <p className="text-slate-500 text-sm mt-1.5">{subtitle}</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
