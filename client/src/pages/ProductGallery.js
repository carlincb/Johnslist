import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';
import './myproducts.css';

const ProductGallery = () => {
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const productData = data?.products || [];

    return (
        <div className='productCards'>
            <div className="card" style={{ width: "10%" }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    productData.map((product) => (
                        <div key={product._id} >
                            {product.image ? <img src={product.image} alt={`this is the product image`} /> : null}
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                        </div>

                    ))
                )}

            </div>
        </div>

    )
}

export default ProductGallery;

