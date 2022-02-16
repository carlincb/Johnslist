const { Schema, Types } = require('mongoose');

const productSchema = new Schema(
    {
        productName: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        username: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now,
            get: d => d.toLocaleString('en-us', {year: "numeric", month: "2-digit", day: "two-digit"})
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = productSchema;