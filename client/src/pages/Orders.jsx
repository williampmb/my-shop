import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoginContext } from "../context/LoginContext";
import { getRequest } from "../services/fetchdata";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [user] = useLoginContext();
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getRequest("/orders", props.token, props.userId)
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
        {!orders || (orders.length == 0 && <p>No Orders!</p>)}
      </div>
    </main>
  );
};

export default Orders;
