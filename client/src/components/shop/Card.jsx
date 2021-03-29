import "../../pages/shop.css";
import { Link, useHistory } from "react-router-dom";
import { postRequest } from "../../services/fetchdata";

const Card = ({ title, imgSrc, imgAlt, price, description, id }) => {
  const history = useHistory();

  const handleAddCart = () => {
    postRequest("/cart", {
      id,
    })
      .then((response) => {
        history.push("/cart");
      })
      .catch((err) => {});
  };

  console.log(imgSrc);
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
        <Link to={`/product/${id}`} className="btn">
          Details
        </Link>
        <button className="btn" onClick={handleAddCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Card;
