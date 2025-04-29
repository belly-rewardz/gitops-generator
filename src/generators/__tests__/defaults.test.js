const fs = require('fs');
const path = require('path');
const { generateDefaults } = require('../defaults');

jest.mock('fs');

describe('Defaults Generator', () => {
  const testParams = {
    serviceName: 'test-service',
    namespace: 'test'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    fs.readFileSync.mockReturnValue('namespace: {namespace}\nname: {service-name}');
  });

  test('replaces placeholders correctly', () => {
    generateDefaults(testParams, '/tmp');
    
    const writeFileSync = fs.writeFileSync.mock.calls[0];
    const content = writeFileSync[1];

    expect(content).toContain('namespace: test');
    expect(content).toContain('name: test-service');
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
