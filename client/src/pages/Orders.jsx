import { useState, useEffect } from "react";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch("http://localhost:3000/orders")
      .then((response) => {
        return response.json();
      })
      .then((orders) => {
        console.log(orders);
        setOrders(orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListOrders = orders.map((order) => (
    <li>
      <h2># {order.id}</h2>
      <ul>
        {order.products.map((prod) => (
          <li>
            {prod.title} {prod.orderItem.quantity}
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
