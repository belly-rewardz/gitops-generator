const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function generateDefaults(params, outputDir) {
  const defaultValues = {
    config: {
      namespace: params.namespace
    },
    microservice: {
      servicePort: 80,
      ingress: {
        annotations: {
          'kubernetes.io/ingress.class': 'nginx-private',
          'nginx.ingress.kubernetes.io/proxy-body-size': '50m',
          'nginx.ingress.kubernetes.io/use-regex': 'true',
          'nginx.ingress.kubernetes.io/rewrite-target': '/$1'
        }
      }
    }
  };

  fs.writeFileSync(
    path.join(outputDir, 'values.default.yaml'),
    yaml.dump(defaultValues, { lineWidth: -1 })
  );
}

module.exports = { generateDefaults };
