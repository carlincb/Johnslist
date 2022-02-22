const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('pk_test_51KTa8QCxCqBFbeLD8nOEHQnUabzbGn2fbkqygSNUyPhv1md8P0O6YX7BUmu4H84v7vji6Ul2t2kmJV4IGAEIoruw00IWyaOXr3')

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find()
        },
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
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user.id).populate({
                    path: 'products',
                    populate: 'category',
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                })
                return user.orders.id(_id)
            }
            throw new AuthenticationError('please log in')
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const items = []

            const { products } = await order.populate('products').execPopulate();

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                })

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price,
                    currency: 'usd'
                })
                items.push({
                    price: price.id,
                    quantity: 1
                })

            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                items,
                mode: 'payment',
                sucees_url: `${url}/sucess?session_id={}`,//pass in the checkout session id
                cancel_url: `${url}/`
            })

            return { session: session.id }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log(args);
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


        addProduct: async (parent, { _id, name, username, price, description, image }, context) => {
            console.log(context.user)
            if (context.user) {
                //add product needs to be pushed to the sell
                const product = await Product.create({ _id, name, username, price, description, image });

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { listedItems: product._id } },
                    { new: true }
                )

                return { product, updatedUser };
            }
        },

        deleteProduct: async (parent, { productId }, context) => {
            if (context.user) {
                const updatedProduct = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { listedItems: { productId: productId }}},
                    { new: true }
                )
                return updatedProduct;
            }
            return;
        },
    }
};

module.exports = resolvers;
