# 🗂️ Task Manager – Full Stack Kanban Application

A full-stack **Task Management (Kanban) application** that allows users to manage tasks efficiently with authentication, drag-and-drop task movement, real-time activity tracking, and profile management.

This project demonstrates **modern full-stack development practices** using **Node.js, Express, MongoDB, and React**.

## Frontend URL
https://task-manager-frontend-hr3h.onrender.com/

## Backend URL
https://task-manager-backend-ay3i.onrender.com

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
# Backend Setup Instructions
```
    npm install
```
``` 
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173
```
```
npm start
```
```
http://localhost:5000
```

# Frontend Setup Instructions
```
cd frontend
```
```
npm install
```
```
npm run dev
```
```
http://localhost:5173
```


## Api Overview
# Authentication
```text
Method	Endpoint	        Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	    Login user
POST	/api/auth/logout	Logout (client-side)

```

```text
User Profile
Method	Endpoint	Description
GET	/api/users/me	Get user profile
PUT	/api/users/me	Update password
DELETE	/api/users/me	Delete user profile
```

```text
Tasks
Method	Endpoint	    Description
POST	/api/tasks	    Create task
GET	    /api/tasks	    Get all user tasks
PUT	    /api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task permanently
```

```text
Activity
Method	Endpoint	    Description
GET	    /api/activity	Get recent activity
```

## 📸 Frontend Screenshots

This section showcases the key UI screens of the Task Manager application to
give a visual overview of the user experience and functionality.

> All screenshots are taken from the running application.

---

### 🔐 Login Page
Secure login interface for existing users.

<img width="1265" height="821" alt="Screenshot 2026-01-13 235929" src="https://github.com/user-attachments/assets/08401f3b-d387-4955-839b-de48c15afed6" />

---

### 📝 Sign Up Page
User registration page for new users.

<img width="1292" height="846" alt="Screenshot 2026-01-14 000017" src="https://github.com/user-attachments/assets/a1c0ac84-a660-46ce-8c64-e2b295ce72fa" />


---

### 📊 Dashboard (Kanban Board)
Main dashboard displaying tasks categorized into:
- Pending
- In Progress
- Completed  

Includes drag-and-drop functionality.

<img width="1880" height="915" alt="Screenshot 2026-01-14 000400" src="https://github.com/user-attachments/assets/1025c7b0-d901-4b3f-8315-965e26867156" />


---

### ➕ Create Task Modal
Popup modal for creating a new task with title, description, status, and due date.

<img width="1796" height="871" alt="Screenshot 2026-01-13 235820" src="https://github.com/user-attachments/assets/f95a4077-7d57-49c8-b1dc-87cb9e479c6b" />


---

### 🔄 Drag & Drop Tasks
Tasks can be dragged between columns and status updates persist automatically.

<img width="1863" height="744" alt="Screenshot 2026-01-14 000624" src="https://github.com/user-attachments/assets/6b5128e1-8807-4818-b121-61742186bc31" />


---

### 📜 Recent Activity
Displays recent user actions such as:
- Task creation
- Status updates
- Task deletion  

This section updates automatically.

<img width="1819" height="605" alt="Screenshot 2026-01-14 000451" src="https://github.com/user-attachments/assets/db269f33-e733-4c12-bb62-138bc4b9fdf2" />


---

### 👤 Profile Page
User profile page showing:
- Name (read-only)
- Email (read-only)
- Password update
- Delete profile option

<img width="1334" height="794" alt="Screenshot 2026-01-14 000937" src="https://github.com/user-attachments/assets/3503891d-5ea4-44f4-9b1e-82ef898ba0e2" />


---

## 📂 Screenshots Folder Structure

Place all images inside a dedicated folder:

```text
screenshots/
├── login.png
├── signup.png
├── dashboard.png
├── create-task.png
├── drag-drop.png
├── recent-activity.png
└── profile.png
```


# Author
Rohit Oraon







