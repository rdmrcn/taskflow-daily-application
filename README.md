# TaskFlow Daily Manager

TaskFlow Daily Manager is a responsive React-based task management web application developed as an internship project. The application allows users to create, organize, update, complete, filter, search, and delete daily tasks through a clean and modern interface.

## Live Demo

https://taskflowdaily-application.netlify.app/

## Project Overview

<img width="1085" height="1156" alt="Screenshot 2026-06-21 134931" src="https://github.com/user-attachments/assets/ea703307-ef08-41a4-93dd-9b86bd3ea1e4" />


TaskFlow Daily Manager is designed to help users manage daily tasks efficiently. The project focuses on CRUD operations, component-based React structure, local data persistence, and responsive UI design.

The application stores task data locally in the browser using localStorage, so users can continue managing their tasks after refreshing the page.

## Technologies Used

- React 18
- JavaScript
- Vite
- Tailwind CSS
- localStorage
- WebStorm 2024.3.2

## Main Features

- Add new tasks
- Add optional task details
- Set priority level
- Set due date
- Mark tasks as completed
- Edit existing tasks
- Delete individual tasks
- Clear completed tasks
- Search tasks
- Filter tasks by All, Active, and Completed
- Sort tasks by newest or other available order options
- Progress tracking with task statistics
- Responsive modern dark UI
- Browser-based local data storage

## CRUD Operations

| Operation | Description |
|---|---|
| Create | Add new tasks with title, description, priority, and due date |
| Read | Display all tasks with filtering, search, and sorting |
| Update | Edit tasks and change completion status |
| Delete | Remove tasks individually or clear completed tasks |

## Project Structure

```txt
src/
├── components/
│   ├── Header.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   ├── TodoList.jsx
│   └── TodoFilter.jsx
├── pages/
│   └── HomePage.jsx
├── interfaces/
│   └── Todo.js
├── hooks/
│   └── useTodos.js
├── utils/
│   └── storage.js
├── App.jsx
├── main.jsx
└── index.css

## Author

© 2026 Reha Demircan

Developed as an internship project using React, JavaScript, Vite, and Tailwind CSS.
