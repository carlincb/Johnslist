import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { MY_PRODUCTS } from "../utils/queries";
import { REMOVE_PRODUCT } from "../utils/mutations";
import "./myproducts.css";

const MyProducts = () => {
  const { loading, data } = useQuery(MY_PRODUCTS);

  const productData = data?.user.listedItems || [];
  const [deleteProduct, { error }] = useMutation(REMOVE_PRODUCT);
  console.log(productData);

  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await deleteProduct({
        variables: { productId },
      });
      console.log("product deleted", { data });
    } catch (err) {
      console.error(err);
    }
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  };
  return (
    <div className="productCardsContainer">
      <div className="rowProducts">
        <div className="colProducts-xs-12 text-center">
          <h1>My Products</h1>
          <br />
        </div>

        <div className="colProducts-lg-3 colProducts-md-4 colProducts-xs-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            productData.map((product) => (
              <div className="cardProduct" key={product._id}>
                {product.image ? (
                  <img
                    className="imageProduct thumbnailProduct"
                    src={product.image}
                    alt={`This is the product image.`}
                  />
                ) : null}
                <div className="productName">{product.name}</div>
                <div className="productDescription">{product.description}</div>
                <button className="myProductsButton" onClick={() => handleDeleteProduct(product._id)}>
                  Second thoughts on selling?
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default MyProducts;
