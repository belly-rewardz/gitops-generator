const fs = require('fs');
const path = require('path');
const { DEPLOYMENT_TYPES, BASE_PATHS, DEFAULT_OUTPUT_BASE } = require('./constants');
const { generateChart } = require('./generators/chart');
const { generateValues } = require('./generators/values');
const { generateDefaults } = require('./generators/defaults');

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    
    switch (key) {
      case 'service-name':
        params.serviceName = value;
        break;
      case 'namespace':
        params.namespace = value;
        break;
      case 'environment':
        params.environment = value;
        break;
      case 'type':
        if (!Object.values(DEPLOYMENT_TYPES).includes(value)) {
          throw new Error(`Invalid type. Must be one of: ${Object.values(DEPLOYMENT_TYPES).join(', ')}`);
        }
        params.type = value;
        break;
      case 'config-path':
        params.configPath = value;
        break;
      case 'output-path':
        params.outputBase = value;
        break;
    }
  }

  // Set default output base if not provided
  params.outputBase = params.outputBase || DEFAULT_OUTPUT_BASE;

  if (!params.serviceName || !params.namespace || !params.environment || !params.type) {
    throw new Error('Missing required parameters');
  }

  return params;
}

function getOutputPath(params) {
  if (params.type === DEPLOYMENT_TYPES.STATIC) {
    return path.join(params.outputBase, BASE_PATHS.STATIC, params.serviceName, params.environment);
  } else {
    return path.join(params.outputBase, BASE_PATHS.DYNAMIC, params.namespace, params.serviceName);
  }
}

async function main() {
  try {
    const params = parseArgs();
    const outputDir = getOutputPath(params);

    // Ensure output directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Generate chart files
    await Promise.all([
      generateChart(params, outputDir),
      generateValues(params, outputDir),
      generateDefaults(params, outputDir)
    ]);

    console.log(`Successfully generated Helm charts in ${outputDir}`);
  } catch (error) {
    console.error('Error generating Helm charts:', error);
    process.exit(1);
  }
}

module.exports = {
  parseArgs,
  getOutputPath
};

// Only run if directly executed
if (require.main === module) {
  main();
}
