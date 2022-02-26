import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { DELETE_WISH } from "../utils/mutations";

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
    <main>
      <link rel="stylesheet" href="/css/CategoryPage.css" />
      <div className="colProducts-xs-12 text-center">
        <h1>My Wishlist</h1>
        <br />
      </div>
      <section id="product-section">
        {loading ? (
          <div>Loading...</div>
        ) : (
          productData.map((product) => (
            <article className="card" key={product._id}>
              {product.image ? (
                <img src={product.image} alt={`This is the product image`} />
              ) : null}
              <div>{product.name}</div>
              <div>{product.description}</div>
              <button
                className="link-btn"
                onClick={() => handleDeleteWish(product._id)}
              >
                Remove Item From Wishlist?
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default Wishlist;
