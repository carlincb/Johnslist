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
  
  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`