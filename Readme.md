# 🚀 Phoenix: IMF Gadget API

## 📌 Project Overview

The **IMF Gadget API** is a secure system designed to manage and track high-tech espionage gadgets used by the **Impossible Missions Force (IMF)**. This API enables IMF agents to manage their gadget inventory, trigger self-destruct sequences for critical gadgets, and perform other mission-critical actions.

### Key Features:
- **Retrieve** available gadgets with random mission success probabilities.
- **Add**, **update**, and **decommission** gadgets.
- **Trigger self-destruct sequences** for critical gadgets.
- **Secure authentication** using JWT-based authorization.

Built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**, this API ensures scalability, security, and controlled access for agents.

---

## 🔐 Security Implementation

### ✅ JWT Authentication & Authorization

This API employs **JWT-based authentication** to ensure secure access to protected routes. 

- Agents register by providing their `agent_name` and `password`.
- **bcrypt** is used to hash passwords before securely storing them in the database.
- Upon successful login, a **JWT token** is generated, valid for **2 hours**.
- Every request to secured endpoints requires the token in the **Authorization header** using the **Bearer Token** format.

### ✅ Password Security with bcrypt

To enhance security, **bcrypt** is used for password hashing. This ensures that passwords are not stored in plain text.

- During login, the provided password is securely compared with the stored hashed password to verify authentication.

---

## 📌 Features of This API

### 🛠️ Gadget Inventory Management (`/api/gadgets`)

- **List All Gadgets**: Fetch all gadgets with a random mission success probability (1-100%).
- **Filter Gadgets by Status**: Retrieve gadgets based on their status: `Available`, `Deployed`, `Destroyed`, or `Decommissioned`.
- **Add a New Gadget**: Create a gadget with a unique, randomly generated codename (e.g., "The Nightingale").
- **Update a Gadget**: Modify gadget details (excluding codename).
- **Soft Delete a Gadget**: Mark gadgets as "Decommissioned" rather than deleting them, along with a timestamp.

### 💣 Self-Destruct Sequence (`/api/gadgets/{id}/self-destruct`)

- **Trigger Self-Destruct**: Send a confirmation code to securely initiate the gadget’s self-destruct sequence.

---

## 📌 Authentication Endpoints

### 📝 Agent Signup (`POST /api/agents/signup`)

- **Register a new agent** by securely storing a hashed password.
- Prevents duplicate `agent_name` registrations.
- Returns a success message upon successful registration.

### 🔑 Agent Login (`POST /api/agents/login`)

- Verifies the `agent_name` and compares the hashed password for authentication.
- Upon success, a **JWT token** is returned (valid for 2 hours) to authenticate further requests.
