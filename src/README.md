# Custom Metrics Datasource Plugin for Grafana

This project contains a custom Grafana backend plugin that connects to a simple REST server that serves metrics data.

## Project Structure

compunnel-task/
├── src/                       # Frontend TypeScript code
├── pkg/                       # Backend Go code
├── provisioning/              # Grafana provisioning files
│   ├── dashboards/            # Dashboard configurations
│   └── datasources/           # Datasource configurations
├── metrics-server.js          # Simple REST server for metrics
├── Dockerfile.metrics         # Dockerfile for metrics server
├── docker-compose.yml         # Docker Compose configuration
└── package.json               # NPM package configuration


## Setup and Running

### Prerequisites

Make sure you have the following installed:
- Node.js and npm
- Go (1.16 or later)
- Docker and Docker Compose

### Building and Running

1. Install dependencies for the plugin:

npm install

2. Build the plugin:


npm run build


3. Start the services using Docker Compose:


npm run start


4. Access Grafana at http://localhost:3000

The plugin, datasource, and a sample dashboard will be automatically provisioned.

### Development

For development, you can run the metrics server separately:


npm run start:dev


And then run the plugin in development mode:

npm run dev


## How It Works

1. The metrics server provides random data through the `/metrics` endpoint
2. The Grafana backend plugin connects to this server and fetches the data
3. The data is displayed in a time series panel in the dashboard

## Troubleshooting

- Check Docker logs: `docker-compose logs`
- Ensure the metrics server is running and accessible
- Verify that the plugin is loaded in Grafana (Settings > Plugins)
- Check the Grafana logs for any errors

## Next Steps

- Enhance the metrics server to provide more realistic data
- Add configuration options to the data source plugin
- Create more complex visualizations in the dashboard