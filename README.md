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
    - [Routes Endpoints](#routes-endpoints)
    - [Conversation Endpoints](#conversation-endpoints)
    - [Message Endpoints](#message-endpoints)
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
- Routes and controllers for users, routes, conversations, and messages are finished.
- The backend is set up with MongoDB and uses Express for the server.
- Authentication and authorization will be added.

### Frontend

- The frontend setup has been initialized.
- Basic structure have been created.
- There is still significant work to be done on the frontend, including building out the user interface and connecting to the backend API.

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
   MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
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

- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: Login a user.
- **GET** `/users/profile/:id`: Get user profile.
- **PUT** `/users/profile`: Update user profile.
- **PUT** `/users/follow/:id`: Follow another user.
- **PUT** `/users/unfollow/:id`: Unfollow a user.
- **GET** `/users/followers/:id`: Get followers.
- **GET** `/users/following/:id`: Get following.
- **PUT** `/users/bookmark/:routeId`: Bookmark a route.
- **PUT** `/users/unbookmark/:routeId`: Unbookmark a route.
- **GET** `/users/bookmarks`: Get bookmarks.
- **PUT** `/users/secure`: Secure profile.

### Routes Endpoints

- **POST** `/routes`: Create a new route.
- **GET** `/routes`: Get general routes.
- **GET** `/routes/:id`: Get a specific route.
- **PUT** `/routes/:id`: Update a route.
- **DELETE** `/routes/:id`: Delete a route.
- **PUT** `/routes/like/:id`: Like a route.
- **POST** `/routes/comment/:id`: Comment on a route.
- **GET** `/routes/followed/:userId`: Get followed routes.

### Conversation Endpoints

- **POST** `/conversations`: Create a new conversation.
- **GET** `/conversations/:userId`: Get all conversations for a user.

### Message Endpoints

- **POST** `/messages`: Send a message.
- **GET** `/messages/:conversationId`: Get messages for a conversation.

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
