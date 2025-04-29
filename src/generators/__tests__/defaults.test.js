const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { generateDefaults } = require('../defaults');

jest.mock('fs');

describe('Defaults Generator', () => {
  const testParams = {
    serviceName: 'test-service',
    namespace: 'test'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generates default values with correct structure', () => {
    generateDefaults(testParams, '/tmp');
    
    const writeFileSync = fs.writeFileSync.mock.calls[0];
    const content = yaml.load(writeFileSync[1]);

    expect(content).toEqual({
      config: {
        namespace: 'test'
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
    });
  });

  test('writes to correct path', () => {
    const outputDir = '/test/output';
    generateDefaults(testParams, outputDir);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(outputDir, 'values.default.yaml'),
      expect.any(String)
    );
  });
});
