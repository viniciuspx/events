import axios from "axios";

export const deleteList = async (userId: string) => {
  const res = await axios.delete(process.env.API_URL + `/list/delete/${userId}`);
};
