import { User } from "../models/index.js";
import { BookDocument } from "../models/Book.js";

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
// get a single user by either their id or their username
// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
// remove a book from `savedBooks`
*/

//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,

const resolvers = {
  // get a single user by either their id or their username
  Query: {
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
};

export default resolvers;
