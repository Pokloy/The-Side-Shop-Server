// vercelHandler.js
const { app } = require('./index');

module.exports = (req, res) => {
  app(req, res); // Redirect all requests to your existing Express app
};
