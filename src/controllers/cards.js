const Card = require('../models/card');
const User = require('../models/users');
const { getPaginationParams, getSortParams } = require('../utils/pagination');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { buildSearchFilter } = require('../utils/filterBuilder');
const asyncHandler = require('../middlewares/asyncHandler');
const { buildSearchQuery, buildSortOptions } = require('../utils/searchBuilder');

// Base CRUD operations
exports.getCards = asyncHandler(async (req, res) => {
    const { page, limit, skip } = getPaginationParams(req.query);
    const sort = getSortParams(req.query.sort);
    const filter = buildSearchFilter({}, req.query.search);

    const [cards, total] = await Promise.all([
        Card.find(filter).sort(sort).limit(limit).skip(skip),
        Card.countDocuments(filter)
    ]);

    successResponse(res, {
        cards,
        currentPage: page,
        pages: Math.ceil(total / limit),
        total
    });
});

exports.getMyCards = asyncHandler(async (req, res) => {
    const { page, limit, skip } = getPaginationParams(req.query);
    const sort = getSortParams(req.query.sort);
    const filter = buildSearchFilter({ user_id: req.user.id }, req.query.search);

    const [cards, total] = await Promise.all([
        Card.find(filter).sort(sort).limit(limit).skip(skip),
        Card.countDocuments(filter)
    ]);

    successResponse(res, {
        cards,
        currentPage: page,
        pages: Math.ceil(total / limit),
        total
    });
});

exports.getCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    if (!card) {
        return errorResponse(res, 'Card not found', 404);
    }
    successResponse(res, card);
});

exports.createCard = asyncHandler(async (req, res) => {
    if (!req.user.biz) {
        return errorResponse(res, 'Access denied. Not a business user', 403);
    }

    const card = new Card({
        ...req.body,
        user_id: req.user.id
    });

    await card.save();
    successResponse(res, card, 201);
});

exports.updateCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
        return errorResponse(res, 'Card not found', 404);
    }
    
    if (card.user_id.toString() !== req.user.id) {
        return errorResponse(res, 'Access denied. Not the card owner', 403);
    }

    const updatedCard = await Card.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    successResponse(res, updatedCard);
});

exports.deleteCard = asyncHandler(async (req, res) => {
    const card = await Card.findById(req.params.id);
    
    if (!card) {
        return errorResponse(res, 'Card not found', 404);
    }
    
    if (card.user_id.toString() !== req.user.id) {
        return errorResponse(res, 'Access denied. Not the card owner', 403);
    }

    await Card.findByIdAndDelete(req.params.id);
    successResponse(res, { message: 'Card deleted successfully' });
});

// Favorite operations
exports.getFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites');
    successResponse(res, user.favorites);
});

exports.addToFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const card = await Card.findById(req.params.id);

    if (!card) {
        return errorResponse(res, 'Card not found', 404);
    }

    if (user.favorites.includes(card._id)) {
        return errorResponse(res, 'Card already in favorites', 400);
    }

    user.favorites.push(card._id);
    await user.save();

    successResponse(res, { message: 'Card added to favorites' });
});

exports.removeFromFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const card = await Card.findById(req.params.id);

    if (!card) {
        return errorResponse(res, 'Card not found', 404);
    }

    if (!user.favorites.includes(card._id)) {
        return errorResponse(res, 'Card not in favorites', 400);
    }

    user.favorites = user.favorites.filter(id => id.toString() !== card._id.toString());
    await user.save();

    successResponse(res, { message: 'Card removed from favorites' });
});

exports.searchCards = asyncHandler(async (req, res) => {
    const { page, limit, skip } = getPaginationParams(req.query);
    const searchQuery = buildSearchQuery(req.query);
    const sortOptions = buildSortOptions(req.query.sort);

    const projection = req.query.q ? 
        { score: { $meta: "textScore" } } : 
        {};

    const cards = await Card.find(searchQuery, projection)
        .sort(sortOptions)
        .limit(limit)
        .skip(skip);

    const total = await Card.countDocuments(searchQuery);

    // Get search suggestions if search term exists
    let suggestions = [];
    if (req.query.q) {
        suggestions = await Card.aggregate([
            { 
                $match: { 
                    $text: { $search: req.query.q } 
                }
            },
            { 
                $project: {
                    bizName: 1,
                    score: { $meta: "textScore" }
                }
            },
            { 
                $sort: { score: -1 } 
            },
            { 
                $limit: 5 
            }
        ]);
    }

    successResponse(res, {
        cards,
        currentPage: page,
        pages: Math.ceil(total / limit),
        total,
        suggestions
    });
});