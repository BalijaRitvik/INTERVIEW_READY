# 🚀 INTERVIEW_READY

**INTERVIEW_READY** is a full-stack coding interview platform designed for 1-on-1 real-time interviews with collaborative code editing, video conferencing, and automated evaluation.

Built with a focus on developer experience and interview realism.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite), TailwindCSS, TanStack Query  
- **Backend:** Node.js, Express, MongoDB  
- **Authentication:** Clerk  
- **Video & Chat:** Stream SDKs  
- **Code Execution:** Piston API  


---

## ✨ Features

- 🔐 User authentication with Clerk  
- 🎥 1-on-1 video interview rooms using Stream  
- 💬 Real-time chat in session rooms  
- 🧑‍💻 Collaborative code editor  
- ⚙️ Secure code execution in isolated environments  
- 🎯 Automatic evaluation based on test cases  
- 📊 Dashboard with active and past sessions  
- 🔒 Room locking — only host and one participant allowed  
- 🎉 Confetti and notifications on success/failure using toaster 

---



## 🛠️ Setup Instructions

### 1. Clone the Project
After downloading 
cd INTERVIEW_READY

### 2. Backend Setup

cd backend
npm install
npm run dev

#### ➕ Create `backend/.env`

PORT=3000

NODE_ENV=development

DB_URL=your_mongodb_connection_url

STREAM_API_KEY=your_stream_api_key

STREAM_API_SECRET=your_stream_api_secret

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

CLERK_SECRET_KEY=your_clerk_secret_key

CLIENT_URL=http://localhost:5173

---

### 3. Frontend Setup

cd frontend
npm install
npm run dev

#### ➕ Create `frontend/.env`

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_API_URL=http://localhost:3000/api

VITE_STREAM_API_KEY=your_stream_api_key

---



