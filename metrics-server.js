const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Simple metrics endpoint that returns JSON data
app.get('/metrics', (req, res) => {
  // Generate some random data
  const now = Date.now();
  const data = [];
  
  // Generate data points for the last 6 hours (with 5-minute intervals)
  for (let i = 0; i < 72; i++) {
    data.push({
      time: now - (i * 5 * 60 * 1000), // 5 minutes intervals going back
      value: Math.random() * 100 // Random value between 0-100
    });
  }
  
  res.json(data);
});

app.listen(port, () => {
  console.log(`Metrics server running at http://localhost:${port}`);
});
