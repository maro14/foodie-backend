# Foodie Backend

A robust RESTful API backend for a food delivery application, built with Node.js, Express, and MongoDB.

## Table of Contents

- [Foodie Backend](#foodie-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API Documentation](#api-documentation)
    - [Authentication Endpoints](#authentication-endpoints)
    - [Items Endpoints](#items-endpoints)
    - [Orders Endpoints](#orders-endpoints)
    - [Reviews Endpoints](#reviews-endpoints)
  - [Testing](#testing)
  - [Docker](#docker)
  - [License](#license)

## Features

- User authentication and authorization
- Food item management
- Order processing
- Review system
- Role-based access control
- Rate limiting
- Error handling
- Docker support

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or Yarn
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/maro14/foodie-backend.git
cd foodie-backend
```

2. Install dependencies:
```bash
npm install
# or using Yarn
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
```

4. Start the development server:
```bash
npm run dev
# or using Yarn
yarn dev
```

The server will be running at `http://localhost:5000`

## API Documentation

### Authentication Endpoints

- POST `/users/register` - Register a new user
- POST `/users/login` - User login

### Items Endpoints

- GET `/items` - Get all items
- POST `/items` - Add new item
- GET `/items/:id` - Get specific item
- PUT `/items/:id` - Update item
- DELETE `/items/:id` - Delete item

### Orders Endpoints

- GET `/orders` - Get all orders
- POST `/orders` - Create new order
- GET `/orders/:id` - Get specific order

### Reviews Endpoints

- POST `/items/:itemId/reviews` - Add review for an item
- GET `/items/:itemId/reviews` - Get item reviews

## Testing

Run the test suite:
```bash
yarn test
```

Run tests in watch mode:
```bash
yarn test:watch
```

Generate coverage report:
```bash
yarn test:coverage
```

## Docker

Build and run using Docker:

```bash
docker-compose up --build
```

Access the containerized application at `http://localhost:5000`

## License

This project is licensed under the [MIT License](LICENSE).
