import { graphql } from "@/app/gql";

export const createTweetMutation = `
  #graphql
  mutation Mutation($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
      id
    }
  }
`;
