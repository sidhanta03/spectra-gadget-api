🚀 Phoenix: IMF Gadget API
📌 Project Overview
The IMF Gadget API is a secure system designed to manage and track high-tech espionage gadgets used by the Impossible Missions Force (IMF).
It allows agents to:
✅ Retrieve available gadgets with mission success probabilities
✅ Add, update, and decommission gadgets
✅ Trigger self-destruct sequences for critical gadgets
✅ Authenticate securely using JWT-based authorization

This API is built with Node.js, Express, PostgreSQL, and Sequelize, ensuring scalability, security, and controlled access.

🔐 Security Implementation
✅ JWT Authentication & Authorization
Agents register using their agent_name and password.
bcrypt is used to hash passwords before storing them securely in the database.
Upon successful login, a JWT token is generated with 2-hour validity.
Every request to secured endpoints must include this token in the Authorization header using the Bearer Token format.


✅ Password Security with bcrypt
bcrypt applies a one-way hashing algorithm, ensuring passwords are not stored in plain text.
During login, the provided password is compared with the stored hash to verify authentication securely.
📌 Features of This API
🛠️ Gadget Inventory Management (/api/gadgets)
✅ List All Gadgets → Fetch all gadgets with a random mission success probability (1-100%).
✅ Filter Gadgets by Status → Retrieve gadgets that are Available, Deployed, Destroyed, or Decommissioned.
✅ Add a New Gadget → Assigns a unique random codename (e.g., "The Nightingale").
✅ Update a Gadget → Modify gadget details (except codename).
✅ Soft Delete a Gadget → Instead of deleting, the gadget is marked as "Decommissioned" with a timestamp.

💣 Self-Destruct Sequence (/api/gadgets/{id}/self-destruct)
✅ Trigger Self-Destruct → Requires a randomly generated confirmation code before execution.

📌 Authentication Endpoints
📝 Agent Signup (POST /api/agents/signup)
Registers a new agent by storing a hashed password securely.
Prevents duplicate agent_name registrations.
Returns a success message upon successful registration.
🔑 Agent Login (POST /api/agents/login)
Verifies agent_name and hashed password.
On success, returns a JWT token (valid for 2 hours) to authenticate further requests.