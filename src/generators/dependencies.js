const DEPENDENCIES = {
  postgresql: {
    name: 'postgresql',
    repository: 'https://charts.bitnami.com/bitnami',
    version: '12.12.10',
    config: (params) => `
postgresql:
  auth:
    username: ${params.serviceName}
    database: ${params.serviceName}-db
    existingSecret: ${params.serviceName}-${params.environment}-secret
    secretKeys:
      userPasswordKey: DB_PASSWORD
      adminPasswordKey: DB_PASSWORD
  fullnameOverride: ${params.serviceName}-db`
  },
  redis: {
    name: 'redis',
    repository: 'https://charts.bitnami.com/bitnami',
    version: '20.11.5',
    config: (params) => `
redis:
  auth:
    enabled: false
    existingSecret: ${params.serviceName}-${params.environment}-secret
    existingSecretPasswordKey: REDIS_PASSWORD
  master:
    persistence:
      storageClass: "gp3"
      size: 1Gi
    resources:
      requests:
        cpu: 64m
        memory: 64Mi
      limits:
        cpu: 128m
        memory: 128Mi
  replica:
    replicaCount: 0
  fullnameOverride: redis-${params.serviceName}`
  },
  microservice: {
    name: 'microservice',
    repository: 'https://rewardz.github.io/kubernetes-charts/',
    version: '0.1.0'
  }
};

const SERVICE_DEPENDENCIES = {
  'cerra-gen-ai': ['microservice', 'postgresql', 'redis'],
  'auto-approver': ['microservice', 'postgresql'],
  'landing-page': ['microservice'],
  'frontend-app': ['microservice']
};

function getDependenciesForService(serviceName) {
  // Return mapped dependencies or default to just microservice
  return SERVICE_DEPENDENCIES[serviceName] || ['microservice'];
}

function generateDependencyConfig(params) {
  const deps = getDependenciesForService(params.serviceName);
  return deps
    .map(dep => DEPENDENCIES[dep].config?.(params))
    .filter(Boolean)
    .join('\n\n');
}

function generateChartDependencies(params) {
  const deps = getDependenciesForService(params.serviceName);
  return deps.map(dep => {
    const { name, repository, version } = DEPENDENCIES[dep];
    return { name, repository, version };
  });
}

module.exports = {
  generateDependencyConfig,
  generateChartDependencies
};
