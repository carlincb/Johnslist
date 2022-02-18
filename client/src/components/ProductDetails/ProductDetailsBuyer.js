import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

function ProductDetailsBuyer(props) {
    return (
        <main>
            <img src={product.image} />
            <div className="flex column">
                <div className="card flex column">
                    <h1>Product Details</h1>
                    <h2>{product.productName}</h2>
                    <p>{product.description}</p>
                </div>
                <a id="add-link" class=""
                    href={user.isSeller ? '/whatever-seller-link' : '/whatever-buyer-link'} >
                    {user.isSeller ? 'Add to Gallery' : 'Add to Cart'}
                </a>
            </div>
        </main>
    );
}

export default ProductDetailsBuyer;