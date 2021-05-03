import { sign } from "jsonwebtoken";

 const createAccessToken = (payload: any) => {
  return sign(payload, 's,dghb', {
    expiresIn: "5m"
  });
};

 const createRefreshToken = (payload: any) => {
  return sign(payload,'s,dghb',{
      expiresIn: "10d"
    });
};

export {createAccessToken, createRefreshToken};