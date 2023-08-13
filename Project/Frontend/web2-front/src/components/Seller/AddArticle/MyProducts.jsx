import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import AddProductForm from "../../../Forms/AddProductForm/AddProductForm";
import sellerService from "../../../services/sellerService";
import classes from "./MyProducts.module.css";
import { convertImage } from "../../../helpers/helpers";
import UpdateProductForm from "../../../Forms/AddProductForm/UpdateProductForm";

const MyProducts = () => {
  const context = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [data, setData] = useState({});

  const updateProducts = () => {
    sellerService.getProducts().then((res) => setProducts(res));
  };

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <div>
      {openAddProduct && (
        <AddProductForm
          updateProducts={updateProducts}
          setOpen={setOpenAddProduct}
        />
      )}
      <UpdateProductForm
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
        updateProducts={updateProducts}
      />
      <Button onClick={() => setOpenAddProduct(true)}>Add product</Button>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", color: "blue" }}
      >
        My products
      </Typography>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                image={p.image && convertImage(p.image)}
              />
              <CardContent>
                <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                  Product ID: {p.id}
                </Typography>
                <Typography sx={{ fontSize: 14, flexWrap: "wrap" }}>
                  Description: {p.description}
                </Typography>
              </CardContent>
              <CardActions>
                <>
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold" }}
                    color="success"
                    onClick={(e) => {
                      setData({ ...p, imageFile: "" });
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold" }}
                    color="error"
                    onClick={(e) =>
                      sellerService
                        .deleteProduct(p.id)
                        .then((res) => res && updateProducts())
                    }
                  >
                    Delete
                  </Button>
                </>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default MyProducts;
