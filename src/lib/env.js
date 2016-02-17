const prod = process.env.NODE_ENV === 'production';

/**
 * An object with environment stuff.
 *
 * @type {Object}
 */
module.exports = {
  /**
   * Are we in production?
   */
  prod,
  /**
   * Are we in development?
   */
  dev: !prod
};