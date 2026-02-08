# 💬 Chat It Out

A full-stack real-time chat application built using the MERN stack. This project enables secure authentication, live messaging, and a modern responsive UI for seamless communication.

---

## 🚀 Features

- ⚡ Real-time messaging with Socket.io
- 🔐 JWT-based Authentication & Authorization
- 🟢 Online/Offline user presence tracking
- 🧠 Global state management using Zustand
- 🎨 Responsive UI with TailwindCSS + DaisyUI
- ☁️ Cloudinary integration for media storage
- 🛡️ Error handling on both client and server
- 🚀 Deployment-ready configuration

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, DaisyUI, Zustand  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Realtime Engine:** Socket.io  
**Authentication:** JSON Web Tokens (JWT)  
**Media Storage:** Cloudinary  

---

## ⚙️ Environment Setup

Create a `.env` file inside the backend folder and add:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```