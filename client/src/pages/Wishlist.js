import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { DELETE_WISH } from "../utils/mutations";
import "./myproducts.css";

const Wishlist = () => {
  const { loading, data } = useQuery(QUERY_USER);
  console.log(data);
  const [deleteWish, { error }] = useMutation(DELETE_WISH);
  console.log(error);
  const userData = data?.user || [];
  console.log("--------", userData);
  const productData = data?.user.wishlist || [];

  const handleDeleteWish = async (productId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await deleteWish({
        variables: { _id: productId },
      });
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
          <h1>My Wishlist</h1>
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
                    alt={`This is the product image`}
                    className="scaled-image"
                  />
                ) : null}
                <div className="productName">{product.name}</div>
                <div className="productDescription">{product.description}</div>
                <button
                  className="myProductsButton"
                  onClick={() => handleDeleteWish(product._id)}
                >
                  Remove Item From Wishlist?
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
