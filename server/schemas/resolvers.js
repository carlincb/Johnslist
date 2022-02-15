const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => Category.find(),
        products: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name,
                };
            }

            return Product.find(params).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user.id).populate({
                    path: 'orders.products',
                    populate: 'category',
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(context.user.id, args, {
                    new: true,
                });
            }

            throw new AuthenticationError('Not logged in');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },


        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user.id, {
                    $push: { orders: order },
                });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },

        addProduct: async (parent, { productId }, context) => {
            if (context.user) {
                const newProduct = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { ProductInfo: productId } },
                    { new: true }
                )
            }
        },

        deleteProduct: async (parent, { productId }, context) => {
            if (context.user) {
                const updatedProduct = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { ProductInfo: productId } },
                    { new: true }
                )
            }
        },
    }
}
