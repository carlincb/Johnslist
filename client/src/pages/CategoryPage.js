import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

function CategoryPage(props) {
    const currentCategory = window.location.href.slice('/')
    .replace(/-/g, ' ').split(' ')
    .map(c => c.charAt(0).toUpperCase).join(' ');
}

export default CategoryPage;