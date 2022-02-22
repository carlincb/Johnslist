const { gql } = require('apollo-server-express');
// user, category, product

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    isSeller: Boolean
    wishlist: [Product]
    listedItems: [Product]
    orders: [Order]
}

type Category {
    _id: ID
    categoryName: String!
  }

type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    addedAt: String
    username: String
    category: Category

  }

  type Order{
    _id: ID
    purchaseDate: String
    products:[Product]
  }

  type Auth{
    token: ID
    user: User
  }

  input ProductInfo {
    _id: ID
    name: String

    description: String
    price: Float
    image: String
    username: String

  }

  type Checkout{
    session: ID
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
    addUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addProduct(_id: ID, username: String, name: String, image: String, description: String, price: Float): Product
    deleteProduct(_id: ID!): Product
  }
`;

module.exports = typeDefs;