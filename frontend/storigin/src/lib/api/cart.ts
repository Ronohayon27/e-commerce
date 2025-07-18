import axios from "./axios";

export const getCartItems = async () => {
  const res = await axios.get("/cart");
  return res.data;
};

export const clearCart = async () => {
  const res = await axios.delete("/cart");
  return res.data;
};
