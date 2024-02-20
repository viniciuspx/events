import axios from "axios";

export const signup = async (event: any) => {
  event.preventDefault();
  await axios
    .post(process.env.API_URL + "/auth/register", {
      name: event.target.elements.name.value,
      username: event.target.elements.username.value,
      email: event.target.elements.email.value.toLowerCase(),
      password: event.target.elements.password.value,
    })
    .then((response) => {
      console.log(response.status);
    });
};
