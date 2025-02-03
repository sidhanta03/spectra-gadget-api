const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Agent } = require('../models');
require('dotenv').config();

const router = express.Router();

// Agent Signup
router.post('/signup', async (req, res) => {
    try {
        const { agent_name, password } = req.body;

        // Check if agent already exists
        const existingAgent = await Agent.findOne({ where: { agent_name } });
        if (existingAgent) {
            return res.status(400).json({ message: 'Agent name already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create agent
        const newAgent = await Agent.create({ agent_name, password: hashedPassword });

        res.status(201).json({ message: 'Agent registered successfully', newAgent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Agent Login
router.post('/login', async (req, res) => {
    try {
        const { agent_name, password } = req.body;

        // Find agent by name
        const agent = await Agent.findOne({ where: { agent_name } });
        if (!agent) {
            console.log('Agent not found:', agent_name);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //hash the password to check if it matches
        const isMatch = await bcrypt.compare(password, agent.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { agentId: agent.id, agentName: agent.agent_name },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



module.exports = router;
