const prod = process.env.NODE_ENV === 'production';
const yenv = require('yenv');

/**
 * An object with environment stuff.
 *
 * @type {Object}
 */
module.exports = Object.assign(
  {
    /**
     * Are we in production?
     */
    prod,
    /**
     * Are we in development?
     */
    dev: !prod
  },
  // Load environment variables from env.yaml.
  yenv()
);