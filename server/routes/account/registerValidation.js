const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email Address"),
    username: Joi.string().required().min(6).regex(/^[a-z0-9_]*$/).label("Username").messages({ "string.pattern.base": "Invalid username. Allowed characters are a-z (only lower case), 0-9, and _ (underscores)." }),
    password: Joi.string().required().min(8).regex(/^\S*$/).max(20).label("Password").messages({ "string.pattern.base": "Password must not contain any spaces." }),
    confirmPassword: Joi.any().required().equal(Joi.ref('password')).messages({ "any.only": "Passwords does not match." })
  })
  const validate = schema.validate(data);
  return validate;
}

module.exports = registerValidation;