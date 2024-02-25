import { graphql } from "../../gql";

export const getAllTweetsQuery = `#graphql

query GetAllTweets {
  getAllTweets {
    imageURL
    id
    content
    author {
      profileImageURL
      lastName
      firstName
      id
      email
    }
  }
}
`;
