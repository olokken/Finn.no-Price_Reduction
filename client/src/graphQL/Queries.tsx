import { gql } from '@apollo/client';

export const GET_USER_NAMES = gql`
  query {
    getUsers {
      username
    }
  }
`;

export const GET_FAVORITES = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      favorites
    }
  }
`;

export const GET_CARS = gql`
  query {
    getCars {
      id
      code
      picture
      model_name
      year_model
      mileage
      prices {
        sum
        date
      }
    }
  }
`;
