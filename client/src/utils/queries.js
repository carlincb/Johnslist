import { gql } from '@apollo/client';

export const MY_PRODUCTS = gql`
  query {
      user {
       listedItems 
       {
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

export const DELETE_PRODUCTS = gql`
  {
    products {
    _id 
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
  {
    categories {
      _id
      categoryName
      products
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