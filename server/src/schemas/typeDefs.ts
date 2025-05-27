const typeDefs = `


  type BookDocument {
    _id: ID!
    bookId: String!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [BookDocument]!
  }
    
  type Auth {
    token: ID!
    user: User!
  } 

  # Queries
  type Query {
    me: User
    users: [User]
    user(id: ID, username: String): User
  }

  # Mutations
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }

  # Inputs for the mutations
  input BookInput {
    bookId: String!
    title: String!
    authors: [String!]!
    description: String!
    image: String
    link: String!
  }
  


`;

//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,
export default typeDefs;
