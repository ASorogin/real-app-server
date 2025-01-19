# Real App API Testing Guide
A friendly guide to test all features of the Real App API. Copy and paste commands to your terminal.

## 👤 Test Accounts
```
Regular User:  user@example.com / 123456
Business User: business@example.com / 123456
Admin User:    admin@example.com / 123456
```

## 🚀 Before Starting
1. Make sure your server is running: `npm run dev`
2. Make sure database is seeded: `npm run seed`
3. Always start by getting a fresh token (see Auth section)

## 🔑 Authentication Tests

### Login (Get your token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "business@example.com",
    "password": "123456"
}'
```

### Register New User
```bash
curl -X POST http://localhost:5000/api/users \
-H "Content-Type: application/json" \
-d '{
    "name": "New Test User",
    "email": "newtest@example.com",
    "password": "123456",
    "biz": false
}'
```

## 👤 Profile Tests
Replace YOUR_TOKEN with the token you got from login.

### Get My Profile
```bash
curl http://localhost:5000/api/profile \
-H "x-auth-token: YOUR_TOKEN"
```

### Update My Profile
```bash
curl -X PUT http://localhost:5000/api/profile \
-H "Content-Type: application/json" \
-H "x-auth-token: YOUR_TOKEN" \
-d '{
    "name": "Updated Name",
    "phone": "0521234567",
    "address": {
        "street": "123 Test St",
        "city": "Tel Aviv",
        "country": "Israel"
    }
}'
```

### Change Password
```bash
curl -X PUT http://localhost:5000/api/profile/password \
-H "Content-Type: application/json" \
-H "x-auth-token: YOUR_TOKEN" \
-d '{
    "currentPassword": "123456",
    "newPassword": "654321"
}'
```

## 💼 Business Card Tests
Make sure you're logged in as a business user for these tests.

### Get All Cards
```bash
curl http://localhost:5000/api/cards
```

### Create New Card
```bash
curl -X POST http://localhost:5000/api/cards \
-H "Content-Type: application/json" \
-H "x-auth-token: YOUR_TOKEN" \
-d '{
    "bizName": "New Test Business",
    "bizDescription": "This is a test business",
    "bizAddress": "123 Test Street, Tel Aviv",
    "bizPhone": "0521234567",
    "bizImage": "https://example.com/image.jpg"
}'
```

### Get My Cards
```bash
curl http://localhost:5000/api/cards/my-cards \
-H "x-auth-token: YOUR_TOKEN"
```

### Update Card
Replace CARD_ID with the _id you got when creating the card.
```bash
curl -X PUT http://localhost:5000/api/cards/CARD_ID \
-H "Content-Type: application/json" \
-H "x-auth-token: YOUR_TOKEN" \
-d '{
    "bizName": "Updated Business Name",
    "bizDescription": "Updated description",
    "bizAddress": "123 Test Street, Tel Aviv",
    "bizPhone": "0521234567",
    "bizImage": "https://example.com/image.jpg"
}'
```

### Delete Card
```bash
curl -X DELETE http://localhost:5000/api/cards/CARD_ID \
-H "x-auth-token: YOUR_TOKEN"
```

## ⭐ Favorites Tests

### Add Card to Favorites
```bash
curl -X POST http://localhost:5000/api/cards/favorites/CARD_ID \
-H "x-auth-token: YOUR_TOKEN"
```

### Get My Favorite Cards
```bash
curl http://localhost:5000/api/cards/favorites \
-H "x-auth-token: YOUR_TOKEN"
```

### Remove Card from Favorites
```bash
curl -X DELETE http://localhost:5000/api/cards/favorites/CARD_ID \
-H "x-auth-token: YOUR_TOKEN"
```

## 🔍 Search Tests

### Simple Search
```bash
curl "http://localhost:5000/api/cards/search?q=test" \
-H "x-auth-token: YOUR_TOKEN"
```

### Advanced Search
```bash
# Search by address
curl "http://localhost:5000/api/cards/search?address=Tel%20Aviv" \
-H "x-auth-token: YOUR_TOKEN"

# Search with pagination
curl "http://localhost:5000/api/cards/search?page=1&limit=10" \
-H "x-auth-token: YOUR_TOKEN"

# Search with date range
curl "http://localhost:5000/api/cards/search?fromDate=2024-01-01&toDate=2024-12-31" \
-H "x-auth-token: YOUR_TOKEN"

# Search with sorting
curl "http://localhost:5000/api/cards/search?sort=name" \
-H "x-auth-token: YOUR_TOKEN"
```

## 📝 Tips & Troubleshooting
1. Token not working?
   - Get a fresh token by logging in again
   - Make sure you're copying the entire token
   - Check that token hasn't expired (24 hours)

2. Can't create/update cards?
   - Make sure you're logged in as a business user
   - Check that all required fields are provided
   - Verify phone number format (starts with 05)
   - Make sure image URL is valid

3. Search not working?
   - URL encode special characters
   - Try simpler search terms first
   - Check pagination parameters

4. Common HTTP Status Codes:
   - 200: Success
   - 400: Bad Request (check your input)
   - 401: Unauthorized (check your token)
   - 403: Forbidden (check user permissions)
   - 404: Not Found
   - 500: Server Error (check server logs)

Save this file and use it whenever you need to test your API! 😊
