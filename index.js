require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const gadgetRoutes = require('./routes/gadgetRoutes');
const agentRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/api/agents', agentRoutes); 
app.use('/api/gadgets', gadgetRoutes);


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
