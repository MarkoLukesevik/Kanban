🗂️ Kanban Task Management App

A full-stack Kanban board application built with Angular and .NET Web API.
Based on a Frontend Mentor challenge and extended with a custom backend for data persistence.

📌 About The Project

This project is a solution to a Frontend Mentor Kanban challenge, expanded into a full-stack application.
While the original challenge focuses on frontend UI implementation, I extended it by:
 - Building a .NET Web API backend
 - Designing a relational database
 - Implementing full CRUD functionality
 - Persisting data instead of using static JSON
 - The result is a complete Kanban task management system with real backend integration.

🎯 The Challenge

Original design provided by Frontend Mentor.
The goal was to build a responsive Kanban board UI that matches the design as closely as possible.

🔗 Challenge source: https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB

✨ Features

 - 📋 Kanban Board (Todo / Doing / Done)
 - ➕ Create, Edit, Delete Boards
 - 📝 Add Tasks with Descriptions
 - ✅ Subtasks per Task
 - 🔄 Drag & Drop Between Columns
 - 💾 Data Persistence via API
 - 📱 Fully Responsive Design

🛠️ Tech Stack
 Frontend
   - Angular
   - TypeScript
   - Angular CDK (Drag & Drop)
   - RxJS
   - SCSS

Backend
 - .NET Web API
 - Entity Framework Core
 - SQL Server

🧩 What I Added Beyond the Challenge
  ✔ Created a structured backend architecture
  ✔ Designed database relationships (User - Kanban - Boards → Columns → Tasks → Subtasks)
  ✔ Implemented full CRUD operations
  ✔ Connected Angular frontend to real API endpoints
  ✔ Managed application state dynamically

📂 Frontend Project Structure
  Kanban/
  │
  ├── src/
  │   ├── app/
  │   │   ├── base-components/
  │   │   ├── components/
  │   │   ├── directives/
  │   │   ├── modals/
  │   │   ├── models/
  │   │   ├── requests/
  │   │   ├── services/
  │   │   ├── app.config.ts
  │   │   ├── app.routes.ts
  │   │   └── app.ts
  │   │
  │   ├── assets/
  │   ├── index.html
  │   ├── main.ts
  │   └── styles.scss
  │
  ├── angular.json
  ├── package.json
  └── README.md

⚙️ Running the Frontend (Angular)
  Clone the repository:
  git clone https://github.com/your-username/kanban-app.git

  cd kanban-app
  
  Install dependencies:
  npm install
  
  Run the development server:
  ng serve
  
  The application will be available at:
  http://localhost:4200

🔐 Demo Account
  To quickly explore the application, you can use the following test credentials:
  
  Username: Marko
  Password: Marko123
  
  This account is pre-seeded in the database for demonstration purposes.
  ⚠️ Note: This is a development/demo account only.
 
