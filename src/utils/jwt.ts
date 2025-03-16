import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm,
  },
}: {
  payload: string | Buffer | object;
  privateKey?: string;
  options: jwt.SignOptions;
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
};

export const verifyToken = (token: string, privateKey: string) => {
  return jwt.verify(token, privateKey);
};
