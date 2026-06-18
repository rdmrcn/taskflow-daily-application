import { TODO_STORAGE_KEY, normalizeTodos } from '../interfaces/todo'

/**
 * Reads data from localStorage
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

/**
 * Writes data to localStorage
 * @param {string} key
 * @param {unknown} value
 */
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Loads todo list from localStorage
 * @returns {import('../interfaces/todo').Todo[]}
 */
export function loadTodos() {
  const raw = loadFromStorage(TODO_STORAGE_KEY, [])
  return normalizeTodos(raw)
}

/**
 * Saves todo list to localStorage
 * @param {import('../interfaces/todo').Todo[]} todos
 */
export function saveTodos(todos) {
  saveToStorage(TODO_STORAGE_KEY, todos)
}
