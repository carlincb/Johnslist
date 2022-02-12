const { Schema, model } = require('mongoose');
const productSchema = require('./Product');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 40
        }
    }
)