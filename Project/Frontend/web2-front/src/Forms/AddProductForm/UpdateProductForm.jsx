import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import sellerService from "../../services/sellerService";
import classes from "../Forms.module.css";

import { convertImage } from "../../helpers/helpers";

const UpdateProductForm = ({
  open,
  setOpen,
  data,
  setData,
  updateProducts,
}) => {
  const handleClose = (e) => setOpen(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeNumber = (e) => {
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setData({
      ...data,
      [e.target.id]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.description || !data.amount) {
      alert("All fields are required");
      return;
    }

    if (!data.amount || data.amount < 0 || !parseInt(data.amount)) {
      alert("Amount is integer and must be over 0.");
      return;
    }

    if (!data.price || data.price < 0 || !parseFloat(data.price)) {
      alert("Price is floater and must be over 0.");
      return;
    }

    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }
    sellerService.putProduct(formData).then((res) => res && updateProducts());
    setOpen(false);
  };


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ color: "white", background: "#0c1215" }}
      ><DialogTitle>Edit product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={data.name}
          onChange={handleChange}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="number"
          min="0"
          step="0.01"
          fullWidth
          variant="standard"
          value={data.price}
          onChange={handleChangeNumber}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          min="0"
          step="1"
          fullWidth
          variant="standard"
          value={data.amount}
          onChange={handleChangeNumber}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={data.description}
          onChange={handleChange}
          required
        />
        <img
          title="Image"
          alt="Add"
          src={data.imageFile ? URL.createObjectURL(data.imageFile) : data.image && convertImage(data.image)}
          className={classes.image}
        />
        <div>
          <input
            id="imageFile"
            label="Image"
            type="file"
            accept="image/jpg"
            onChange={(e) => {
              setData({ ...data, imageFile: e.target.files[0] });
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateProductForm;
