import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PRODUCT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { ADD_WISH } from '../../utils/mutations';
import Auth from '../../utils/auth';

function ProductDetailsBuyer(props) {
    const { productId } = useParams();
    const [addWish] = useMutation(ADD_WISH);
    console.log(productId)

    const { data, loading } = useQuery(QUERY_PRODUCT, {
        variables: { _id: productId }
    });

    if (loading) return <h1>Loading...</h1>;

    const handleWish = async (productId) => {

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
    }

    const productData = data?.product;
    console.log(productData)

    return (
        <main className="flex">
            <link rel="stylesheet" href="/css/buyPage.css" />
            <img src={productData.image} />
            <div className="flex column">
                <div className="card flex column">
                    <h1>Product Details</h1>
                    <h2>{productData.name}</h2>
                    <p>{productData.description}</p>
                    <p>Added on {productData.addedAt}</p>
                </div>
                <div id="price-tag" className="card flex">
                    <span id="price-label">Price</span>
                    <span>{`$${productData.price}`}</span> 
                </div>
                <a id="add-link" className="link-btn"
                href={'/whatever-buyer-link'}>
                    Add to Cart
                </a>
                <button onClick={() => handleWish(productData._id)}>Add To Wishlist</button>
            </div>
        </main>
    );
}

export default ProductDetailsBuyer;