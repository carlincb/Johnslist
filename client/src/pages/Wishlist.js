import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { DELETE_WISH } from '../utils/mutations';

const Wishlist = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const [deleteWish, { error } ] = useMutation(DELETE_WISH);

    const userData = data?.user || [];
    const productData = data?.user.wishlist || [];

    const handleDeleteWish = async (productId) => {
        console.log(productData);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await deleteWish({
                variables: { _id: productId  },
            });
        }
        catch (err) {
            console.error(err);
        }
        if (loading) {
            return <h2>LOADING...</h2>;
        }
    }


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
                            <button onClick={() => handleDeleteWish(product._id)}>Remove Item From Wishlist?</button>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
}

export default Wishlist;