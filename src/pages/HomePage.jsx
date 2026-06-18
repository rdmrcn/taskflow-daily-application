import Header from '../components/Header'
import TodoForm from '../components/TodoForm'
import TodoFilter from '../components/TodoFilter'
import TodoList from '../components/TodoList'
import { useTodos } from '../hooks/useTodos'

export default function HomePage() {
  const {
    filter,
    sort,
    search,
    filteredTodos,
    stats,
    allCompleted,
    setFilter,
    setSort,
    setSearch,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    toggleAll,
    clearCompleted,
  } = useTodos()

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-anthracite-950 via-anthracite-900 to-anthracite-950" />
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-accent-800/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <Header stats={stats} />

        <TodoForm onAdd={addTodo} />

        <div className="glass-panel rounded-2xl p-4 sm:p-5">
          <TodoFilter
            filter={filter}
            sort={sort}
            search={search}
            stats={stats}
            allCompleted={allCompleted}
            onFilterChange={setFilter}
            onSortChange={setSort}
            onSearchChange={setSearch}
            onToggleAll={toggleAll}
            onClearCompleted={clearCompleted}
          />
          <TodoList
            todos={filteredTodos}
            filter={filter}
            search={search}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        </div>

        <footer className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Data is stored locally in your browser via{' '}
            <span className="text-accent-600/80 font-medium">localStorage</span>
          </p>
        </footer>
      </div>
    </main>
  )
}
