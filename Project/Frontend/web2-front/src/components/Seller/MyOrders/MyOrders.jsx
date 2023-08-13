import { useEffect, useState } from "react";
import sellerService from "../../../services/sellerService";
import Orders from "../../Orders/Orders";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
      sellerService.getMyOrders().then((res) => {
        setOrders(res);
      });
    }, []);
    return (
    <Orders orders={orders} title={"Orders"}/>
    );
}
 
export default MyOrders;