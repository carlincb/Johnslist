import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../utils/mutations';

import ImageUploads from "../ImageUploads";

const addProductPage = () => {
    const [productName, setProductName] = React.useState("");
    const [username, setUsername] = React.useState("");
    // const [image, setImage] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    // const [category, setCategory] = React.useState("");
    // const categories = [
    // "Household",
    //     "Clothing",
    //     "Outdoor",
    //     "Collectible",
    //     "Appliances",
    //     "Miscellaneous",
    // ];
    const [addProduct, { error }] = useMutation(ADD_PRODUCT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {

            const { data } = await addProduct({
                variables: { username, productName, description, price },
            });
        } catch (err) {
            console.error(err);
        }

    };
    return (
        // select category
        <form onSubmit={handleFormSubmit}>
            <h1>Ready to add what could be someone's treasure?</h1>
            {/* <label>
                Select the category you feel this fits in:
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <option key=""></option>
                {/* Need to work out how we pull the categories */}
            {/* {categories.map((category) => (
                <option key={category}>{category}</option>
            ))} */}
            {/* </label> * /} */}
            < label > Your Username:
                <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label >
            <label>
                Product Name:
                <input name="product" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required
                />
            </label>
            <label>
                Image:
                {/* This is where we need to add that image thing from the previous project */}
                {/* <input
                    name="image"
                    type="input"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                /> */}
                <ImageUploads />
            </label>
            <label>
                Description:
                <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                <input name="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <button>Submit</button>
        </form >
    );
}

export default addProductPage;
