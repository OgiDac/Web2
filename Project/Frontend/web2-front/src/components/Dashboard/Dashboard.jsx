import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import classes from './Dashboard.module.css';
import { Button } from "@mui/material";
import userService from "../../services/userService";


const Dashboard = () => {
    const context = useContext(AuthContext);
  
    return (
      <div className={classes.dashboard}>
        <Link to="/profile" className={classes.but}><Button variant="contained">Profile</Button></Link>
        {context.type() === "Administrator" && (
          <>
            <Link to="/verifications" className={classes.but}>
              <Button variant="contained">Verifications</Button>
            </Link>
            <Link to="/all-orders" className={classes.but}>
              <Button variant="contained">All orders</Button>
            </Link>
          </>
        )}
        {context.type() === "Seller" && (
          <>
            <Link to="/my-products" className={classes.but}>
              <Button variant="contained">Products</Button>
            </Link>
            <Link to="/new-orders" className={classes.but}>
              <Button variant="contained">New orders</Button>
            </Link>
            <Link to="/my-orders" className={classes.but}>
              <Button variant="contained">My orders</Button>
            </Link>
          </>
        )}
        {context.type() === "Buyer" && (
          <>
            <Link to="/new-order" className={classes.but}>
              <Button variant="contained">New order</Button>
            </Link>
            <Link to="/previous-orders" className={classes.but}>
              <Button variant="contained">Previous orders</Button>
            </Link>
          </>
        )}
      </div>
    );
  };

export default Dashboard