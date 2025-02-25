# 📝 Task Management Application

A **full-stack task management application** built with **React (Vite) + TypeScript** for the frontend and **Node.js (Express) + TypeScript + MongoDB** for the backend. The app supports **user authentication, CRUD operations for tasks, task categorization, Twitch API integration, and automatic task timeout handling.**

## 🚀 Live Demo

- **Live App**: [https://task-manager-pve9.onrender.com/login](https://task-manager-pve9.onrender.com/login)

---

## 📌 Features

✅ **User Authentication** (Register/Login with JWT)  
✅ **Task Management** (Create, Read, Update, Delete tasks)  
✅ **Category Filtering** (To Do, In Progress, Done, Timeout)  
✅ **Automatic Timeout Handling** (Expired tasks move to "Timeout")  
✅ **Twitch API Integration** (Fetch and display live streams)  
✅ **Persistent State Management** (Zustand for frontend)  
✅ **Responsive UI** (TailwindCSS + ShadCN UI Components)

---

## 📌 How to Use the App

### **1️⃣ Register & Login**

- Open the **[Live App](https://task-manager-pve9.onrender.com)**.
- Click **"Register"** and create an account.
- Log in using your credentials.
- Upon successful login, you will be redirected to the task dashboard.

### **2️⃣ Managing Tasks**

- **Create a Task:** Click the "Add Task" button and fill in the task details.
- **Edit a Task:** Click the **Edit (✏️) button** on any task to update its details.
- **Delete a Task:** Click the **Trash (🗑️) button** to remove a task permanently.
- **Task Timeout Handling:** If a task expires, it will automatically move to the "Timeout" category.

### **3️⃣ Filtering Tasks by Category**

- Use the **category filter buttons** ("All", "To Do", "In Progress", "Done", "Timeout") to view tasks based on their status.
- The number of tasks in each category is displayed next to the category name.

### **4️⃣ Viewing Twitch Live Streams**

- Go to the **Live Streams** section.
- Click on any **Twitch stream title** to open it on Twitch.

---

## 📌 API Endpoints

### **Authentication**

- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login and get JWT token

### **Tasks**

- `GET /api/tasks` → Fetch all tasks (Authenticated)
- `GET /api/tasks/:id` → Fetch a specific task
- `POST /api/tasks` → Create a new task
- `PUT /api/tasks/:id` → Update a task
- `DELETE /api/tasks/:id` → Delete a task

### **Twitch Integration**

- `GET /api/streaming` → Fetch live Twitch streams

---

## 📜 License

This project is **MIT licensed**. You are free to modify and use it. 🔥

---

## 🎉 Thank You!

Built by [Haard Tripathi](https://github.com/Haardtripathi) 🚀
