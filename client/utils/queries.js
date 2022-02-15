import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      username
      title
      description
      image
      price
    }
  }
`;