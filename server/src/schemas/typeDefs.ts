const typeDefs = `
  type BookDocument {
    bookId: ID!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [BookDocument]!
  }
  type Query {
    user(id: ID!): User!
  }
`;

export default typeDefs;
