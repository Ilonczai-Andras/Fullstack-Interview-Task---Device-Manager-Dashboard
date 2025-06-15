# Project Name

A full-stack web application built with Angular frontend and Node.js Express backend.

## 🚀 Tech Stack

**Frontend:**
- Angular 19
- TypeScript
- HTML5/CSS3
- Angular CLI

**Backend:**
- Node.js
- Express.js
- JavaScript/TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-name>
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start the development server
npm run dev
# or
npm start
```

The backend server will run on `http://localhost:5000` (or your configured port).

### 3. Frontend Setup
```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
ng serve
# or
npm start
```

The frontend application will run on `http://localhost:4200`.

## 🏃‍♂️ Quick Start

### Option 1: Manual Start (Recommended for Development)
1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (new terminal):**
   ```bash
   cd frontend
   ng serve
   ```
```

## 📁 Project Structure

```
project-root/
├── frontend/                 # Angular application
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev        # Start development server with nodemon
```

### Frontend Scripts  
```bash
ng serve           # Start development server
ng build           # Build for production
ng test            # Run unit tests
```

## 🌐 API Endpoints

The backend API runs on `http://localhost:5000` with the following base endpoints:

  - `GET /devices` - list devices
  - `POST /devices` - add new device
  - `DELETE /devices/:id` - delete device