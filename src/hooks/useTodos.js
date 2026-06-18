import { useCallback, useEffect, useMemo, useState } from 'react'
import { createTodo, sortTodos } from '../interfaces/todo'
import { loadTodos, saveTodos } from '../utils/storage'

/**
 * Custom hook that manages todo CRUD operations
 */
export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos())
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const [search, setSearch] = useState('')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback(({ title, description = '', priority = 'medium', dueDate = null }) => {
    if (!title.trim()) return
    setTodos((prev) => [createTodo({ title, description, priority, dueDate }), ...prev])
  }, [])

  const updateTodo = useCallback((id, data) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...data,
              title: data.title?.trim() ?? todo.title,
              description: data.description?.trim() ?? todo.description,
              dueDate: data.dueDate === undefined ? todo.dueDate : data.dueDate || null,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    )
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    )
  }, [])

  const toggleAll = useCallback(() => {
    setTodos((prev) => {
      const hasActive = prev.some((t) => !t.completed)
      const now = new Date().toISOString()
      return prev.map((todo) => ({
        ...todo,
        completed: hasActive ? true : false,
        updatedAt: now,
      }))
    })
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }, [])

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = todos.filter((todo) => {
      if (filter === 'active' && todo.completed) return false
      if (filter === 'completed' && !todo.completed) return false
      if (query) {
        const haystack = `${todo.title} ${todo.description}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    return sortTodos(filtered, sort)
  }, [todos, filter, sort, search])

  const stats = useMemo(
    () => ({
      total: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
      overdue: todos.filter(
        (t) => !t.completed && t.dueDate && t.dueDate < new Date().toISOString().slice(0, 10)
      ).length,
    }),
    [todos]
  )

  const allCompleted = todos.length > 0 && stats.active === 0

  return {
    todos,
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
  }
}
