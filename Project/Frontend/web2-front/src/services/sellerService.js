import api from "../api/api";
import { OrderModel, ProductModel } from "../models/models";

const getNewOrders = async () => {
  try {
    const res = await api.get("seller/new-orders");
    return res.data ? res.data.map(o => new OrderModel(o)) : [];
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getMyOrders = async () => {
  try {
    const res = await api.get("seller/orders");
    return res.data ? res.data.map(o => new OrderModel(o)) : [];;
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getProducts = async () => {
  try {
    const res = await api.get("seller/products");
    return res.data ? res.data.map(o => new ProductModel(o)) : [];;
  } catch (e) {
    alert(e.response.data.Exception);
    return [];
  }
};

const getProduct = async (id) => {
  try {
    const res = await api.get("seller/products/" + id);
    return res.data ? new ProductModel(res.data) : null;
  } catch (e) {
    alert(e.response.data.Exception);
    return null;
  }
};

const putProduct = async (data) => {
  try {
    await api.put("seller/products", data, { headers: { "Content-Type":"multipart/form-data" }});
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const postProduct = async (data) => {
  try {
    await api.post("seller/products", data, { headers: { "Content-Type": "multipart/form-data" } });
    return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

const deleteProduct = async (id) => {
  try {
   await api.delete("seller/products/" + id);
   return true;
  } catch (e) {
    alert(e.response.data.Exception);
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNewOrders,
  getMyOrders,
  getProducts,
  getProduct,
  putProduct,
  postProduct,
  deleteProduct,
}
