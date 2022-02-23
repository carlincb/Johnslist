import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

function CategoryPage(props) {
    //Gets the current category from the url to be used in a query and displaying
    const currentCategory = props.category.slice('/categories/')
    .replace(/-/g, ' ').split(' ')
    .map(c => c.charAt(0).toUpperCase).join(' ');

    return (
        <h1>{currentCategory}</h1>
    )
}

export default CategoryPage;