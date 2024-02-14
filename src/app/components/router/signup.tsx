import axios from "axios";

export const signup = async (event: any) => {
  event.preventDefault();

  try {
    await axios
      .post(process.env.API_URL + "/auth/register", {
        name: event.target.elements.name.value,
        username: event.target.elements.username.value,
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
      })
      .then((response) => {
        console.log(response.statusText === "OK");
      });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
