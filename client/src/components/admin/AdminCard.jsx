import "../../pages/shop.css";
import { Link } from "react-router-dom";
const AdminCard = ({ title, imgSrc, imgAlt, price, description, id }) => {
  const handleDeleteProduct = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/admin/delete-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({ id: 1 }),
      },
    })
      .then((resp) => {
        console.log("sucess deleting product");
      })
      .catch((err) => {
        console.log("erro while deleting product");
      });
  };
  return (
    <article className="card product-item">
      <header className="card__header">
        <h1 className="product__title">{title}</h1>
      </header>
      <div className="card__image">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <div className="card__content">
        <h2 className="product__price">{price}</h2>
        <p className="product__description">{description}</p>
      </div>
      <div className="card__actions">
        <Link to={`/admin/add-product/${id}`} className="btn">
          Edit
        </Link>
        <form onSubmit={handleDeleteProduct}>
          <button className="btn" type="submit">
            Delete
          </button>
        </form>
      </div>
    </article>
  );
};

export default AdminCard;
