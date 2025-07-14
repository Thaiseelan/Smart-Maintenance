const express = require('express');
const router = express.Router();
const db = require('../db');

// Add/Register a recipient
router.post('/register', async (req, res) => {
  const { name, chat_id } = req.body;
  if (!chat_id) return res.status(400).json({ error: 'chat_id required' });

  try {
    await db.execute(
      `INSERT INTO notification_recipients (name, chat_id) VALUES (?, ?)`,
      [name || null, chat_id]
    );
    res.json({ message: 'Recipient registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB insert failed' });
  }
});

// List all recipients
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM notification_recipients`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB query failed' });
  }
});

// Activate/deactivate recipient
router.patch('/toggle/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.execute(
      `UPDATE notification_recipients SET is_active = NOT is_active WHERE id = ?`,
      [id]
    );
    res.json({ message: 'Recipient toggled' });
  } catch (err) {
    res.status(500).json({ error: 'DB update failed' });
  }
});

module.exports = router;
