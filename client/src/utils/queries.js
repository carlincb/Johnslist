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

export const QUERY_CATEGORY = gql`
  query Category($categoryName: String!) {
    categories(categoryName: $categoryName) {
      _id
      categoryName
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