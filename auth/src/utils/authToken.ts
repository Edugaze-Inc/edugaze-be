import { sign } from "jsonwebtoken";

const createAccessToken = (payload: any) =>
  sign(payload, "s,dghb", {
    expiresIn: "5m",
  });

const createRefreshToken = (payload: any) =>
  sign(payload, "s,dghb", {
    expiresIn: "10d",
  });

export { createAccessToken, createRefreshToken };
