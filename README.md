# Helm Chart Generator

## Overview

The Helm Chart Generator is a Node.js application designed to dynamically generate Helm chart files for microservices based on user-defined parameters. It automatically configures dependencies and generates appropriate configurations based on the service type.

## Features

- Generates Helm chart files based on input parameters
- Supports both static and dynamic deployment configurations
- Automatic dependency management for supported services
- Templated configurations for PostgreSQL and Redis
- Customizable deployment paths

## Supported Services

| Service | Dependencies |
|---------|-------------|
| cerra-gen-ai | PostgreSQL, Redis |
| auto-approver | PostgreSQL |
| landing-page | Basic microservice |
| frontend-app | Basic microservice |

## Project Structure

```
helm-chart-generator
├── src
│   ├── generators
│   │   ├── chart.js
│   │   ├── values.js
│   │   ├── defaults.js
│   │   └── dependencies.js
│   ├── templates
│   │   ├── chart.yaml
│   │   ├── values.yaml
│   │   └── values.default.yaml
│   ├── constants.js
│   └── app.js
├── package.json
└── README.md
```

## Usage

```bash
node src/app.js \
  --service-name <service-name> \
  --namespace <namespace> \
  --environment <env> \
  --type <type> \
  [--config-path <path>] \
  [--output-path <path>]
```

### Parameters

- `service-name`: Name of the microservice (e.g., cerra-gen-ai, auto-approver)
- `namespace`: Kubernetes namespace
- `environment`: Target environment (dev, prod, etc.)
- `type`: Deployment type (static or dynamic)
- `config-path`: (Optional) Path to environment-specific configuration file
- `output-path`: (Optional) Base directory for generated files. Defaults to current directory.

### Output Structure

- Static deployments: `apps/<service-name>/<environment>/`
- Dynamic deployments: `temporary/<namespace>/<service-name>/`

### Generated Files

- `Chart.yaml`: Helm chart definition with auto-configured dependencies
- `values.yaml`: Environment-specific configuration with dependency settings
- `values.default.yaml`: Default configuration values

## Dependencies

Currently supports automatic configuration for:
- PostgreSQL (Bitnami chart v12.12.10)
- Redis (Bitnami chart v20.11.5)
- Microservice (Rewardz chart v0.1.0)

## Examples

```bash
# Generate with default config path
node src/app.js --service-name cerra-gen-ai --namespace dev --environment prod --type static

# Generate with custom config path
node src/app.js --service-name auto-approver --namespace testing --environment dev --type dynamic --config-path ./configs/dev.yaml

# Generate in current directory
node src/app.js --service-name cerra-gen-ai --namespace dev --environment prod --type static

# Generate in specific directory
node src/app.js \
  --service-name auto-approver \
  --namespace testing \
  --environment dev \
  --type dynamic \
  --output-path /path/to/gitops/repo
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.