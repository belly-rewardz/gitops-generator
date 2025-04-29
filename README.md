# GitOps Generator

## Overview

The GitOps Generator is a Node.js application designed to dynamically generate Helm chart files for microservices based on user-defined parameters. It automatically configures dependencies and generates appropriate configurations based on the service type.

## Features

- Dynamically generates Helm chart files for microservices deployment with GitOps approach
- Supports both static and dynamic deployment configurations
- Automatic dependency management for supported services
- Templated configurations for PostgreSQL and Redis
- Customizable deployment paths

## Supported Services

| Service         | Dependencies         |
|-----------------|----------------------|
| cerra-gen-ai    | PostgreSQL, Redis    |
| auto-approver   | PostgreSQL           |
| landing-page    | Basic microservice   |
| frontend-app    | Basic microservice   |

## Project Structure

```
gitops-generator
├── src/
│   ├── generators/
│   │   ├── __tests__/         # Test files
│   │   ├── chart.js
│   │   ├── values.js
│   │   ├── defaults.js
│   │   └── dependencies.js
│   ├── templates/
│   │   ├── chart.yaml
│   │   ├── values.yaml
│   │   └── values.default.yaml
│   ├── constants.js
│   └── app.js
├── .eslintrc.js              # ESLint configuration
├── .gitignore                # Git ignore rules
├── jest.config.js            # Jest configuration
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

## Development

### Setup

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Linting

The project uses ESLint with recommended rules and additional customizations:
- Enforces semicolons
- Requires single quotes
- Warns about console usage
- Warns about unused variables

### Testing

Tests are written using Jest and can be found in `__tests__` directories. The test suite includes:
- Unit tests for core functionality
- Coverage reporting
- Watch mode for development

Current test coverage:
- Statements: 100%
- Branches: 50%
- Functions: 100%
- Lines: 100%

## Contributing

1. Ensure all tests pass: `npm test`
2. Ensure code follows linting rules: `npm run lint`
3. Add tests for any new functionality
4. Update documentation as needed

## License

This project is licensed under the MIT License. See the LICENSE file for details.