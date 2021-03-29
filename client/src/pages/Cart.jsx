import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRequest, postRequest, deleteRequest } from "../services/fetchdata";

const Cart = () => {
  const [item, setItems] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchCartItens();
  }, []);

  const fetchCartItens = () => {
    getRequest("/cart")
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = (item) => {
    deleteRequest("/delete-cart-item", {
      id: item.productId._id,
    }).then((response) => {
      if (response) {
        console.log(response);
        fetchCartItens();
      }
    });
  };

  const handleCreateOrder = (event) => {
    event.preventDefault();
    postRequest("/create-order")
      .then((response) => {
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
        {item && item.length !== 0 && (
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
        {!item || (item.length === 0 && <p>No records in Carts</p>)}
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
