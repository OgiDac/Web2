import { useEffect, useState } from "react";
import Orders from "../../Orders/Orders";
import buyerService from "../../../services/buyerService";

const PreviousOrders = () => {
    const [orders, setOrders] = useState([]);
    const updateOrders = () => {
      buyerService.getOrders().then((res) => setOrders(res));
    }
    useEffect(() => {
      updateOrders();
    }, []);
    return (
        <Orders orders={orders} updateOrders={updateOrders} title={"Previous orders"} />
    )
}

export default PreviousOrders;