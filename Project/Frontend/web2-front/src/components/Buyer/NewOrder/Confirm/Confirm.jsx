import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    TextField
  } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import classes from './Confirm.module.css';
import buyerService from "../../../../services/buyerService";

const Confirm = ({ setOpen, products }) => {
  const { cart, setCart } = useContext(CartContext);
  const [data, setData] = useState({ cart: cart });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const onClose = (event, reason) => {
  }
  const handleConfirm = (e) => {
    const sendData = { deliveryAddress: data.address, comment: data.comment, items: [] };
    for (const i in cart) {
      if (cart[i] > 0) sendData.items = [...sendData.items, { productId: i, amount: cart[i] }];
    }
    buyerService.postOrder(sendData).then((res) => {
      setCart({});
      setOpen(false);
      navigate("/previous-orders");
    });
  };
  

  const writeItems = () => {
    let temp = [];
    let total = 0;
    let sellers = [];
    for (const i in cart) {
      if (cart[i] !== 0) {
        const prod = products.find((it) => it.id === parseInt(i));
        if (!prod) continue;
        temp = [...temp, { ...prod, quantity: cart[i] }];
        total += prod.price * cart[i];
        if(!sellers.find(it => it === prod.sellerId))
         sellers = [...sellers, prod.sellerId];
      }
    }
    return (
      <>
        {temp.map((o, index) => (
          <>
            <div key={index} className={classes.wrap}>
              <div className={classes.wrapLeft}>Name: {o.name}</div>
              <div className={classes.wrapRight}>
                <div>No: {o.quantity}</div>
                <div>Price: {o.price}</div>
              </div>
            </div>
            <hr />
          </>
        ))}
        <div style={{ color: "red", fontSize: 20 }}>Total: {total} </div>
        <div style={{ color: "red", fontSize: 20 }}>Delivery: {sellers.length * 99} </div>
      </>
    );
  };

  return (
    <Dialog onClose={onClose} open={true}>
      <DialogTitle>Confirm your order</DialogTitle>
      <DialogContent>
        <div>{writeItems()}</div>
        <TextField
          autoFocus
          margin="dense"
          id="address"
          label="Address (leave blank if you want it to be your home address)"
          type="text"
          fullWidth
          variant="standard"
          value={data.address}
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Comment (optional)"
          type="text"
          fullWidth
          variant="standard"
          value={data.comment}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={(e) => setOpen(false)}>
          Cancel
        </Button>
        <Button color="success" onClick={handleConfirm} >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default Confirm;
