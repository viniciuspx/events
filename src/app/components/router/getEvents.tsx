import axios from "axios";

export const getEvents = async (userId: string, date: string) => {
  const res = await axios.get(
    process.env.API_URL + `/events/get/${userId}&${date}`
  );
  return res.data;
};
