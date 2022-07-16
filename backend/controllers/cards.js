const Card = require('../models/card');
const NotFoundError = require('../utils/notfounderror');
const AuthorizationError = require('../utils/autherror');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('Cards not found.');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  Card.create(req.body)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => {
      throw new AuthorizationError('Unauthorized card deletion request', 403);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card id not found.');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Card id not found.');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
