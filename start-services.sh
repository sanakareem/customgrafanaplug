#!/bin/bash

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Start fresh containers
echo "Starting Grafana..."
docker-compose up -d

# Wait for Grafana to be ready
echo "Waiting for Grafana to start (30 seconds)..."
sleep 30

echo "Grafana should now be running on http://localhost:3000"
echo "Start the metrics server in a separate terminal with: node metrics-server.js"