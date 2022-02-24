import { gql } from '@apollo/client';

export const MY_PRODUCTS = gql`
  query {
      user {
       listedItems 
       {
       _id
        username
        name
        description
        image
        price
    }
  }
}
`;

export const QUERY_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      image
      price
      category {
        name
      }
    }
  }
`;


export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_CATEGORY = gql`
  query Category($categoryName: String!) {
    category(categoryName: $categoryName) {
      _id
      name
      products {
        name 
        image
        description
        price
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USER = gql`
  query {
    user {
      username
      wishlist {
          _id
          name
          description
          image
          price
          category {
            name
          }
      }
    }
  }
`