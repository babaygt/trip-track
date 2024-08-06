# Trip Track

Welcome to Trip Track! Trip Track is a route sharing social media platform that allows users to create, share, and discover road trips with various waypoints. Users can choose different vehicle types, share descriptions, interact with other users, and much more.

## Table of Contents

- [Trip Track](#trip-track)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Current Status](#current-status)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Setup](#setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [User Endpoints](#user-endpoints)
    - [Route Endpoints](#route-endpoints)
    - [Conversation Endpoints](#conversation-endpoints)
    - [Message Endpoints](#message-endpoints)
    - [Auth Endpoints](#auth-endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- User authentication (register, login, logout)
- Profile management
- Create and share routes with start and finish points and waypoints
- Different vehicle types (car, bicycle, walking, etc.)
- Like, comment, and bookmark routes
- Follow/unfollow users
- Private messaging
- Feed with general and followed users' routes
- Secure profiles (private mode)

## Technologies

- **Frontend:**
  - React
  - Redux Toolkit
  - RTK Query
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Current Status

### Backend

- The backend implementation is mostly complete.
- Routes and controllers for authentication, users, routes, conversations, and messages are finished.
- The backend is set up with MongoDB and uses Express for the server.
- Authentication is handled with JWT and cookie-based refresh tokens.

### Frontend

- The frontend implementation is in progress.
- Features such as route creation, user interaction, and private messaging are implemented.
- Pages such as feed, user profile, and messages are finished.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/babaygt/trip-track.git
   cd trip-track
   ```

2. **Install dependencies for the backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables for the backend:**
   Create a `.env` file in the `backend` directory and add the following variable:

   ```env
   PORT=3500
   MONGO_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret

   ```

4. **Install dependencies for the frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the backend:**

   ```bash
   cd ../backend
   npm run dev
   ```

6. **Run the frontend:**

   ```bash
   cd ../frontend
   npm run dev
   ```

## Usage

- **Frontend:**

  - Navigate to `http://localhost:5173` to access the frontend application.

- **Backend:**
  - The backend server will be running on `http://localhost:3500`.

## API Endpoints

### User Endpoints

- **Register a new user**

  ```http
  POST /users/register
  ```

- **Get user profile**

  ```http
  GET /users/profile/:id
  ```

- **Update user profile**

  ```http
  PUT /users/profile
  ```

- **Follow a user**

  ```http
  PUT /users/follow/:id
  ```

- **Unfollow a user**

  ```http
  PUT /users/unfollow/:id
  ```

- **Get followers**

  ```http
  GET /users/followers/:id
  ```

- **Get following**

  ```http
  GET /users/following/:id
  ```

- **Bookmark a route**

  ```http
  PUT /users/bookmark/:routeId
  ```

- **Unbookmark a route**

  ```http
  PUT /users/unbookmark/:routeId
  ```

- **Get bookmarks**

  ```http
  GET /users/bookmarks
  ```

- **Secure profile**

  ```http
  PUT /users/secure
  ```

- **Get current user**

  ```http
  GET /users/current
  ```

- **Get routes created by a user**

  ```http
  GET /users/:id/routes
  ```

- **Update user password**

  ```http
  PUT /users/profile/password
  ```

- **Search users**
  ```http
  GET /users/search?query={query}
  ```

### Route Endpoints

- **Create a new route**

  ```http
  POST /routes
  ```

- **Get a specific route**

  ```http
  GET /routes/:id
  ```

- **Update a route**

  ```http
  PUT /routes/:id
  ```

- **Delete a route**

  ```http
  DELETE /routes/:id
  ```

- **Like a route**

  ```http
  PUT /routes/like/:id
  ```

- **Comment on a route**

  ```http
  POST /routes/comment/:id
  ```

- **Get followed routes**

  ```http
  GET /routes/followed/:userId
  ```

- **Get general routes**

  ```http
  GET /routes
  ```

- **Get suggestions for places**
  ```http
  GET /routes/suggestions?q={query}
  ```

### Conversation Endpoints

- **Create a new conversation**

  ```http
  POST /conversations
  ```

- **Get all conversations for a user**
  ```http
  GET /conversations
  ```

### Message Endpoints

- **Send a message**

  ```http
  POST /messages
  ```

- **Get messages for a conversation**
  ```http
  GET /messages/:conversationId
  ```

### Auth Endpoints

- **Login user**

  ```http
  POST /auth
  ```

- **Refresh token**

  ```http
  GET /auth/refresh
  ```

- **Logout user**
  ```http
  POST /auth/logout
  ```

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make your changes.**
4. **Commit your changes:**
   ```bash
   git commit -m 'Add some feature'
   ```
5. **Push to the branch:**
   ```bash
   git push origin feature-branch
   ```
6. **Submit a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
