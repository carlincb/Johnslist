import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/mutations";
import "./addproduct.css";
import ImageUploads from "../components/ImageUploads";
import { QUERY_CATEGORIES } from "../utils/queries";

const AddProductPage = () => {
  const [image, setImage] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    username: "",
    description: "",
    price: "",
    image: "",  
    category: "",
  });
  // const [category, setCategory] = React.useState("");
  const { data, loading } = useQuery(QUERY_CATEGORIES);
  const categoryData = data?.categories || [];
  // const categories = [
  //     "Household",
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
    console.log(formState);
    event.preventDefault();

    try {
      const { data } = await addProduct({
        variables: {
          name: formState.name,
          username: formState.username,
          image: formState.image,
          description: formState.description,
          price: parseFloat(formState.price),
          category: formState.category,
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
      <label>Choose a Category:</label>  
      <select name="category" onChange={handleChange} required>
       {categoryData.map((category) => 
         <option key={category._id} value={category._id}>{category.name}</option>
       )} 
      </select>
      <button type="submit">Submit</button>
    </form >
  );
};

export default AddProductPage;
