import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import { ADD_WISH } from "../utils/mutations";
import Auth from "../utils/auth";
import "./myproducts.css";

const ProductGallery = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const productData = data?.products || [];
  const [addWish, { error }] = useMutation(ADD_WISH);

  const handleWish = async (productId) => {
    console.log(productId);
    console.log(productData);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addWish({
        variables: { _id: productId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="productCardsContainer">
      <div className="rowProducts">
        <div className="colProducts-xs-12 text-center">
          <h1>The Marketplace</h1>
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
                    alt={`this is the product image`}
                  />
                ) : null}
                <div className="productName">{product.name}</div>
                <div className="productDescription">{product.description}</div>
                <div>${product.price}</div>
                <button
                  className="myProductsButton"
                  onClick={() => handleWish(product._id)}
                >
                  Add to Wishlist
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
