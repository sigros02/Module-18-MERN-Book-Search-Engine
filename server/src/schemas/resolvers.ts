import { User } from "../models/index.js";
import { BookDocument } from "../models/Book.js";
import { signToken, AuthenticationError } from "../utils/auth.js";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
}

/*
 / ** All user routes that need to be refactored to use GraphQL **
 /
 // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
 // {body} is destructured req.body
 // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
 // user comes from `req.user` created in the auth middleware function
 // remove a book from `savedBooks`
 */

// # Queries

// # Mutations
//   login(email: String!, password: String!): Auth
//   addUser(username: String!, email: String!, password: String!): Auth
//   saveBook(bookData: BookInput!): User
//   removeBook(bookId: String!): User

const resolvers = {
  // get a single user by either their id or their username
  // user(id: ID, username: String): User
  Query: {
    // me: User
    me: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError(
          "You need to be logged in to access this resource."
        );
      }
      const user = await User.findById(context.user._id).populate("savedBooks");
      return user;
    },

    user: async (
      _parent: any,
      { id, username }: { id?: string; username?: string }
    ) => {
      const foundUser = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      }).populate("savedBooks");

      if (!foundUser) {
        throw new Error("Cannot find a user with this id or username!");
      }
      return foundUser;
    },
  },

  Mutation: {
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    // addUser(username: String!, email: String!, password: String!): Auth
    addUser: async (
      _parent: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError(
          "User already exists with this email address."
        );
      }
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // login(email: String!, password: String!): Auth
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });
      console.log("#######################");
      console.log(user);
      if (!user) {
        throw new AuthenticationError("No user found with this email address.");
      }
      const isPasswordValid = await user.isCorrectPassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError("Incorrect password.");
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    // saveBook(bookData: BookInput!): User
    saveBook: async (
      _parent: any,
      { bookData }: { bookData: BookDocument },
      context: any
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      ).populate("savedBooks");
    },

    // removeBook(bookId: String!): User
    removeBook: async (
      _parent: any,
      { bookId }: { bookId: string },
      context: any
    ) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).populate("savedBooks");
    },
  },
};

export default resolvers;
