import { useEffect, useState } from "react";

const Cart = () => {
  const [item, setItems] = useState([]);
  useEffect(() => {
    fetchCartItens();
  }, []);

  const fetchCartItens = () => {
    fetch("http://localhost:3000/cart")
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = (item) => {
    fetch("http://localhost:3000/delete-cart-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    })
      .then((response) => {
        console.log("CART FIXED");
        fetchCartItens();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {item.length !== 0 && (
        <ul>
          {item.map((item, index) => (
            <li key={index}>
              <p>{item.prod.title + " " + item.qty}</p>
              <button onClick={() => handleDeleteItem(item.prod)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {item.length === 0 && <p>No records in Carts</p>}
    </div>
  );
};
export default Cart;
