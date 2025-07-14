const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust path as needed

// POST /api/maintenance/log
router.post('/log', async (req, res) => {
  const { component_id, service_type, notes } = req.body;

  if (!component_id || !service_type) {
    return res.status(400).json({ error: 'component_id and service_type are required' });
  }

  try {
    await db.execute(
      `INSERT INTO service_logs (component_id, service_type, notes) VALUES (?, ?, ?)`,
      [component_id, service_type, notes || null]
    );

    res.status(201).json({ message: '✅ Service log recorded successfully' });
  } catch (error) {
    console.error('Service log error:', error);
    res.status(500).json({ error: 'Failed to record service' });
  }
});
router.get('/status/:component_id', async (req, res) => {
  const component_id = req.params.component_id;

  try {
    const [rows] = await db.execute(
      `SELECT serviced_at FROM service_logs WHERE component_id = ? ORDER BY serviced_at DESC LIMIT 1`,
      [component_id]
    );

    if (rows.length === 0) {
      return res.json({
        last_service: null,
        next_service: null,
        message: 'No service records found for this component'
      });
    }

    const lastServiceDate = rows[0].serviced_at;
    const nextServiceDate = new Date(lastServiceDate);
    nextServiceDate.setDate(nextServiceDate.getDate() + 30); // add 30 days

    res.json({
      last_service: lastServiceDate,
      next_service: nextServiceDate
    });
  } catch (error) {
    console.error('Service status error:', error);
    res.status(500).json({ error: 'Failed to fetch service status' });
  }
});





module.exports = router;
