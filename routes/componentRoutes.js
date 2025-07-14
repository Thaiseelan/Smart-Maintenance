// routes/componentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/sql');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM components');
    res.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Failed to fetch components' });
  }
});

module.exports = router;
