import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import Auth from '../utils/auth';
import { MY_PRODUCTS } from '../../utils/queries';;
import { REMOVE_PRODUCT } from '../../utils/mutations';

const userProducts = () => {
    const { data } = useQuery(MY_PRODUCTS);

    const userData = data?.user || {};

    const [deleteProduct, { error }] = useMutation(REMOVE_PRODUCT);

    const handleDeleteProduct = async (productId) => {
        try {
            const { data } = await deleteBook({
                variables: { bookId }

            }); console.log(bookId);


            // upon success, remove product's id from localStorage
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };
}



