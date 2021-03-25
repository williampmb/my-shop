import Card from "../components/shop/Card";
import "./shop.css";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("SHOPJSX RESPONSE SERVER:", response.data);
          setProducts(response.data);
        }
        //throw new Error(response);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch abort");
        } else {
          console.log(err);
        }
      });
    return () => abortCont.abort(); //abort any fetch that is not complete
  }, []);

  const ListProduct = products.map((product, index) => (
    <Card
      key={index}
      title={product.title}
      imgSrc={product.imageUrl}
      imgAlt={product.title}
      description={product.description}
      price={product.price}
      id={product._id}
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

export default Shop;
