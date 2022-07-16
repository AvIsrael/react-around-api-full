const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateLink = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

module.exports.createCardSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().custom(validateLink).required(),
  }),
});

module.exports.cardIdSchema = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().min(24).max(24).required() }),
});

module.exports.createUserSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateLink),
  }),
});

module.exports.loginSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.getUserSchema = celebrate({
  params: Joi.object().keys({
    id: Joi.string().min(24).max(24).required(),
  }),
});

module.exports.updateUserSchema = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    })
    .min(1),
});

module.exports.updateAvatarSchema = celebrate({
  body: Joi.object().keys({ avatar: Joi.string().custom(validateLink) }),
});
