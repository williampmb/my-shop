import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/shop/Card";
import { getRequest } from "../services/fetchdata";
import "./shop.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortCont = new AbortController();

    getRequest("/")
      .then((response) => {
        setProducts(response);
      })
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          history.push("/login");
        } else if (err.name === "AbortError") {
          console.log("fetch abort");
        } else {
          console.log(err);
        }
      });
    return () => abortCont.abort(); //
  }, []);

  const ListProduct = products.map((product, index) => (
    <Card
      key={index}
      id={product._id}
      title={product.title}
      imgSrc={product.imageUrl}
      imgAlt={product.title}
      description={product.description}
      price={product.price}
    ></Card>
  ));

  return (
    <div className="shop">
      <div className="grid">
        {ListProduct.length === 0 && <p>No products</p>}
        {ListProduct}
      </div>
    </div>
  );
};

export default Products;
