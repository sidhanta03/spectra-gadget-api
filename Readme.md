# 🚀 SpectraGadget API

# 📌 Project Overview

**SpectraGadget API** is a secure system designed to manage and track high-tech espionage gadgets used by elite intelligence agencies. This API enables agents to efficiently manage their gadget inventory, trigger self-destruct sequences for critical gadgets, and perform other mission-critical actions.

### 🔹 Key Features:
- **Manage gadget inventory** (add, update, decommission gadgets).
- **Trigger self-destruct sequences** for critical gadgets.
- **Ensure secure authentication** using JWT-based authorization.

### 📌 Tech Stack:
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **ORM:** Sequelize
- **Security:** JWT Authentication, bcrypt for password hashing
- **Deployment:** Railway

### 📌 Postman Collection:
[🔗 View API Documentation (Postman)](https://documenter.getpostman.com/view/27749166/2sAYX6o1fN)

---

## 🔐 Security Implementation
### ✅ JWT Authentication & Authorization
This API **secures access** to protected routes using **JWT authentication**:
1. **Agents register** using `agent_name` and `password`.
2. **Passwords are hashed** using **bcrypt** before storing in the database.
3. On login, a **JWT token** is issued (valid for **2 hours**).
4. **Authenticated requests** must include the token in the `Authorization` header:
   ```sh
   Authorization: Bearer <JWT_TOKEN>
   ```

### ✅ Password Security with bcrypt
- **bcrypt** ensures passwords are **hashed** before storage.
- During **login**, bcrypt securely compares the provided password with the stored hashed password.

---

## 📌 API Endpoints

### 🛠️ Gadget Inventory Management (`/api/gadgets`)
✔ **List All Gadgets**: Fetches all gadgets with a random mission success probability (1-100%).
✔ **Filter Gadgets by Status**: Retrieve gadgets based on their **status** (`Available`, `Deployed`, `Destroyed`, `Decommissioned`).
✔ **Add a New Gadget**: Creates a new gadget with a **unique, randomly generated codename** (e.g., "The Nightingale").
✔ **Update a Gadget**: Modify gadget details (**codename remains unchanged**).
✔ **Soft Delete a Gadget**: Marks gadgets as **"Decommissioned"** instead of deleting them, with a **timestamp**.

### 💣 Self-Destruct Sequence (`/api/gadgets/{id}/self-destruct`)
✔ **Trigger Self-Destruct**: Sends a **confirmation code** to securely **initiate the gadget’s self-destruction**.

### 📌 Authentication Endpoints
#### 📝 Agent Signup (`POST /api/agents/signup`)
✔ Registers a **new IMF agent** with a **securely hashed password**.
✔ Prevents **duplicate agent_name registrations**.
✔ Returns a **success message** upon successful registration.

#### 🔑 Agent Login (`POST /api/agents/login`)
✔ Verifies `agent_name` and **compares the hashed password** for authentication.
✔ On success, returns a **JWT token** (**valid for 2 hours**) to authenticate future requests.

---

## 📌 Project Setup

### 📌 Backend Setup (Node.js + Express + Supabase PostgreSQL)
1️⃣ Clone the repository:
   ```sh
   git clone https://github.com/sidhanta03/spectra-gadget-api
   cd spectra-gadget-api
   ```

2️⃣ Install dependencies:
   ```sh
   npm install
   ```

3️⃣ Create a `.env` file and add the following environment variables:
   ```sh
   SUPABASE_URL=your_supabase_url  
   SUPABASE_KEY=your_supabase_secret_key  
   JWT_SECRET=your_jwt_secret  
   ```

4️⃣ Start the backend server:
   ```sh
   npm start
   ```

5️⃣ **Test API using Postman:**

---

## ⭐ Support
If you like this project, **give it a ⭐ on GitHub**! 😊  


