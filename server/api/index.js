const app = require('../app');

// Export the serverless function handler
module.exports = (req, res) => {
  return app(req, res);
};