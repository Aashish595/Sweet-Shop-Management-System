# 🍬 Sweet Shop Management System

A **full‑stack web application** for managing and purchasing sweets with **secure authentication**, **role‑based access**, and a **modern React dashboard**.

This project demonstrates real‑world usage of **Node.js, Express, MongoDB, React, and JWT authentication** in a clean, scalable architecture.

---

## ✨ Key Features

### 🔐 User Authentication

* User **registration and login**
* Passwords securely **hashed** before storage
* **JWT‑based authentication** for protected routes
* Role support (**User / Admin**)

---

### 🍭 Sweets Management *(Protected)*

* Add, update, delete, and view sweets
* **Admin‑only access** for sensitive operations
* Search sweets by:

  * Name
  * Category
  * Price range
* Each sweet includes:

  * Unique ID
  * Name
  * Category
  * Price
  * Quantity in stock

---

### 📦 Inventory Management *(Protected)*

* Purchase sweets (automatically reduces quantity)
* Prevent purchases when stock is **zero**
* Admin users can **restock sweets**
* Real‑time stock validation

---

### 🖥️ Frontend (React SPA)

* Modern **Single Page Application** built with React
* User‑friendly **login & registration** forms
* Dashboard displaying all available sweets
* Search and filter functionality
* Purchase flow with quantity validation
* **Admin dashboard** for managing sweets
* Fully **responsive UI** with smooth interactions

---

## 🛠️ Technology Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **JWT (JSON Web Tokens)** for authentication

### Frontend

* **React**
* **Tailwind CSS** (or preferred styling library)
* **Context API / Redux** (optional for state management)

### Testing & Tools

* **Postman** for API testing

---

## 🔗 API Endpoints

### 🔐 Authentication

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login user and receive JWT

---

### 🍬 Sweets *(Protected)*

* `POST /api/sweets` → Add a new sweet
* `GET /api/sweets` → Get all sweets
* `GET /api/sweets/search` → Search sweets
* `PUT /api/sweets/:id` → Update sweet details
* `DELETE /api/sweets/:id` → Delete a sweet (**Admin only**)

---

### 📦 Inventory *(Protected)*

* `POST /api/sweets/:id/purchase` → Purchase a sweet
* `POST /api/sweets/:id/restock` → Restock a sweet (**Admin only**)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/sweetshop-app.git
cd sweetshop-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

➡️ App runs at **[http://localhost:5173](http://localhost:5173)**

---

## 🤖 AI Usage in This Project

AI tools were used **responsibly** to assist with development, debugging, and UI/UX decisions while ensuring all final code was carefully reviewed and customized.

### 🧠 Tools Used

#### ChatGPT (GPT‑5 Mini)

* Designed authentication and sweets management APIs
* Generated React component boilerplate
* Helped debug JWT authentication and API issues
* Assisted with state management and validation logic

#### GitHub Copilot

* Accelerated repetitive code writing
* Assisted with frontend forms and API calls
* Helped scaffold components efficiently

---

### 🚀 How AI Helped

* Faster development cycle
* Cleaner architecture suggestions
* Focused effort on business logic and UI polish

---

## 📘 Reflection

Using AI tools thoughtfully helped me **save time while strengthening my understanding** of:

* React architecture
* Backend API design
* JWT authentication flows
* MongoDB schema modeling

All AI‑generated code was reviewed, tested, and adapted to ensure **security, correctness, and maintainability**.

---

## 📄 License

**MIT License** © **Gurudas Maurya**
