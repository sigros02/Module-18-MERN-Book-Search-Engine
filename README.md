# Google Books Search Engine

A full-stack MERN application that allows users to search for books using the Google Books API and save their favorite books to a personal collection. This application has been refactored from a RESTful API to use GraphQL with Apollo Server and Apollo Client.

## Live Demo

🚀 **[View Live Application](https://module-18-mern-book-search-engine.onrender.com)**

Experience the Google Books Search Engine in action! The application is deployed on Render and includes all features:

- Search for books using the Google Books API
- Create an account and log in
- Save your favorite books to your personal collection
- Manage your saved books library

_Note: The application may take a moment to load initially as Render spins up the server._

## Table of Contents

- Features
- Technologies Used
- Installation
- Usage
- API Endpoints
- GraphQL Schema
- Environment Variables
- Deployment
- Contributing
- License

## Features

- **Book Search**: Search for books using the Google Books API
- **User Authentication**: Sign up and log in with JWT authentication
- **Save Books**: Authenticated users can save books to their personal collection
- **Remove Books**: Users can remove books from their saved collection
- **Responsive Design**: Built with React Bootstrap for mobile-friendly interface
- **GraphQL API**: Modern GraphQL implementation with Apollo Server
- **Persistent Storage**: User data and saved books stored in MongoDB

## Technologies Used

### Frontend

- **React 18** with TypeScript
- **Apollo Client** for GraphQL queries and mutations
- **React Bootstrap** for UI components
- **React Router** for navigation
- **Vite** for build tooling
- **JWT Decode** for token management

### Backend

- **Node.js** with Express.js
- **Apollo Server** for GraphQL API
- **MongoDB** with Mongoose ODM
- **bcrypt** for password hashing
- **JSON Web Tokens (JWT)** for authentication
- **TypeScript** for type safety

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd googlebooks-app
   ```

2. **Install dependencies**

   ```bash
   npm run install
   ```

3. **Set up environment variables**
   Create a .env file in the server directory:

   ```env
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET_KEY=your-secret-key
   NODE_ENV=development
   PORT=3001
   ```

4. **Seed the database (optional)**

   ```bash
   npm run seed
   ```

5. **Build the application**

   ```bash
   npm run build
   ```

6. **Start the application**
   ```bash
   npm start
   ```

## Usage

### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run develop
```

This will start:

- Server on `http://localhost:3001`
- Client on `http://localhost:3000`
- GraphQL Playground at `http://localhost:3001/graphql`

### Production Mode

```bash
npm run build
npm start
```

### Available Scripts

- `npm start` - Start production server
- `npm run develop` - Start development servers
- `npm run build` - Build both client and server
- `npm run seed` - Seed database with sample data
- `npm install` - Install dependencies for both client and server

## API Endpoints

The application uses GraphQL instead of REST endpoints. Access the GraphQL playground at `/graphql` when running the server.

## GraphQL Schema

### Types

```graphql
type User {
  _id: ID!
  username: String!
  email: String!
  savedBooks: [BookDocument]!
}

type BookDocument {
  _id: ID!
  bookId: String!
  title: String!
  authors: [String!]!
  description: String!
  image: String
  link: String!
}

type Auth {
  token: ID!
  user: User!
}
```

### Queries

```graphql
type Query {
  me: User # Get current user's profile
  user(id: ID, username: String): User # Get user by ID or username
}
```

### Mutations

```graphql
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(bookData: BookInput!): User
  removeBook(bookId: String!): User
}
```

### Input Types

```graphql
input BookInput {
  bookId: String!
  title: String!
  authors: [String!]!
  description: String!
  image: String
  link: String!
}
```

## Environment Variables

Create a .env file in the server directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
PORT=3001
```

## Deployment

This application is configured for deployment on Render.com:

1. **Build Command**: `npm run render-build`
2. **Start Command**: `npm start`
3. **Environment**: Node.js
4. **Environment Variables**: Set the same variables as in your .env file

### Deployment Structure

```
project/
├── client/dist/          # Built React application
├── server/dist/          # Compiled TypeScript server
└── package.json          # Root package.json with deployment scripts
```

## Project Structure

```
googlebooks-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # GraphQL queries, mutations, auth
│   │   └── models/         # TypeScript interfaces
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── schemas/        # GraphQL schema and resolvers
│   │   ├── models/         # Mongoose models
│   │   ├── utils/          # Authentication utilities
│   │   ├── config/         # Database connection
│   │   └── seeds/          # Database seed files
│   └── package.json
└── package.json           # Root package.json
```

## Key Features Implementation

### Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Protected GraphQL resolvers
- Client-side token management

### Book Management

- Google Books API integration
- Save/remove books functionality
- Real-time UI updates with Apollo Client
- Local storage for offline book tracking

### GraphQL Integration

- Apollo Server with Express middleware
- Apollo Client with React hooks
- Automatic cache updates
- Error handling and loading states

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please open an issue in the repository.
