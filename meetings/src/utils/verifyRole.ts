import axios from "axios";

const verifyRole = async (token: any, role: string) => {
  //validating the user's token
  let resV;
  try {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    resV = await axios.post(
      "http://auth:3000/api/v1/auth/verify",
      { role: "instructor" },
      config
    );
  } catch (err) {
    return "error";
  }
  return resV;
};

export { verifyRole };
