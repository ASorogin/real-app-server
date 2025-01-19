const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
    getProfile,
    updateProfile,
    updatePassword,
    updateEmail
} = require('../controllers/profile');
const { validateProfileUpdate, validatePasswordUpdate, validateEmailUpdate } = require('../middlewares/validate');

router.get('/', auth, getProfile);
router.put('/', auth, validateProfileUpdate, updateProfile);
router.put('/password', auth, validatePasswordUpdate, updatePassword);
router.put('/email', auth, validateEmailUpdate, updateEmail);

module.exports = router;