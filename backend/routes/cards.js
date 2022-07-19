const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { createCardSchema, cardIdSchema } = require('./validation');

router.get('/cards', getAllCards);
router.post('/cards', auth, createCardSchema, createCard);
router.delete('/cards/:cardId', auth, cardIdSchema, deleteCard);
router.put('/cards/:cardId/likes', auth, cardIdSchema, likeCard);
router.delete('/cards/:cardId/likes', auth, cardIdSchema, dislikeCard);

module.exports = router;
