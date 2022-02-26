import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PRODUCT } from '../../utils/queries';
import { useParams } from 'react-router-dom';
import { ADD_WISH } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductDetailsBuyer(props) {
    //Gets the product id
    const { productId } = useParams();
    //Variables for adding to wishlist and adding to cart
    const [addWish] = useMutation(ADD_WISH);
    const [state, dispatch] = useStoreContext();
    console.log(productId)

    const { data, loading } = useQuery(QUERY_PRODUCT, {
        variables: { _id: productId }
    });
    
    const { cart } = state

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

    const addToCart = () => {
       const itemInCart = cart.find((cartItem) => cartItem._id === productId)
        if (itemInCart) {
            console.log('this item is already added')
        } else {
          dispatch({
            type: ADD_TO_CART
          });
          idbPromise('cart', 'put');
        } 
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
                <div id="button-spot">
                    <button id="add-link"
                    onClick={() => addToCart()}
                    >
                        Add to Cart
                    </button>
                    <button onClick={() => handleWish(productData._id)}>Add To Wishlist</button>
                </div>
            </div>
        </main>
    );
}

export default ProductDetailsBuyer;