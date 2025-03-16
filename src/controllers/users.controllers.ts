import { Request, Response } from 'express';
import databaseService from '@/services/database.services';
import User from '@/models/schemas/User.schemas';
import usersService from '@/services/users.services';
import { ParamsDictionary } from 'express-serve-static-core';
import { RegisterReqBody } from '@/models/requests/User.requests';
export const login = (req: Request, res: Response) => {
  res.json({ message: 'Login Successfully' });
};

/*
  Description: Register a new user  
  Path: /users/register
  Method: POST
  Body: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date(ISO 8601);
  }
*/

export const register = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const newUser = await usersService.register(req.body);
    res.json({ message: 'Register Successfully', user: newUser });
  } catch (error) {
    res.json({ message: 'Register Failed - ' + error });
  }
};
