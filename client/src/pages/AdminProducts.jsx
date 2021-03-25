import AdminCard from "../components/admin/AdminCard";
import "./shop.css";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    axios
      .get("http://localhost:3000/admin/products", {
        signal: abortCont.signal,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        //throw new Error(response);
      })
      .then((data) => {
        setProducts(data);
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

  const ListProduct = !products
    ? ""
    : products.map((product, index) => (
        <AdminCard
          key={index}
          title={product.title}
          imgSrc={product.imageUrl}
          imgAlt="Book"
          description={product.description}
          price={product.price}
          id={product._id}
        ></AdminCard>
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

export default AdminProducts;
