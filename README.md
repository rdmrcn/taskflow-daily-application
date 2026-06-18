# TaskFlow — Internship Project

A CRUD-based todo application built with React and JavaScript.

## Tech Stack

- **React 18** — Modern JavaScript library
- **Vite** — Fast development environment
- **Tailwind CSS** — Utility-first CSS framework
- **localStorage** — Data persistence

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoFilter.jsx
├── pages/          # Page components
│   └── HomePage.jsx
├── interfaces/     # Data models and type definitions
│   └── todo.js
├── hooks/          # Custom React hooks
│   └── useTodos.js
├── utils/          # Helper functions
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css
```

## CRUD Operations

| Operation | Description |
|-----------|-------------|
| **Create** | Add new tasks (title + description) |
| **Read** | List all tasks with filtering and search |
| **Update** | Edit tasks, mark as complete |
| **Delete** | Delete individual tasks or clear completed |

##USe via: https://taskflowdaily-application.netlify.app/
