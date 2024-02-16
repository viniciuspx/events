import axios from "axios";

export const deleteAllEntries = async (userId: string) => {
  const res = await axios.delete(process.env.API_URL + `/events/delete/${userId}`);
};
