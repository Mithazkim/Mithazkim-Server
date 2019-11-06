import { IUserDocument } from './../models/userModel';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    ...options
  });
};

export const generateRefreshToken = (payload: object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    ...options
  });
};

export const generateAuthTokens = (user: IUserDocument) => {
  delete user.password;

  // Create token
  const accessToken = generateAccessToken(user.toJSON());
  const refreshToken = generateRefreshToken({ id: user._id });
  return [accessToken, refreshToken];
};

export const validateRefreshToken = (token: string): jwtPayload => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY) as jwtPayload;
  } catch (error) {
    return undefined;
  }
};

export type jwtPayload = {
  _id: string;
  username: string;
};
