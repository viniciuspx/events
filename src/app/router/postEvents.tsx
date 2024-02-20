import axios from "axios";

export const postEvents = async (userId: string, date: string, events: any) => {
  var res = false;
  const payload = JSON.stringify({
    userId: userId,
    date: date,
    events: events,
  });
  await axios
    .post(process.env.API_URL + "/events/create", { payload })
    .then((response) => {
      if (response.status === 200) {
        res = true;
      }
    });
  return res;
};
