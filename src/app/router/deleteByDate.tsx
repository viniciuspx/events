import axios from "axios";

export const deleteByDate = async (userId: string, date: string) => {
  const res = await axios.delete(process.env.API_URL + `/events/delete/date/${userId}&${date}`);
};
