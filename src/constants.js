/**
 * @typedef {Object} DeploymentParams
 * @property {string} serviceName - Name of the service
 * @property {string} namespace - Kubernetes namespace
 * @property {string} environment - Deployment environment
 * @property {'static' | 'dynamic'} type - Type of deployment
 */

/**
 * Valid deployment types
 * @type {Object.<string, string>}
 */
const DEPLOYMENT_TYPES = {
  STATIC: 'static',
  DYNAMIC: 'dynamic'
};

const BASE_PATHS = {
  STATIC: 'apps',
  DYNAMIC: 'temporary'
};

const DEFAULT_OUTPUT_BASE = process.cwd();

module.exports = {
  DEPLOYMENT_TYPES,
  BASE_PATHS,
  DEFAULT_OUTPUT_BASE
};
