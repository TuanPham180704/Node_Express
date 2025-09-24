# CRUD User Management with JWT Authentication

[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

---

## 🚀 Project Overview

This is a **Node.js + Express.js** project for **user management** with **JWT-based authentication** and **role-based access control (RBAC)**, using **PostgreSQL** as the database.  

The project includes:  

- User **registration** with hashed passwords (**bcrypt**)  
- User **login** with **JWT access tokens** and **refresh tokens**  
- **Protected routes** based on roles (e.g., `/api/admin/dashboard`)  
- PostgreSQL **schema `auth`** for the users table  
- Environment variables for easy configuration  

---

## 📁 Project Structure

```text
crud_user/
├─ src/
│  ├─ server.js
│  ├─ routes/
│  │   ├─ auth.js        # Auth routes (register, login, refresh)
│  │   └─ admin.js       # Admin-only routes
│  ├─ controllers/
│  │   └─ authController.js
│  ├─ middleware/
│  │   └─ authMiddleware.js
│  ├─ utils/
│  │   └─ db.js          # PostgreSQL connection
├─ .env
├─ package.json
└─ README.md
