// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//chat id  6571456440
const app = express();

app.use(cors());
app.use(bodyParser.json());

const componentRoutes = require('./routes/componentRoutes');
app.use('/api/components', componentRoutes);
const sensorRoutes = require('./routes/sensorRoutes');
app.use('/api/sensors', sensorRoutes);
const maintenanceRoutes = require('./routes/maintenanceRoutes');
app.use('/api/maintenance', maintenanceRoutes);
const notificationRoutes = require('./routes/notificationRecipients');
app.use('/api/notifications', notificationRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
