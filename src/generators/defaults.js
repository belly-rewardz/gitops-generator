const fs = require('fs');
const path = require('path');

function generateDefaults(params, outputDir) {
  const template = fs.readFileSync(
    path.join(__dirname, '..', 'templates', 'values.default.yaml'),
    'utf-8'
  );

  const defaults = template
    .replace(/{namespace}/g, params.namespace)
    .replace(/{service-name}/g, params.serviceName);

  fs.writeFileSync(path.join(outputDir, 'values.default.yaml'), defaults);
}

module.exports = { generateDefaults };
