import axios from "axios";
import { setUserInfo } from "../dashboard";

export const login = async (event: any) => {
  var res = false;
  await axios
    .post(process.env.API_URL + "/auth/login", {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    })
    .then((response) => {
      if (response.status === 200) {
        setUserInfo(response.data.username, response.data._id);
        res = true;
      }
    });
  return res;
};
