import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import { ADD_WISH } from '../utils/mutations';
import Auth from '../utils/auth';
import './myproducts.css';

const ProductGallery = () => {
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const productData = data?.products || [];
    const [addWish, { error }] = useMutation(ADD_WISH);

    const handleWish = async (productId) => {
        console.log(productId);
        console.log(productData);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addWish({
                variables: { _id: productId }
            });
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div className='productCards'>
            <div className="card" >
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    productData.map((product) => (
                        <div key={product._id} >
                            {product.image ? <img src={product.image} alt={`this is the product image`} className="scaled-img"/> : null}
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                            <div>${product.price}</div>
                            <button onClick={() => handleWish(product._id)}>Add to Wishlist</button>
                        </div>

                    ))
                )}

            </div>
        </div>

    )
}

export default ProductGallery;

