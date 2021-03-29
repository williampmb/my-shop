import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./product-details.css";
import { getRequest, postRequest } from "../services/fetchdata";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const handleAddCart = () => {
    postRequest("/cart")
      .then((response) => {
        history.push("/cart");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getRequest(`/product/${id}`)
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log("ERRO:", err);
      });
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50rem",
      }}
    >
      {product && (
        <main className="content">
          <h1>{product.title}</h1>
          <hr></hr>
          <div className="product-image">
            <img src={product.imageUrl} alt={product.title} />
          </div>
          <h2>{product.price}</h2>
          <p>{product.description}</p>
          <button className="btn" onClick={handleAddCart}>
            Add to Cart
          </button>
        </main>
      )}
    </div>
  );
};

export default ProductDetail;
