import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { MY_PRODUCTS } from '../utils/queries';
import { REMOVE_PRODUCT } from '../utils/mutations';
import './myproducts.css';

const MyProducts = () => {
    const { loading, data } = useQuery(MY_PRODUCTS);

    const productData = data?.user.listedItems || [];
    localStorage.setItem('my_products', JSON.stringify(productData));

    const [deleteProduct, { error }] = useMutation(REMOVE_PRODUCT);


    const handleDeleteProduct = async () => {
        const myProducts = JSON.parse(localStorage.getItem('my_products'));
        console.log(myProducts.$id);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { myProducts } = await deleteProduct({
                variables: {
                    $id: myProducts._id
                }
            }); console.log("product deleted", { productData });
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
                            <button onClick={() => handleDeleteProduct(product._id)}>Second thoughts on selling?</button>
                        </div>
                    ))
                )}
            </div>
        </div>

    );

}
export default MyProducts;
