import AdminCard from "../components/admin/AdminCard";
import "./shop.css";
import { useEffect, useState } from "react";
import { getRequest } from "../services/fetchdata";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRequest("/admin/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
