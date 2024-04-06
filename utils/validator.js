const Joi = require("joi");

const productValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
});

const editProductValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string(),
});

module.exports = { productValidator, editProductValidator };