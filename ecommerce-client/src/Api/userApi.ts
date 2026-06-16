import api from "./axios";

export const getUser = async () => {
  const res = await api.get(`/users/1?select=firstName,lastName,image`);
  const data = res.data;

  return data;
};
