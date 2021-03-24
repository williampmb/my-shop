import Card from "../components/shop/Card";
import "./shop.css";
import { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("http://localhost:3000/", { signal: abortCont.signal })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        //throw new Error(response);
      })
      .then((data) => {
        console.log("SHOPJSX RESPONSE SERVER:", data);
        setProducts(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch abort");
        } else {
          console.log("erro shop");
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
