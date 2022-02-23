import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import "./addproduct.css";
import ImageUploads from "../components/ImageUploads";

const AddProductPage = () => {
  const [image, setImage] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    username: "",
    description: "",
    price: "",
    image: "",
  });
  // const [category, setCategory] = React.useState("");
  // const categories = [
  // "Household",
  //     "Clothing",
  //     "Outdoor",
  //     "Collectible",
  //     "Appliances",
  //     "Miscellaneous",
  // ];
  const [addProduct, { error }] = useMutation(ADD_PRODUCT);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(formState);
    localStorage.setItem("my_products", JSON.stringify({ formState }));
  };

  const handleFormSubmit = async (event) => {
    console.log("----------------HANDLE SUBMIT----------------------");
    event.preventDefault();

    try {
      const { data } = await addProduct({
        variables: {
          name: formState.name,
          username: formState.username,
          image: formState.image,
          description: formState.description,
          price: parseFloat(formState.price),
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <section className="add-product-page">
      <form className="form-add-product" onSubmit={handleFormSubmit}>
        <div className="title-add-product">
          <h1>
            Ready <br />
            to turn <br />
            your <span className="trashTreasureDiv"> trash</span> <br /> into{" "}
            <br /> <span className="trashTreasureDiv"> treasure</span>?
          </h1>
        </div>
        <div className="add-product-form-container">
          <div>
            {" "}
            <img
              className="imageLogoAddProduct"
              src="/images/kintsugi_logo.png"
            />
          </div>
          <label>
            <div>Your Username:</div>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Product Name:
            <input name="name" type="text" onChange={handleChange} required />
          </label>
          <label className="imageContainerAddProduct">
            <ImageUploads
              formState={formState}
              setFormState={setFormState}
              setImage={setImage}
              image={image}
            />
          </label>
          <label>
            Description:
            <input
              name="description"
              type="text"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:
            <input name="price" type="text" onChange={handleChange} required />
          </label>
          <button className="addProductSubmit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProductPage;
