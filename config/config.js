const config = require('./config.json');
const envConfig = config['constants'];

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
});
