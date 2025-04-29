const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { generateDependencyConfig } = require('./dependencies');

function generateValues(params, outputDir) {
  // Read environment specific config
  const envConfigPath = params.configPath || path.join(process.cwd(), `${params.environment}.yaml`);
  if (!fs.existsSync(envConfigPath)) {
    throw new Error(`Environment config file not found: ${envConfigPath}`);
  }
  const envConfig = yaml.load(fs.readFileSync(envConfigPath, 'utf-8'));

  // Create base values structure
  let values = {
    config: {
      namespace: params.namespace
    },
    microservice: {
      image: `${params.serviceName}:latest`,
      ...envConfig
    }
  };

  // Add dependency configurations
  const depConfig = generateDependencyConfig(params);
  if (depConfig) {
    values = { ...values, ...yaml.load(depConfig) };
  }

  fs.writeFileSync(
    path.join(outputDir, 'values.yaml'), 
    yaml.dump(values, { lineWidth: -1 })
  );
}

module.exports = { generateValues };
