import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container } from 'react-bootstrap';
// import Auth from '../utils/auth';
import { MY_PRODUCTS } from '../utils/queries';;
import { REMOVE_PRODUCT } from '../utils/mutations';

const UserProducts = () => {
    const { data } = useQuery(MY_PRODUCTS);

    const userData = data?.user.listedItems || {};

    const [deleteProduct, { error }] = useMutation(REMOVE_PRODUCT);

    const handleDeleteProduct = async (productId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            const { data } = await deleteProduct({
                variables: { productId }

            }); console.log(productId);


            // upon success, remove product's id from localStorage
            removeProductId(productId);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <Container>
                <h2>
                    {userData.savedProducts.length
                        ? `Viewing ${userData.savedProducts.length} saved ${userData.savedProducts.length === 1 ? 'product' : 'products'}:`
                        : 'You have no products for sale!'}
                </h2>
                <div>
                    {userData.savedProducts.map((product) => {
                        return (
                            < div key={product.productId} >
                                {product.image ? <img src={product.image} alt={`this is the product image`} /> : null}
                                <div>{product.title}</div>
                                <div>{product.description}</div>
                                <button onClick={() => handleDeleteProduct(product.productId)}>Second thoughts about selling?</button>
                            </div>
                        );
                    })}
                </div>
            </Container>

        </>
    );
};

export default UserProducts;



