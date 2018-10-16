const config = require('./config.json');

const envConfig = process.env.NODE_ENV === 'test' ? config['testConstants'] : config['constants'];

Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
});
