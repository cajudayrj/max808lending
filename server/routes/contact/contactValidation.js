const Joi = require('@hapi/joi');

const contactValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(6).label("Full Name"),
    contactNum: Joi.number().allow(null).label("Contact Number"),
    email: Joi.string().email().required().label("Email"),
    message: Joi.string().required().label("Message"),
  })
  const validate = schema.validate(data);
  return validate;
}

module.exports.contactValidation = contactValidation;