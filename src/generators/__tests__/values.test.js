const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { generateValues } = require('../values');

jest.mock('fs');
jest.mock('js-yaml');

describe('Values Generator', () => {
  const testParams = {
    serviceName: 'test-service',
    environment: 'dev',
    namespace: 'test',
    type: 'static'
  };

  const mockEnvConfig = {
    replicas: 2,
    resources: { limits: { cpu: '100m' } }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue('mock-content');
    yaml.load.mockReturnValue(mockEnvConfig);
  });

  test('throws error if config file not found', () => {
    fs.existsSync.mockReturnValue(false);
    expect(() => generateValues(testParams, '/tmp'))
      .toThrow(/Environment config file not found/);
  });

  test('generates values with correct structure', () => {
    generateValues(testParams, '/tmp');

    expect(yaml.dump).toHaveBeenCalledWith(
      expect.objectContaining({
        config: { namespace: 'test' },
        microservice: expect.objectContaining({
          image: 'test-service:latest',
          replicas: 2,
          resources: { limits: { cpu: '100m' } }
        })
      }),
      expect.any(Object)
    );
  });
});
