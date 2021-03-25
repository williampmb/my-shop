import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        return response.data;
      })
      .then((orders) => {
        console.log(orders);
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
