// src/seed/index.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/users');
const Card = require('../models/card');

const users = [
    {
        name: "Regular User",
        email: "user@example.com",
        password: "123456",
        biz: false
    },
    {
        name: "Business User",
        email: "business@example.com",
        password: "123456",
        biz: true,
        phone: "0521234567",
        address: {
            street: "123 Business St",
            city: "Tel Aviv",
            country: "Israel"
        }
    },
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        biz: true,
        phone: "0521234568",
        address: {
            street: "123 Admin St",
            city: "Jerusalem",
            country: "Israel"
        }
    }
];

const cards = [
    {
        bizName: "Tech Solutions",
        bizDescription: "Professional IT services and consulting",
        bizAddress: "123 Tech St, Tel Aviv",
        bizPhone: "0521234567",
        bizImage: "https://example.com/tech.jpg"
    },
    {
        bizName: "Design Studio",
        bizDescription: "Creative design solutions for your business",
        bizAddress: "456 Design St, Tel Aviv",
        bizPhone: "0521234568",
        bizImage: "https://example.com/design.jpg"
    },
    {
        bizName: "Coffee Shop",
        bizDescription: "Best coffee in town",
        bizAddress: "789 Coffee St, Jerusalem",
        bizPhone: "0521234569",
        bizImage: "https://example.com/coffee.jpg"
    }
];

async function seedDatabase() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-app');
        console.log('Connected to MongoDB...');

        // Clear existing data
        await User.deleteMany({});
        await Card.deleteMany({});
        console.log('Cleared existing data...');

        // Create users
        const createdUsers = [];
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
            createdUsers.push(user);
            console.log(`Created user: ${user.email}`);
        }

        // Create cards
        const businessUsers = createdUsers.filter(user => user.biz);
        for (let i = 0; i < cards.length; i++) {
            const card = new Card({
                ...cards[i],
                user_id: businessUsers[i % businessUsers.length]._id
            });
            await card.save();
            console.log(`Created card: ${card.bizName}`);
        }

        console.log('\nSeeding completed successfully!');
        console.log('\nTest accounts:');
        console.log('Regular User:', users[0].email, '/ Password:', users[0].password);
        console.log('Business User:', users[1].email, '/ Password:', users[1].password);
        console.log('Admin User:', users[2].email, '/ Password:', users[2].password);

    } catch (error) {
        console.error('Error seeding the database:', error.message);
        console.error(error.stack);
    } finally {
        await mongoose.disconnect();
        console.log('\nDatabase connection closed');
    }
}

seedDatabase();