const { generateDependencyConfig, generateChartDependencies } = require('../dependencies');

describe('Dependencies Generator', () => {
  const testParams = {
    serviceName: 'cerra-gen-ai',
    environment: 'dev',
    namespace: 'test'
  };

  test('generateChartDependencies returns correct dependencies for cerra-gen-ai', () => {
    const deps = generateChartDependencies(testParams);
    expect(deps).toHaveLength(3);
    expect(deps.map(d => d.name)).toEqual(['microservice', 'postgresql', 'redis']);
  });

  test('generateDependencyConfig includes postgresql and redis for cerra-gen-ai', () => {
    const config = generateDependencyConfig(testParams);
    expect(config).toContain('postgresql:');
    expect(config).toContain('redis:');
  });
});
