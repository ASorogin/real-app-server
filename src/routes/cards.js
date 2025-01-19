const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { validateCard, validateCardUpdate } = require('../middlewares/validate');
const {
    getCards,
    getMyCards,
    getCard,
    createCard,
    updateCard,
    deleteCard,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    searchCards    
} = require('../controllers/cards');


router.get('/search', searchCards);

// Favorites routes
router.get('/favorites', auth, getFavorites);
router.post('/favorites/:id', auth, addToFavorites);
router.delete('/favorites/:id', auth, removeFromFavorites);

// Card routes with my-cards
router.get('/my-cards', auth, getMyCards);

// Regular CRUD routes
router.get('/', getCards);
router.post('/', auth, validateCard, createCard);
router.get('/:id', getCard);
router.put('/:id', auth, validateCardUpdate, updateCard);
router.delete('/:id', auth, deleteCard);

module.exports = router;