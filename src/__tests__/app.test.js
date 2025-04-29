const fs = require('fs');
const path = require('path');
const { parseArgs, getOutputPath } = require('../app');
const { DEPLOYMENT_TYPES } = require('../constants');

jest.mock('fs');

describe('Application Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.argv = [
      'node',
      'app.js',
      '--service-name', 'test-service',
      '--namespace', 'test',
      '--environment', 'dev',
      '--type', 'static'
    ];
  });

  describe('parseArgs', () => {
    test('parses all required arguments', () => {
      const params = parseArgs();
      
      expect(params).toEqual({
        serviceName: 'test-service',
        namespace: 'test',
        environment: 'dev',
        type: 'static',
        outputBase: expect.any(String)
      });
    });

    test('throws error on missing required params', () => {
      process.argv = ['node', 'app.js'];
      expect(() => parseArgs()).toThrow('Missing required parameters');
    });

    test('throws error on invalid type', () => {
      process.argv = [...process.argv.slice(0, -1), 'invalid-type'];
      expect(() => parseArgs()).toThrow(/Invalid type/);
    });
  });

  describe('getOutputPath', () => {
    test('returns correct path for static deployment', () => {
      const params = {
        type: DEPLOYMENT_TYPES.STATIC,
        serviceName: 'test-service',
        environment: 'dev',
        outputBase: '/base'
      };

      expect(getOutputPath(params))
        .toBe('/base/apps/test-service/dev');
    });

    test('returns correct path for dynamic deployment', () => {
      const params = {
        type: DEPLOYMENT_TYPES.DYNAMIC,
        serviceName: 'test-service',
        namespace: 'test',
        outputBase: '/base'
      };

      expect(getOutputPath(params))
        .toBe('/base/temporary/test/test-service');
    });
  });
});
