import React from "react";


export default function AddItemPage() {
    const [product, setProduct] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [image, setImage] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState('');


    const handleSubmit = (event) => {

        event.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Ready to add what could be someone's treasure?</h1>
            <label>
                Your Username:
                <input
                    name="username"
                    type="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required />
            </label>
            <label>
                Product Name:
                <input
                    name="product"
                    type="product"
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    required />
            </label>
            <label>
                Image:
                {/* This is where we need to add that image thing from the previous project */}
                <input
                    name="image"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    required
                />
            </label>
            <label>
                Description:
                <input
                    name="description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    name="price"
                    type="price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required />
            </label>

            <button>Submit</button>
        </form>
    );
}