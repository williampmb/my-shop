import Card from "../components/shop/Card";
import "./shop.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";

axios.defaults.withCredentials = true;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [user] = useLoginContext();
  console.log("USER FROM CONTEXT IS: ", user);

  useEffect(() => {
    const abortCont = new AbortController();

    axios
      .get("http://localhost:3000/")
      .then((response) => {
        console.log("HIT  RESPONSE /");
        console.log(response);
        if (response.status === 200) {
          console.log("SHOPJSX RESPONSE SERVER:", response.data);
          setProducts(response.data);
        }
        //throw new Error(response);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          history.push("/login");
        } else if (err.name === "AbortError") {
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
