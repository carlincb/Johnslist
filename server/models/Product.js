const { Schema, Types } = require('mongoose');

const productSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId(),
            default: () => new Types.ObjectId()
        },
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