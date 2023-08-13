import { useEffect, useState } from "react";
import sellerService from "../../../services/sellerService";
import Orders from "../../Orders/Orders";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    sellerService.getNewOrders().then((res) => setOrders(res));
  }, []);
  return <Orders orders={orders} title={"New orders"} />;
};

export default NewOrders;