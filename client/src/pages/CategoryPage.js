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
    const { data, error } = useQuery(QUERY_CATEGORY, {
        variables: { categoryName: currentCategory }
    });
    const categoryData = data?.category || {};

    console.log(data?.category);

    if (!categoryData._id) return <h1>{currentCategory} doesn't exist or there was a connection problem</h1>;

    return (
        <h1>{currentCategory}</h1>
    )
}

export default CategoryPage;