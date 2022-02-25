import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CATEGORY } from '../utils/queries';
import { useParams, Link } from 'react-router-dom';
import { ADD_WISH } from '../utils/mutations';
import Auth from '../utils/auth';

function CategoryPage(props) {
    const { category } = useParams();
    const [addWish] = useMutation(ADD_WISH);
    //Gets the current category from the url to be used in a query and displaying
    const currentCategory = category.slice('/categories/')
    .replace(/-/g, ' ').split(' ')
    .map(c => c.charAt(0).toUpperCase() + c.substr(1).toLowerCase())
    .join(' ');

    //Queries for the category
    const { data, loading } = useQuery(QUERY_CATEGORY, {
        variables: { name: currentCategory }
    });
    const categoryData = data?.category || {};

    if (loading) return <h1>Loading...</h1>

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

    //Conditional rendering that displays an error if the user enters a category that doesn't exist.
    if (!categoryData._id) return <h1>{currentCategory} doesn't exist or there was a connection problem</h1>;

    return (
        <main>
            <link rel="stylesheet" href="/css/CategoryPage.css" />
            <h1>{categoryData.name}</h1>
            <section id="product-section">
                {!categoryData.products.length ? <h2>There are currently no products under this category</h2> :
                categoryData.products.map(product => (
                    <article className="card" key={product._id}>
                        <h2>{product.name}</h2>
                        <img src={product.image} />
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <a href={`/buy/${product._id}`} className="link-btn">View</a>
                        <button onClick={() => handleWish(product._id)}>Add to Wishlist</button>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default CategoryPage;