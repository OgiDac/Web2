import { useEffect, useState } from "react";
import adminService from "../../../services/adminService";
import Orders from "../../Orders/Orders";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    adminService.getOrders().then((res) => {setOrders(res); console.log(res)});
  }, []);

  return <Orders orders={orders} title={"All orders"} />;
};

export default AllOrders;
