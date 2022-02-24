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
    mutation addProduct($_id: ID, $name: String, $username: String, $price: Float, $image: String, $description: String, $category: String) {
      addProduct(_id: $_id, name: $name, username: $username, price: $price, image: $image, description: $description, category: $category) { 
          _id
          username
         }
    }
`;

export const REMOVE_PRODUCT = gql`
    mutation deleteProduct($_id: ID, $name: String, $username: String, $price: Float, $image: String, $description: String) {
      deleteProduct(_id: $_id, name: $name, username: $username, price: $price, image: $image, description: $description) { 
        _id
        username
         }
  }
`;

export const DELETE_WISH = gql`
    mutation deleteWish($_id: ID) {
      deleteWish(_id: $_id) {
        user {
          username
          wishlist {
            products {
              _id
            }
          }
        }
      }
    }
`

export const ADD_WISH = gql`
    mutation addWish($_id: ID) {
      addWish(_id: $_id) {
         wishlist {
           _id
         }
      }
    }
`
