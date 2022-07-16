const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAllUsers, getUser, createUser, updateProfile, updateAvatar, getCurrentUser, login,
} = require('../controllers/users');

const {
  getUserSchema, createUserSchema, loginSchema, updateUserSchema, updateAvatarSchema,
} = require('./validation');

router.get('/users', auth, getAllUsers);
router.get('/users/me', auth, getCurrentUser);
router.get('/users/:id', auth, getUserSchema, getUser);
router.post('/signup', createUserSchema, createUser);
router.post('/signin', loginSchema, login);
router.patch('/users/me', auth, updateUserSchema, updateProfile);
router.patch('/users/me/avatar', auth, updateAvatarSchema, updateAvatar);

module.exports = router;
