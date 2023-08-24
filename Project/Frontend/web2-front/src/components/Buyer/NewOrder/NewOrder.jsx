import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import sellerService from "../../../services/sellerService";
import buyerService from "../../../services/buyerService";
import classes from "./NewOrder.module.css";
import { convertImage } from "../../../helpers/helpers";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import Confirm from "./Confirm/Confirm";

const NewOrder = () => {
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const updateProducts = () => {
    buyerService.getProducts().then((res) => {
        setProducts(res)
        const temp = {...cart};
        for (const i in res) {
          if (!temp[res[i].id]) 
            temp[res[i].id] = 0;
        }
        setCart(temp);
    
    });
    
  };

  const changeValue = (id, value, maxAmount) => {
    setCart({ ...cart, [id]: value < 0 ? 0 : Math.min(maxAmount, value) });
  };

  

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <>{open && <Confirm setOpen={setOpen} products={products} />}<div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}
      >
          {products &&
              products.length > 0 &&
              products.map((p, index) => (
                  <Card
                      className={classes.card}
                      sx={{ color: "white", background: "#0c1215" }}
                      key={index}
                  >
                      <CardMedia
                          component="img"
                          alt="No pic"
                          sx={{ height: 150, width: "100%", objectFit: "contain" }}
                          image={p.image && convertImage(p.image)} />
                      <CardContent sx={{maxHeight: '130px', overflowY: 'auto'}}>
                          <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                              Seller: {p.seller.fullName}
                          </Typography>
                          <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                              Name: {p.name}
                          </Typography>
                          <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                              Price: {p.price}
                          </Typography>
                          <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                              Amount: {p.amount}
                          </Typography>
                          <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                              Description: {p.description}
                          </Typography>
                      </CardContent>
                      <CardActions>
                          <>
                              <Button
                                  variant="contained"
                                  sx={{
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      maxWidth: "20px",
                                      maxHeight: "20px",
                                      marginRight: "10px",
                                      marginLeft: "10px",
                                  }}
                                  onClick={(e) => changeValue(p.id, cart[p.id] - 1, p.amount)}
                              >
                                  {"<"}
                              </Button>
                              <input
                                  className={classes.numb}
                                  pattern="[0-9]{0,4}"
                                  placeholder="0"
                                  value={cart[p.id]}
                                  onChange={(e) => changeValue(p.id, e.target.value, p.amount)} />
                              <Button
                                  sx={{
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      maxWidth: "20px",
                                      maxHeight: "20px",
                                      marginRight: "10px",
                                      marginLeft: "10px",
                                  }}
                                  variant="contained"
                                  onClick={(e) => changeValue(p.id, cart[p.id] + 1, p.amount)}
                              >
                                  {">"}
                              </Button>
                          </>
                      </CardActions>
                  </Card>
              ))}
          <Button
              sx={{
                  position: "fixed",
                  bottom: 0,
                  right: 0,
                  zIndex: 9999,
                  minWidth: "50px",
                  minHeight: "50px",
                  maxWidth: "50px",
                  maxHeight: "50px",
                  marginRight: "50px",
                  marginBottom: "50px",
              }}
              variant="contained"
              onClick={(e) => setOpen(true)}
          >
              Buy
          </Button>
      </div></>
  );
};

export default NewOrder;
