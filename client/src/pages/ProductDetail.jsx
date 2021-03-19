import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./product-details.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const handleAddCart = () => {
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.status === 200) {
          history.push("/cart");
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const abortFetch = new AbortController();

    fetch(`http://localhost:3000/product/${id}`, { signal: abortFetch.signal })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Data fetch product details", data);
        setProduct(data);
      })
      .catch((err) => {
        console.log("ERRO:", err);
      });

    return () => abortFetch.abort();
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
