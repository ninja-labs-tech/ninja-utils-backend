const Joi = require('@hapi/joi');

module.exports = (request) => {
  const schema = Joi.object({
    file: Joi.string().required()
  });

  return schema.validate(request);
};