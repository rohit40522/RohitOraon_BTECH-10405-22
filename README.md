# 🗂️ Task Manager – Full Stack Kanban Application

A full-stack **Task Management (Kanban) application** that allows users to manage tasks efficiently with authentication, drag-and-drop task movement, real-time activity tracking, and profile management.

This project demonstrates **modern full-stack development practices** using **Node.js, Express, MongoDB, and React**.

---

## 🚀 Project Overview

The Task Manager application enables users to:

- Sign up and log in securely
- Create, update, delete tasks
- Organize tasks using a **Kanban board**
- Drag and drop tasks between statuses
- Track **Recent Activity** automatically
- Update password and delete profile
- View personalized dashboard

Each user has **isolated data**, ensuring privacy and security.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **React Router DOM**
- **Tailwind CSS**
- **@hello-pangea/dnd** (Drag & Drop)
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (Authentication)**
- **bcrypt (Password hashing)**

---

## 📁 Project Structure



## 📁 Frontend Folder Structure

```text
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js             # Axios configuration
│   │   └── tasks.js             # Task-related API calls
│   │
│   ├── auth/
│   │   └── AuthContext.jsx      # Authentication context
│   │
│   ├── components/
│   │   ├── KanbanBoard.jsx      # Kanban board layout
│   │   ├── TaskCard.jsx         # Task card component
│   │   ├── CreateTask.jsx       # Create task modal
│   │   └── RecentActivity.jsx   # Recent activity panel
│   │
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Signup page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   └── Profile.jsx          # Profile management
│   │
│   ├── App.jsx                  # App routes
│   └── main.jsx                 # React entry point
│
├── index.html
└── package.json
```

## 📁 Backend Folder Structure
```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   │
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT authentication middleware
│   │
│   ├── controllers/
│   │   ├── auth.controller.js   # Signup, login, logout
│   │   ├── user.controller.js   # Profile update & delete
│   │   └── task.controller.js   # Task CRUD logic
│   │
│   ├── routes/
│   │   ├── auth.routes.js       # Auth routes
│   │   ├── user.routes.js       # User routes
│   │   └── task.routes.js       # Task routes
│   │
│   ├── app.js                   # Express app configuration
│   └── server.js                # Server entry point
│
├── .env                         # Environment variables
└── package.json                 # Dependencies & scripts

```
    npm install

    
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173

