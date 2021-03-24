import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [item, setItems] = useState([]);
  const history = useHistory();
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
      body: JSON.stringify({ id: item._id }),
    })
      .then((response) => {
        console.log("CART FIXED");
        fetchCartItens();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateOrder = () => {
    fetch("http://localhost:3000/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "1" }),
    })
      .then((response) => {
        history.push("/orders");
        console.log("ORDER COMPLETE");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "5rem",
      }}
    >
      <div style={{}}>
        {item.length !== 0 && (
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Quantity</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {item.map((item, index) => (
                <tr key={index}>
                  <td>{item.title} </td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleDeleteItem(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {item.length === 0 && <p>No records in Carts</p>}
      </div>
      <div
        style={{
          marginLeft: "5rem",
        }}
      >
        <form onSubmit={handleCreateOrder}>
          <button type="submit" className="btn">
            Order Now!
          </button>
        </form>
      </div>
    </main>
  );
};
export default Cart;
