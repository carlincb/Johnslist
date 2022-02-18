const { gql } = require('apollo-server-express');
// user, category, product

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    #isSeller: Boolean!
    wishlist: [Product]
    listedItems: [Product]
    orders: [Order]
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
    productId: ID
    productName: String!
    description: String
    price: Float!
    image: String
    username: String!
    title: String! 
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
    addUser(firstName: String!, lastName: String!, email: String!,
    password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addProduct(productData: ProductInfo): Product
    deleteProduct(productData: ProductInfo): Product


  }
`;

module.exports = typeDefs;