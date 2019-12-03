const Joi = require('@hapi/joi');

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  })
  const validate = schema.validate(data);
  return validate;
}

module.exports = loginValidation;