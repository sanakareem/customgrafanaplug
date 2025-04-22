# Custom Metrics Datasource - Grafana Plugin

This project implements a custom Grafana backend plugin that displays metrics in Prometheus format. The implementation consists of a Go backend plugin for Grafana, a Node.js metrics server, and a Docker environment that ties everything together.

## Project Structure

- `pkg/plugin`: Go backend plugin implementation
- `src`: TypeScript frontend code for the Grafana plugin
- `metrics-server.js`: Node.js server that provides metrics
- `provisioning`: Grafana provisioning files for data sources and dashboards
- `docker-compose.yaml`: Docker environment configuration
- `start-services.sh`: Script to start all services

## Components

### 1. Grafana Backend Plugin (Go)

The backend plugin is implemented in Go and handles data queries from Grafana. It processes metrics data and returns it in a format that Grafana can visualize.

Key features:
- Implements required plugin interfaces
- Handles data queries from Grafana
- Returns time series data for visualization

### 2. Metrics Server (Node.js)

A Node.js server that provides metrics in Prometheus format. This server exposes an endpoint that returns metrics data including:

- Custom metrics with test values
- Random generated metrics for demonstration
- System memory usage metrics

The server is configured to:
- Run on port 3001
- Allow CORS for all origins
- Listen on all interfaces for Docker compatibility
- Return data in Prometheus text format

### 3. Docker Environment

The project uses Docker to run Grafana with the custom plugin. The Docker configuration:
- Mounts the plugin into Grafana
- Configures provisioning for data sources and dashboards
- Sets up authentication and security settings
- Configures network settings for service communication

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js v14+
- Go 1.20+

### Running the Application

1. Build the plugin:
   
   npm run build
 

2. Start all services using the provided script:
  
   chmod +x start-services.sh
   ./start-services.sh
  

The script performs the following steps:
- Stops any existing containers
- Starts Grafana with the plugin
- Waits for Grafana to initialize
- Provides instructions for starting the metrics server

3. In a separate terminal, start the metrics server if needed:
  
   node metrics-server.js
   

4. Access Grafana at http://localhost:3000
   - Username: admin
   - Password: admin

5. Navigate to the pre-provisioned "Custom Metrics Dashboard" to view the metrics

## Notes

- The implementation connects to Grafana's internal metrics endpoint for visualization
- The datasource is configured to use localhost:3000
- For external metrics server connectivity (port 3001), additional Docker networking configuration may be required

## Development

To modify the plugin:
1. Make your changes to the source code
2. Run `npm run build` to build the plugin
3. Restart the services using `./start-services.sh`

## Troubleshooting

- If Grafana fails to start, check Docker logs: `docker-compose logs grafana`
- If the metrics aren't showing, ensure the metrics server is running
- For connection issues, check firewall settings and Docker network configuration