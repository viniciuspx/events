import axios from "axios";

export const getEvents = async (userId: string) => {
  const res = await axios.get(process.env.API_URL + `/events/get/${userId}`);
  if (res.data !== null) return res.data;
};
