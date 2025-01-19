const User = require('../models/users');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../middlewares/asyncHandler');
const bcrypt = require('bcrypt');

exports.getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    successResponse(res, user);
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const { password, email, biz, ...updateData } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
        return errorResponse(res, 'User not found', 404);
    }

    // Update user fields
    Object.assign(user, updateData);
    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');
    successResponse(res, updatedUser);
});

exports.updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return errorResponse(res, 'User not found', 404);
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
        return errorResponse(res, 'Current password is incorrect', 400);
    }

    // Update password directly
    user.password = newPassword;
    await user.save();  // This will trigger the pre('save') middleware

    successResponse(res, { message: 'Password updated successfully' });
});

exports.updateEmail = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return errorResponse(res, 'User not found', 404);
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return errorResponse(res, 'Password is incorrect', 400);
    }

    // Check if email is already in use
    const emailExists = await User.findOne({ email, _id: { $ne: user._id } });
    if (emailExists) {
        return errorResponse(res, 'Email is already in use', 400);
    }

    user.email = email;
    await user.save();

    const updatedUser = await User.findById(user._id).select('-password');
    successResponse(res, updatedUser);
});