const express = require('express');
const { body, validationResult } = require('express-validator');
const authenticateToken = require("../middlewares/authMiddleware");
const { Gadget } = require('../models');
const router = express.Router();

// Utility function to generate a random codename
const generateCodename = () => {
  const codenames = [
    "The Nightingale", "The Kraken", "The Black Widow", "The Phantom", "The Falcon",
    "The Sentinel", "The Shadow", "The Jaguar", "The Raven", "The Panther"
  ];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

// GET /gadgets - Get all gadgets with a random mission success probability
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status } = req.query;

    // Define query condition if status is provided
    const whereCondition = status ? { status } : {};

    // Fetch gadgets from the database
    const gadgets = await Gadget.findAll({ where: whereCondition });
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: Math.floor(Math.random() * 100) + 1,
    }));
    res.status(200).json(gadgetsWithProbability);
  } catch (error) {
    console.error('Error retrieving gadgets:', error);
    res.status(500).json({ error: 'Failed to retrieve gadgets.' });
  }
});

// POST /gadgets - Create a new gadget
router.post(
  '/',
  authenticateToken,
  body('name').notEmpty().withMessage('Name is required.'),
  body('status')
    .optional()
    .isIn(['Available', 'Deployed', 'Destroyed','Decommissioned'])
    .withMessage('Invalid status, must be one of: Available, Deployed, Destroyed','Decommissioned'),
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, status } = req.body;
      const codename = generateCodename();

      // If no status is provided, it will default to 'Available'
      const gadget = await Gadget.create({
        name,
        status: status || 'Available', 
        codename
      });

      res.status(201).json(gadget);
    } catch (error) {
      console.error('Error creating gadget:', error);
      res.status(500).json({ error: 'Failed to create gadget.' });
    }
  }
);


// PATCH /gadgets/:id - Update gadget (prevent updating protected fields)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found.' });
    }

    // Prevent updating protected fields
    const { codename, ...updateFields } = req.body;
    await gadget.update(updateFields);

    res.status(200).json(gadget);
  } catch (error) {
    console.error('Error updating gadget:', error);
    res.status(500).json({ error: 'Failed to update gadget.' });
  }
});

// DELETE /gadgets/:id - Soft delete (mark as decommissioned)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found.' });
    }

    await gadget.update({ isDeleted: true, decommissionedAt: new Date() });
    res.status(200).json({ message: 'Gadget decommissioned successfully.' });
  } catch (error) {
    console.error('Error decommissioning gadget:', error);
    res.status(500).json({ error: 'Failed to decommission gadget.' });
  }
});

const selfDestructCodes = {}; // Temporary storage (will reset when server restarts)

router.post('/:id/self-destruct', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found.' });
    }

    // Generate a 6-character alphanumeric confirmation code
    const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Set expiration time (5 minutes from now)
    selfDestructCodes[id] = {
      code: confirmationCode,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes in milliseconds
    };

    res.status(200).json({ confirmationCode, message: "Use this code to confirm self-destruction within 5 minutes." });
  } catch (error) {
    console.error('Error initiating self-destruct:', error);
    res.status(500).json({ error: 'Failed to initiate self-destruct sequence.' });
  }
});

router.delete('/:id/self-destruct/:code', authenticateToken, async (req, res) => {
    try {
      const { id, code } = req.params;
      const gadget = await Gadget.findByPk(id);
  
      if (!gadget) {
        return res.status(404).json({ error: 'Gadget not found.' });
      }
  
      // Check if a valid confirmation code exists
      const storedCode = selfDestructCodes[id];
  
      if (!storedCode || storedCode.code !== code) {
        return res.status(400).json({ error: 'Invalid or expired confirmation code.' });
      }
  
      // Check expiration time
      if (Date.now() > storedCode.expiresAt) {
        delete selfDestructCodes[id]; // Remove expired code
        return res.status(400).json({ error: 'Confirmation code expired. Request a new one.' });
      }
  
      // Perform self-destruction (delete gadget)
      await gadget.destroy();
  
      // Remove code from temporary storage after successful destruction
      delete selfDestructCodes[id];
  
      res.status(200).json({ message: 'Gadget successfully self-destructed.' });
    } catch (error) {
      console.error('Error executing self-destruct:', error);
      res.status(500).json({ error: 'Failed to execute self-destruct.' });
    }
  });
  

module.exports = router;
