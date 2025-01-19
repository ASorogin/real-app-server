# **Real App Server Documentation**

## **Overview**

A **RESTful API** backend service for managing **business cards** and **user profiles**. Built using modern web technologies including **Node.js**, **Express**, and **MongoDB**.

---

## **Technical Stack**

- **Node.js & Express**: Backend server framework
- **MongoDB & Mongoose**: NoSQL database and ODM
- **JWT**: Secure authentication
- **Joi**: Schema-based input validation
- **bcrypt**: Password hashing for security

---

## **Project Structure**

```plaintext
real-app-server/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middlewares/   # Custom middleware
│   ├── utils/         # Utility functions
│   ├── seed/         # Database seeding
│   └── server.js      # Main application file
├── .env               # Environment variables
└── package.json       # Project dependencies
```

---

## **API Endpoints**

### **Authentication**

**POST /api/auth/login**  
_Login user_  
**Body**: `{ email, password }`

---

### **Users**

**POST /api/users**  
_Register a new user_  
**Body**: `{ name, email, password, biz }`

**GET /api/users**  
_Get all users_ (protected)

**GET /api/users/:id**  
_Get specific user_ (protected)

---

### **Profile**

**GET /api/profile**  
_Get user profile_ (protected)

**PUT /api/profile**  
_Update user profile_ (protected)  
**Body**: `{ name, phone, address, bio, website }`

**PUT /api/profile/password**  
_Update password_ (protected)  
**Body**: `{ currentPassword, newPassword }`

**PUT /api/profile/email**  
_Update email_ (protected)  
**Body**: `{ email, password }`

---

### **Cards**

**GET /api/cards**  
_Get all cards_  
**Query Params**: `page, limit, sort`

**GET /api/cards/search**  
_Search cards_  
**Query Params**: `q, address, phone, fromDate, toDate, sort, page, limit`

**POST /api/cards**  
_Create a new card_ (protected, business users only)  
**Body**: `{ bizName, bizDescription, bizAddress, bizPhone, bizImage }`

**PUT /api/cards/:id**  
_Update a card_ (protected, owner only)

**DELETE /api/cards/:id**  
_Delete a card_ (protected, owner only)

**GET /api/cards/my-cards**  
_Get user's cards_ (protected)

**GET /api/cards/favorites**  
_Get user's favorite cards_ (protected)

**POST /api/cards/favorites/:id**  
_Add a card to favorites_ (protected)

**DELETE /api/cards/favorites/:id**  
_Remove a card from favorites_ (protected)

---

## **Authentication**

- Uses **JWT (JSON Web Tokens)** for secure authentication.
- Include the token in the `x-auth-token` header.
- Tokens expire in **24 hours**.

---

## **Models**

### **User Model**

```javascript
{
    name: String,       // required, 2-50 chars
    email: String,      // required, unique, valid email
    password: String,   // required, min 6 chars
    biz: Boolean,       // required
    phone: String,      // optional, valid Israeli phone
    address: {          // optional
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    bio: String,        // optional, max 1024 chars
    image: String,      // optional, valid URL
    website: String,    // optional, valid URL
    favorites: [        // card references
        ObjectId
    ],
    createdAt: Date
}
```

### **Card Model**

```javascript
{
    bizName: String,        // required, 2-255 chars
    bizDescription: String, // required, 2-1024 chars
    bizAddress: String,     // required, 2-400 chars
    bizPhone: String,       // required, 9-10 chars
    bizImage: String,       // required, valid URL
    bizNumber: String,      // auto-generated, unique
    user_id: ObjectId,      // reference to owner
    createdAt: Date
}
```

---

## **Features**

- Full CRUD operations for cards
- User authentication and authorization
- Profile management
- Card favorites system
- Advanced search with filters
- Pagination and sorting
- Input validation
- Error handling
- Security measures

---

## **Error Handling**

- Centralized error handling middleware
- Joi validation for inputs
- Proper HTTP status codes
- Detailed error messages for developers

---

## **Search Features**

- Full-text search across **business names**, **descriptions**, and **addresses**
- Filter by **address** and **phone**
- Date range filtering
- Sorting options: `name`, `date`, `relevance`
- Search suggestions
- Pagination support

---

## **Test Data**

The project includes a seeding script that creates initial test data. To seed the database:

```bash
npm run seed
```

### **Test Accounts**

1. **Regular User**

   - Email: user@example.com
   - Password: 123456
   - Business: No

2. **Business User**

   - Email: business@example.com
   - Password: 123456
   - Business: Yes

3. **Admin User**
   - Email: admin@example.com
   - Password: 123456
   - Business: Yes

### **Sample Business Cards**

1. **Tech Solutions**

   - Description: Professional IT services and consulting
   - Address: 123 Tech St, Tel Aviv
   - Phone: 0521234567

2. **Design Studio**

   - Description: Creative design solutions for your business
   - Address: 456 Design St, Tel Aviv
   - Phone: 0521234568

3. **Coffee Shop**
   - Description: Best coffee in town
   - Address: 789 Coffee St, Jerusalem
   - Phone: 0521234569

---

## **Running the Project**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in the `.env` file.
3. Seed the database (optional):
   ```bash
   npm run seed
   ```
4. Run the project:
   - **Development**:
     ```bash
     npm run dev
     ```
   - **Production**:
     ```bash
     npm start
     ```

---

## **Environment Variables**

Create a `.env` file in the root directory with the following variables:

```plaintext
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

---

## **Security Measures**

- Password hashing with **bcrypt**
- **JWT** for secure authentication
- Input validation and sanitization with **Joi**
- Protected routes with role-based access control
- Business user verification
- Owner-only operations for cards
