import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORY } from '../utils/queries';
import { useParams } from 'react-router-dom';

function CategoryPage(props) {
    const { category } = useParams();
    //Gets the current category from the url to be used in a query and displaying
    const currentCategory = category.slice('/categories/')
    .replace(/-/g, ' ').split(' ')
    .map(c => c.charAt(0).toUpperCase() + c.substr(1).toLowerCase())
    .join(' ');

    //Queries for the category
    const { data } = useQuery(QUERY_CATEGORY, {
        variables: { categoryName: currentCategory }
    });
    const categoryData = data?.category || {};

    //console.log(data?.category);

    //Conditional rendering that displays an error if the user enters a category that doesn't exist.
    if (!categoryData._id) return <h1>{currentCategory} doesn't exist or there was a connection problem</h1>;

    return (
        <main>
            <h1>{currentCategory}</h1>
            <section id="product-section">
                {!categoryData.products.length ? <h2>There are currently no products under this category</h2> :
                categoryData.products.map(product => (
                    <article className="card" key={product._id}>
                        <h2>{product.name}</h2>
                        <img src={product.image} />
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <a href="/" className="link-btn">View</a>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default CategoryPage;