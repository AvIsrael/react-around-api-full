const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAllCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { createCardSchema, cardIdSchema } = require('./validation');

router.get('/cards', getAllCards);
router.post('/cards', auth, createCardSchema, createCard);
router.delete('/cards/:id', auth, cardIdSchema, deleteCard);
router.put('/cards/:id/likes', auth, cardIdSchema, likeCard);
router.delete('/cards/:id/likes', auth, cardIdSchema, dislikeCard);

module.exports = router;
