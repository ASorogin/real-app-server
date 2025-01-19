const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { validateUser, validateUserUpdate } = require('../middlewares/validate');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

// Public route
router.post('/', validateUser, createUser);

// Protected routes
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, validateUserUpdate, updateUser);
router.delete('/:id', auth, deleteUser);

module.exports = router;