const fs = require('fs');
const path = require('path');
const { generateChartDependencies } = require('./dependencies');

function generateChart(params, outputDir) {
  const dependencies = generateChartDependencies(params);
  const dependenciesYaml = dependencies
    .map(dep => `  - name: ${dep.name}\n    repository: ${dep.repository}\n    version: "${dep.version}"`)
    .join('\n');

  const chart = `apiVersion: v2
name: ${params.serviceName}
description: A Helm chart for the ${params.serviceName} application
type: application
version: 0.1.0
appVersion: "1.0"
dependencies:
${dependenciesYaml}`;

  fs.writeFileSync(path.join(outputDir, 'Chart.yaml'), chart);
}

module.exports = { generateChart };
