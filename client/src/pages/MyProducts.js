import React from 'react';
import { useQuery } from '@apollo/client';
// import Auth from '../utils/auth';
import { QUERY_PRODUCTS } from '../utils/queries';
// import { REMOVE_PRODUCT } from '../utils/mutations';
import './myproducts.css';

const MyProducts = () => {
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const productData = data?.products || [];
    console.log(productData);

    // const handleDeleteProduct = async (productData) => {
    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await deleteProduct({
    //             variables: { _id }

    //         }); console.log("product deleted");


    //         // upon success, remove book's id from localStorage
    //         removeProductId(_id);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
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

export default MyProducts;
