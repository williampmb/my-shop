import "./add-product.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const editMode = !id ? false : true;

  useEffect(() => {
    if (editMode) {
      fetch(`http://localhost:3000/admin/edit-product/${id}`)
        .then((resp) => {
          if (resp.status === 200) {
            console.log("Edit prod from server: ", resp);
            return resp.json();
          }
        })
        .then((data) => {
          console.log("EDITING PRODUCT ID :", data);
          setTitle(data.title);
          setDescription(data.description);
          setImgUrl(data.image_url);
          setPrice(Number(data.price));
        })
        .catch((err) => console.log(err));
    }
  }, [editMode, id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const editProduct = () => {
    fetch("http://localhost:3000/admin/edit-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, price, imgUrl, description }),
    })
      .then((resp) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = () => {
    fetch("http://localhost:3000/admin/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, price, imgUrl, description }),
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
          value={title}
          onChange={handleTitleChange}
        ></input>
      </label>
      <label className="form-control">
        Image
        <input
          id="image"
          type="text"
          name="image"
          value={imgUrl}
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
          value={price}
          onChange={handlePriceChange}
        ></input>
      </label>
      <label className="form-control">
        Description
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
