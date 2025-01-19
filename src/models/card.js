const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    bizName: {
        type: String,
        required: [true, 'Business name is required'],
        minlength: [2, 'Business name should be at least 2 characters'],
        maxlength: [255, 'Business name cannot exceed 255 characters']
    },
    bizDescription: {
        type: String,
        required: [true, 'Business description is required'],
        minlength: [2, 'Business description should be at least 2 characters'],
        maxlength: [1024, 'Business description cannot exceed 1024 characters']
    },
    bizAddress: {
        type: String,
        required: [true, 'Business address is required'],
        minlength: [2, 'Business address should be at least 2 characters'],
        maxlength: [400, 'Business address cannot exceed 400 characters']
    },
    bizPhone: {
        type: String,
        required: [true, 'Business phone is required'],
        minlength: [9, 'Business phone should be at least 9 characters'],
        maxlength: [10, 'Business phone cannot exceed 10 characters']
    },
    bizImage: {
        type: String,
        required: [true, 'Business image is required'],
        minlength: [11, 'Business image URL should be at least 11 characters'],
        maxlength: [1024, 'Business image URL cannot exceed 1024 characters']
    },
    bizNumber: {
        type: String,
        required: true,
        unique: true,
        default: () => Math.floor(Math.random() * 10000000).toString()
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add text index for full-text search
cardSchema.index({ 
    bizName: 'text', 
    bizDescription: 'text', 
    bizAddress: 'text' 
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;