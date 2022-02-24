import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useParams } from 'react-router-dom';

function ProductDetailsBuyer(props) {
    const productId = useParams();

    const { data, loading } = useQuery(QUERY_PRODUCTS, {
        variables: {_id: productId}
    });

    if (loading) return <h1>Loading...</h1>;

    const productData = data?.products[0];
    console.log(productData)

    return (
        <main>
            <img src={productData.image} />
            <div className="flex column">
                <div className="card flex column">
                    <h1>Product Details</h1>
                    <h2>{productData.name}</h2>
                    <p>{productData.description}</p>
                    <p>Price: {`$${productData.price}`}</p>
                </div>
                <a id="add-link" class=""
                href={'/whatever-buyer-link'}>
                    Add to Cart
                </a>
            </div>
        </main>
    );
}

export default ProductDetailsBuyer;