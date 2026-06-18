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

## Setup

> **Requirement:** [Node.js](https://nodejs.org/) (v18 or higher)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Open `http://localhost:5173` in your browser.

## Push to GitHub

```bash
git init
git add .
git commit -m "Internship project: React Todo app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/staj-react-todo-app.git
git push -u origin main
```

## Netlify Deploy

1. Create an account at [netlify.com](https://www.netlify.com/)
2. **Add new site → Import an existing project**
3. Connect your GitHub repository
4. Build settings are auto-detected (`netlify.toml` is included):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

## Screenshot

Take a screenshot after running the app and add it to the README or submission file.

## Live Demo

https://warm-cannoli-5625bc.netlify.app

> **Note:** This site was deployed via Netlify Drop. Claim it within 60 minutes at [Netlify Drop](https://app.netlify.com/drop) to keep it permanently on your account.
