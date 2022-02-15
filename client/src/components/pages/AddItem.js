import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";


export default function AddItemPage() {
    const [product, setProduct] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const categories = ["Household", "Clothing", "Outdoor", "Collectible", "Appliances", "Miscellaneous"];


    const handleSubmit = (event) => {

        event.preventDefault();

    }

    return (
        // select category 
        <form onSubmit={handleSubmit}>
            <h1>Ready to add what could be someone's treasure?</h1>
            <label>
                Select the category you feel this fits in:
                <select
                    name="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required />
                <option key=""></option>
                {/* Need to work out how we pull the categories */}
                {categories.map(category => (
                    <option key={category}>{category}</option>
                ))}
            </label>


            <label>
                Your Username:
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required />
            </label>
            <label>
                Product Name:
                <input
                    name="product"
                    type="text"
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    required />
            </label>
            <label>
                Image:
                {/* This is where we need to add that image thing from the previous project */}
                <input
                    name="image"
                    type="input"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    name="description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    name="price"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required />
            </label>

            <button>Submit</button>
        </form >
    );
}