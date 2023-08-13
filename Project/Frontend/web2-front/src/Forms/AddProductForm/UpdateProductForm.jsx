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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ color: "white", background: "#0c1215" }}
      >
        asdasdsa
      </Dialog>
    </div>
  );
};

export default UpdateProductForm;
