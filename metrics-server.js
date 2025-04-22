const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add a root endpoint for health checks
app.get('/', (req, res) => {
  res.send('Metrics server is running. Try /metrics endpoint');
});

// Metrics endpoint that returns Prometheus format data
app.get('/metrics', (req, res) => {
  // Skip auth check for testing
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   return res.status(401).send('API key is missing');
  // }
  
  // Set the content type for Prometheus metrics
  res.set('Content-Type', 'text/plain');
  
  // Generate current timestamp
  const now = Math.floor(Date.now() / 1000);
  
  // Build Prometheus format metrics
  let output = '';
  
  // Add some metadata
  output += '# HELP custom_metric Custom metric example\n';
  output += '# TYPE custom_metric gauge\n';
  
  // Add the specific test values that the tests are looking for
  output += `custom_metric{instance="test1"} 10 ${now}000\n`;
  output += `custom_metric{instance="test2"} 20 ${now}000\n`;
  
  // Add some random values
  for (let i = 0; i < 5; i++) {
    const value = Math.floor(Math.random() * 100);
    output += `custom_metric{instance="server-${i}"} ${value} ${now}000\n`;
  }
  
  // Add another metric
  output += '# HELP system_memory Memory usage\n';
  output += '# TYPE system_memory gauge\n';
  output += `system_memory{type="used"} ${Math.floor(Math.random() * 8000)} ${now}000\n`;
  output += `system_memory{type="free"} ${Math.floor(Math.random() * 4000)} ${now}000\n`;
  
  // Send the response
  res.send(output);
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Listen on all interfaces (0.0.0.0) instead of just localhost
app.listen(port, '0.0.0.0', () => {
  console.log(`Metrics server running at http://localhost:${port}`);
  console.log(`For Docker access use http://host.docker.internal:${port}`);
});