import { gql } from '@apollo/client';

export const QUERY_ALL_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      username
      name
      description
      image
      price
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        categoryName
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      categoryName
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