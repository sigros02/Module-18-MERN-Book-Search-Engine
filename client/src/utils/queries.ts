import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID, $username: String) {
    user(id: $id, username: $username) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

