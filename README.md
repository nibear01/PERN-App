# PERN Stack Product Management Application

A full-stack product management application built with PostgreSQL (Neon), Express.js, React, and Node.js (PERN stack). The application features CRUD operations, security middleware, rate limiting, and a modern responsive UI.

## 🚀 Project Overview

This project demonstrates a complete full-stack application with:
- RESTful API backend with Express.js
- PostgreSQL database hosted on Neon (serverless)
- React frontend with Vite
- State management using Zustand
- Security features including Arcjet (rate limiting, bot detection, shield)
- Modern UI with DaisyUI and Tailwind CSS

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)

## ✨ Features

- **Product Management**: Create, read, update, and delete products
- **Image Support**: Product images via URL
- **Real-time Updates**: Automatic UI updates after operations
- **Dark/Light Theme**: Theme switching with persistence
- **Security**: 
  - Rate limiting (Token Bucket algorithm)
  - Bot detection and blocking
  - SQL injection protection (Shield)
  - XSS protection
  - Helmet security headers
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client and server-side validation
- **Toast Notifications**: User feedback for all operations
- **Database Seeding**: Sample data for quick testing

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js v5** - Web framework
- **PostgreSQL** - Database (Neon serverless)
- **@neondatabase/serverless** - Neon database client
- **Arcjet** - Security middleware (rate limiting, bot detection, shield)
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM v7** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
PERN App/
├── backend/
│   ├── config/
│   │   └── db.js                 # Neon database configuration
│   ├── controllers/
│   │   └── productController.js  # Product CRUD operations
│   ├── lib/
│   │   └── arcjet.js            # Arcjet security configuration
│   ├── routes/
│   │   └── productRoutes.js     # API route definitions
│   ├── seeds/
│   │   └── products.js          # Database seeding script
│   └── server.js                # Express app configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddProductModal.jsx    # Product creation modal
│   │   │   ├── Navbar.jsx             # Navigation bar
│   │   │   └── ProductCard.jsx        # Product display card
│   │   ├── pages/
│   │   │   ├── HomePage.jsx           # Product listing page
│   │   │   └── ProductPage.jsx        # Product edit page
│   │   ├── store/
│   │   │   ├── useProductStore.js     # Product state management
│   │   │   └── useThemeStore.js       # Theme state management
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # App entry point
│   ├── index.html
│   ├── tailwind.config.js       # Tailwind configuration
│   └── vite.config.js           # Vite configuration
├── .env                          # Environment variables
├── .gitignore
├── package.json                  # Root dependencies
└── README.md
```

## 🔧 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon account recommended)
- Arcjet account (for security features)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "PERN App"
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Neon Database Configuration
PGHOST='your-neon-hostname.neon.tech'
PGDATABASE='neondb'
PGUSER='your-username'
PGPASSWORD='your-password'

# Arcjet Security
ARCJET_KEY="your-arcjet-key"
ARCJET_ENV="development"
MODE=development
```

**Note**: Never commit your `.env` file to version control. Add it to `.gitignore`.

## 💾 Database Setup

### 1. Create Neon Database
- Sign up at [Neon](https://neon.tech)
- Create a new project
- Copy the connection details to your `.env` file

### 2. Initialize Database
The application automatically creates the `products` table on first run:

```sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### 3. Seed Database (Optional)
To populate the database with sample products:

```bash
npm run seed
```

Or directly:
```bash
node backend/seeds/products.js
```

## 🚀 Running the Application

### Development Mode

**Start Backend (with auto-reload)**
```bash
npm run dev
```
Server runs on `http://localhost:3000`

**Start Frontend (separate terminal)**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Mode

**Build Frontend**
```bash
npm run build
```

**Start Production Server**
```bash
NODE_ENV=production npm start
```

The backend serves the built frontend from `frontend/dist` on `http://localhost:3000`

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Request/Response Examples

**Create Product**
```json
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "price": 299.99,
  "image": "https://example.com/image.jpg"
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": "299.99",
    "image": "https://example.com/image.jpg",
    "created_at": "2025-12-06T10:00:00.000Z"
  }
}
```

**Get All Products**
```json
GET /api/products

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": "299.99",
      "image": "https://example.com/image.jpg",
      "created_at": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

## 🔒 Security Features

### Arcjet Integration

The application uses Arcjet for comprehensive security:

**1. Shield Protection**
- SQL Injection prevention
- Cross-Site Scripting (XSS) protection
- Local File Inclusion (LFI) protection
- Remote File Inclusion (RFI) protection

**2. Rate Limiting (Token Bucket Algorithm)**
- **Capacity**: 20 tokens
- **Refill Rate**: 30 tokens per interval
- **Interval**: 5 seconds
- **Characteristics**: Based on IP address

**3. Bot Detection**
- Blocks automated bots
- Allows search engine crawlers
- Detects spoofed bots

**Configuration** (`backend/lib/arcjet.js`):
```javascript
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      capacity: 20,
      interval: 5,
    }),
  ],
});
```

### Additional Security

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Parameterized Queries**: SQL injection prevention via Neon driver

## 🎨 Frontend Features

### State Management (Zustand)

**Product Store** (`useProductStore.js`)
- CRUD operations
- Loading states
- Error handling
- Form data management

**Theme Store** (`useThemeStore.js`)
- Dark/Light theme toggle
- LocalStorage persistence

### Routing

- `/` - Home page (product listing)
- `/product/:id` - Product edit page

### Components

**AddProductModal**
- Modal dialog for creating products
- Form validation
- Image URL input

**ProductCard**
- Product display with image, name, price
- Edit and delete actions
- Hover effects

**Navbar**
- Logo and branding
- Theme toggle
- Add product button

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Verify `.env` credentials
- Check Neon database status
- Ensure SSL mode is enabled

**2. Port Already in Use**
```bash
# Change PORT in .env or kill the process
npx kill-port 3000
```

**3. Frontend Not Connecting to Backend**
- Verify `BASE_URL` in `useProductStore.js` matches backend port
- Check CORS configuration

**4. Express 5 Path Error**
- The catch-all route uses `app.use()` middleware instead of `app.get("*")` to avoid path-to-regexp issues

## 📝 Development Journey

### Initial Setup
1. Initialized Node.js project with Express
2. Set up PostgreSQL database on Neon
3. Created React app with Vite
4. Configured Tailwind CSS and DaisyUI

### Backend Development
1. Implemented RESTful API with Express
2. Connected to Neon PostgreSQL database
3. Created product controller and routes
4. Added Arcjet security middleware
5. Implemented database seeding

### Frontend Development
1. Set up React Router for navigation
2. Implemented Zustand for state management
3. Created reusable components (Modal, Card, Navbar)
4. Added theme switching functionality
5. Integrated toast notifications

### Fixes and Improvements
1. Fixed SQL typo (`EXITS` → `EXISTS`)
2. Resolved nested form hydration errors
3. Fixed Express 5 path-to-regexp compatibility
4. Added null coalescing for form inputs
5. Implemented proper error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/nibear01)

## 🙏 Acknowledgments

- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Arcjet](https://arcjet.com) - Security platform
- [Vite](https://vitejs.dev) - Build tool
- [DaisyUI](https://daisyui.com) - Tailwind component library
- [Unsplash](https://unsplash.com) - Sample images

---

**Built with using the PERN Stack**
