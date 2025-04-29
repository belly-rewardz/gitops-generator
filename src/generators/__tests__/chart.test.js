const fs = require('fs');
const path = require('path');
const { generateChart } = require('../chart');

jest.mock('fs');

describe('Chart Generator', () => {
  const testParams = {
    serviceName: 'test-service',
    environment: 'dev',
    namespace: 'test'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('generates correct chart content', () => {
    generateChart(testParams, '/tmp');
    
    const writeFileSync = fs.writeFileSync.mock.calls[0];
    const content = writeFileSync[1];

    expect(content).toContain('name: test-service');
    expect(content).toContain('description: A Helm chart for the test-service application');
    expect(content).toContain('repository: https://rewardz.github.io/kubernetes-charts/');
  });

  test('writes to correct output path', () => {
    const outputDir = '/test/output';
    generateChart(testParams, outputDir);
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(outputDir, 'Chart.yaml'),
      expect.any(String)
    );
  });
});
