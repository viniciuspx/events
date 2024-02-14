import axios from "axios";

export const postList = async (userId: string, events: any) => {
  var res = false;
  const payload = JSON.stringify({ userId: userId, events: events });
  await axios
    .post(process.env.API_URL + "/events/create", { payload })
    .then((response) => {
      if (response.status === 200) {
        res = true;
      }
    });
  return res;
};
