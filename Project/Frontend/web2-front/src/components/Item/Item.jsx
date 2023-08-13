import { Typography } from "@mui/material";

const Item = ({ item }) => {
  return (
    <>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginRight: "auto" }}>
          <Typography sx={{ fontSize: 14, color: "lightblue" }}>Name: {item.name}</Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Typography sx={{ fontSize: 14, color: "lightblue" }}>No: {item.amount}</Typography>
          <Typography sx={{ fontSize: 14, color: "lightblue" }}>Price: {item.price}</Typography>
        </div>
      </div>
    </>
  );
};

export default Item;