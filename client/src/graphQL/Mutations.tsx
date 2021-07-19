import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(info: { username: $username, password: $password })
  }
`;

export const ADD_FAVORITE = gql`
  mutation addFavorite($userId: String!, $code: String!) {
    addFavorite(userId: $userId, code: $code)
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($userId: String!, $code: String!) {
    removeFavorite(userId: $userId, code: $code)
  }
`;

export const IS_VERIFIED = gql`
  mutation {
    isVerified
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(info: { username: $username, password: $password }) {
      accessToken
      id
    }
  }
`;
