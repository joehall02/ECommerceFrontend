# 🛒 E-Commerce Frontend
![React](https://img.shields.io/badge/React-19.x-blue?logo=react)
![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/containerised-Docker-blue)
![Node Version](https://img.shields.io/badge/node-%3E=20.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green.svg)

This is the frontend for an e-commerce platform, built with **React** using **Vite**. This application is designed to interact with [ECommerceWebAPI](https://github.com/joehall02/ECommerceWebAPI) a Flask RESTful API.

---

## 1. 🚀 Tech Stack

- **React 19** — UI library  
- **Vite** — Development and build tool  
- **Bootstrap 5** - CSS Framework  
- **Docker** — Containerisation for local development  
- **Stripe** — Payment integration  
- **Node.js 20** — Used to build the application
- **Serve (Static File Server)** — Serves the production-ready build

---

## 2. 📦 Features

- User authentication and session management via JWT  
- Browse and interact with products and categories  
- Cart functionality with Stripe checkout integration  
- View order history and track order status  
- Admin-specific and customer-specific routes  
- Responsive and user-friendly design
- Mobile-first design
- API service layer for handling HTTP requests

---

## 3. 💾 Clone the Repo
```bash
git clone https://github.com/joehall02/ECommerceFrontend.git
cd ECommerceFrontend
```

---

## 4. 🔐 Environment Variables

Create a `.env` file in the root of the project with the following environment variables:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
VITE_API_URL=https://your-backend-api.com
VITE_FRONTEND_SECRET=your-frontend-secret-header
```

---

## 5. 🔧 Running Locally

### 5.1. 🖥️ CLI Setup

#### 5.1.1. Install dependancies
```bash
npm install
```

#### 5.1.2. Run the development server
```bash
npm run dev
```

##

### 5.2. 🐳 Docker Setup

#### 5.2.1. Build the Docker image
```bash
docker build \
-f Dockerfile.dev \
-t image-name .
```

#### 5.2.2. Run the container
```bash
docker run \
--name container-name \
--env-file .env \
-p host-port:container-port image-name
```

---

## 6. 🛠️ Production Build

### 6.1. Install dependancies
```bash
npm install
```

### 6.2. Create a production ready build
```bash
npm run build
```

### 6.3. Serve the application
```bash
serve -s dist
```

---

## 7. 🔗 Related Projects

- [ECommerceWebAPI](https://github.com/joehall02/ECommerceWebAPI)

---

## 8. 📄 Licence

This project is licensed under the [MIT Licence](LICENCE).
