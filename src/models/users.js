const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name should be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please enter a valid email'
        ],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters']
    },
    biz: {
        type: Boolean,
        required: [true, 'Business status is required']
    },
    
    phone: {
        type: String,
        match: [/^0[2-9]\d{7,8}$/, 'Please enter a valid phone number'],
        sparse: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    bio: {
        type: String,
        maxlength: [1024, 'Bio cannot exceed 1024 characters']
    },
    image: {
        type: String,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    },
    website: {
        type: String,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    }
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
});

    userSchema.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };

const User = mongoose.model('User', userSchema);

module.exports = User;