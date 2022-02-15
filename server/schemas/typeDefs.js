const { gql } = require('apollo-server-express');
// user, category, product

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isSeller: Boolean!
    wishlist: [Product]
    listedItems: [Product]
}

type Category {
    _id: ID
    name: String!
  }

type Product {
    _id: ID
    name: String!
    quantity: Int
    description: String
    image: String
    price: Float!
    category: Category!

  }

  input ProductInfo {
    productId: ID
    productName: String!
    description: String
    price: Float!
    image: String
    username: String!
    title: String! 
  }
`