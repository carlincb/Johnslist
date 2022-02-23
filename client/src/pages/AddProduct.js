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
    localStorage.setItem('my_products', JSON.stringify({ formState }));
  };

  const handleFormSubmit = async (event) => {
    console.log('----------------HANDLE SUBMIT----------------------')
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
    // select category
    <form className="add-product-page" onSubmit={handleFormSubmit}>
      <h1>Ready to add what could be someone's treasure?</h1>
      {/* <label>
                Select the category you feel this fits in:
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <option key=""></option>
                {/* Need to work out how we pull the categories */}
      {/* {categories.map((category) => (
                <option key={category}>{category}</option>
            ))} */}
      {/* </label> * /} */}
      <label>
        {" "}
        Your Username:
        <input name="username" type="text" onChange={handleChange} required />
      </label>
      <label>
        Product Name:
        <input name="name" type="text" onChange={handleChange} required />
      </label>
      <label>
        Image:
        {/* This is where we need to add that image thing from the previous project */}
        {/* <input
                    name="image"
                    type="input"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                /> */}
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
      <button type="submit">Submit</button>
    </form >
  );
};

export default AddProductPage;
