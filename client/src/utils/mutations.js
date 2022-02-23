import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
    mutation addProduct($_id: ID, $name: String, $username: String, $price: Float, $image: String, $description: String) {
      addProduct(_id: $_id, name: $name, username: $username, price: $price, image: $image, description: $description) { 
          _id
          username
         }
    }
`;

export const REMOVE_PRODUCT = gql`
    mutation deleteProduct($productId: ID) {
      deleteProduct(productId: $productId) {
      _id
      }
  }
`;
