# Video Library

## A Full-Stack Video Management Application

**Video Library** is a modern web application that allows users to **browse, and search a video collection**.  
It supports **pagination, filtering, and sorting** to enhance the browsing experience. You can go to detailed video pages to view more information, by pressing the button (not a thumbnail). I made this decision to improve the user experience and make the application more accessible on mobile devices (less sudden clicks to details page).

Built using **Fastify, Next.js, TypeScript, Redux, and TailwindCSS** in an **npm monorepo structure**.

---

## 🌐 Live Demo

Application is deployed on Vercel and Render, you can access it using the following links (please note that the backend may take up-to 50 seconds to start due to the free tier limitations):

- **Frontend:** [Video Library Frontend](https://veedeo-library.vercel.app/)
- **Backend API:** [Video Library API](https://veedeo-library-api.onrender.com/)

---

## 📂 Monorepo Structure
This project follows a **monorepo architecture** using **npm workspaces**.  
The repository is organized as follows:

```
video-library/
│── packages/
│   ├── frontend/  → Next.js application
│   ├── backend/   → Fastify API server
│── package.json   → Root config for npm workspaces
│── tsconfig.json  → Shared TypeScript configuration
│── README.md      → Project documentation
```

### 📦 Packages
- **`frontend/`** → Next.js application with Redux, TailwindCSS.
- **`backend/`** → Fastify API server with Zod validation.

---

## 🛠 Installation & Setup
### 🔧 Prerequisites
- **Node.js `>=18.x`**
- **npm `>=9.x`** (workspaces support)

### 📥 Install Dependencies
Run the following command at the root of the project:
```sh
npm install
```

---

## Environment Variables
Both **frontend and backend** uses environment variables, to simplify initial project start I provided default values, which allows to start project without setting up the `dotenv` files.

### 1️⃣ Backend (`packages/backend/.env`)
Create a `.env` file inside `packages/backend` and configure:
```
PORT=4000
CORS_ORIGIN=*
```

### 2️⃣ Frontend (`packages/frontend/.env.local`)
Create a `.env.local` file inside `packages/frontend`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 🚀 Running the Project
Runs the Fastify API on **`http://localhost:4000`** & the Next.js app on **`http://localhost:3000`**. Unless you change the ports in the environment variables.

### Development Mode
```sh
npm run dev
```
You can change files in both projects and the changes will be reflected immediately.

### Production Mode
```sh
npm run start
```
Builds both projects in production mode and runs them production server.

---

## 🧪 Testing
### Run All Tests
```sh
npm run test
```

---

## 📄 API Documentation
The backend provides a REST API with the following endpoints:

| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| GET    | `/videos`       | Fetch paginated videos         |
| GET    | `/videos/:id`   | Fetch a single video by ID     |

---

## 🚀 Deployment
### 1️⃣ Backend Deployment
- Deploy using **Vercel / AWS / DigitalOcean**.
- Ensure the following **production environment variables** are set (you can apply stricter cors origin in production):
```
PORT=4000
CORS_ORIGIN=* # Change to your domain
```

### 2️⃣ Frontend Deployment
#### Deploy to Vercel
1. Install Vercel CLI:
```sh
npm install -g vercel
```
2. Deploy the frontend:
```sh
cd packages/frontend
vercel --prod
```

```dotenv
NEXT_PUBLIC_API_URL=https://your-backend-url.com # change to your backend URL
```

---

## 👤 Author
- **Name:** Pavel Klochkov

---

## 📜 License
This project is licensed under the **MIT License**.
