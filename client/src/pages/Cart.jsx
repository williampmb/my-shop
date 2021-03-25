import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const Cart = () => {
  const [item, setItems] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchCartItens();
  }, []);

  const fetchCartItens = () => {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => {
        if (response.status === 200) return response.data;
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
    console.log(item);
    axios
      .post("http://localhost:3000/delete-cart-item", {
        id: item.productId._id,
      })
      .then((response) => {
        console.log("CART FIXED");
        fetchCartItens();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateOrder = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/create-order", {
        id: "1",
      })
      .then((response) => {
        console.log("ORDER COMPLETE");
        setItems([]);
        history.push("/orders");
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
                  <td>{item.productId.title} </td>
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
