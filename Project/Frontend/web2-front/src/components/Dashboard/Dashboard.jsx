import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { Button } from "@mui/material";
import userService from "../../services/userService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import VerifiedIcon from "@mui/icons-material/Verified";
import AppsIcon from "@mui/icons-material/Apps";
import CategoryIcon from "@mui/icons-material/Category";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const context = useContext(AuthContext);

  return (
    <div className={classes.dashboard}>
      <Link to="/profile" className={classes.but}>
        <Button variant="contained" className={classes.iconButton}>
          <div className={classes.iconContainer}>
            <AccountCircleIcon className={classes.icon} />
          </div>
          <Typography variant="subtitle1">Profile</Typography>
        </Button>
      </Link>
      {context.type() === "Administrator" && (
        <>
          <Link to="/verifications" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <VerifiedIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">Verifications</Typography>
            </Button>
          </Link>
          <Link to="/all-orders" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <AppsIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">All orders</Typography>
            </Button>
          </Link>
        </>
      )}
      {context.type() === "Seller" && (
        <>
          <Link to="/my-products" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <CategoryIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">Products</Typography>
            </Button>
          </Link>
          <Link to="/new-orders" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <ModeOfTravelIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">New orders</Typography>
            </Button>
          </Link>
          <Link to="/my-orders" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <AppsIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">My orders</Typography>
            </Button>
          </Link>
        </>
      )}
      {context.type() === "Buyer" && (
        <>
          <Link to="/new-order" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <AddShoppingCartIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">New order</Typography>
            </Button>
          </Link>
          <Link to="/previous-orders" className={classes.but}>
            <Button variant="contained" className={classes.iconButton}>
              <div className={classes.iconContainer}>
                <HistoryIcon className={classes.icon} />
              </div>
              <Typography variant="subtitle1">Previous orders</Typography>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Dashboard;
