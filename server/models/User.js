const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./Product');
const Order = require('./Order');

//Imports the productSchema so the user can add products to a wishlist if they are a buyer and List items if they are a seller.

//Creates the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 40
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (e) {
                    return /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
                },
                message: props => `${props.value} isn't a valid email. Please enter a valid email.`
            }
        },
        password: {
            type: String,
            required: true
        },
        isSeller: {
            type: Boolean,
            required: true,
            default: false
        },
        wishlist: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'

        }],
        listedItems: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
        orders: [Order.schema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('wishlistCount').get(function () {
    return this.wishlist.length;
});

userSchema.virtual('listedItemsCount').get(function () {
    return this.listedItems.length;
});

const User = model('User', userSchema);

module.exports = User;