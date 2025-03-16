import { log } from 'console';
import crypto from 'crypto';
import { config } from 'dotenv';
config();
const salt = crypto.randomBytes(32).toString('hex');

export const sha512 = (password: string) => {
  return crypto.createHash('sha512').update(password).digest('hex');
};

export const hashPassword = (password: string) => {
  return sha512(password);
};

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const verifyToken = (token: string, hashedToken: string) => {
  return hashToken(token) === hashedToken;
};
