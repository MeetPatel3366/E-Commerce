import api from "./axios";

export const getCategories = async () => {
  const res = await api.get("/products/categories");
  const data = res.data;

  return data;
};

export const getProductsByCategory = async (
  category: string,
  limit: number,
  skip: number,
) => {
  const res = await api.get(
    `/products/category/${category}?limit=${limit}&skip=${skip}`,
  );
  const data = res.data;

  return data;
};

export const searchProducts = async (
  query: string,
  limit: number,
  skip: number,
) => {
  const res = await api.get(
    `/products/search?q=${query}&limit=${limit}&skip=${skip}`,
  );
  const data = res.data;

  return data;
};

export const getProduct = async (id: number) => {
  const res = await api.get(`/products/${id}`);
  const data = res.data;
  
  return data;
};
