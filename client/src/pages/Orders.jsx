import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import { getRequest } from "../services/fetchdata";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useLoginContext();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getRequest("/orders")
      .then((orders) => {
        console.log("MY ORDERS", orders);
        setOrders(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListOrders = orders.map((order, index) => (
    <li key={order._id}>
      <h2># {order._id}</h2>
      <ul>
        {order.products.map((item, index) => (
          <li key={index}>
            {item.product.title} {item.quantity}
          </li>
        ))}
      </ul>
    </li>
  ));
  return (
    <main>
      <div>
        <ul>{orders && orders.length > 0 && ListOrders}</ul>
      </div>
    </main>
  );
};

export default Orders;
