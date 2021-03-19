import "./add-product.css";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3001/admin/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, imgUrl, description }),
    })
      .then((resp) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e) => {
    setImgUrl(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-control">
        Title
        <input
          id="title"
          type="text"
          name="title"
          onChange={handleTitleChange}
        ></input>
      </label>
      <label className="form-control">
        Image
        <input
          id="image"
          type="text"
          name="image"
          onChange={handleImageChange}
        ></input>
      </label>
      <label className="form-control">
        Price
        <input
          id="price"
          type="number"
          step="0.01"
          name="price"
          onChange={handlePriceChange}
        ></input>
      </label>
      <label className="form-control">
        Description
        <textarea
          id="description"
          name="description"
          rows={5}
          onChange={handleDescriptionChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
