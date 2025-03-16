import usersService from '@/services/users.services';
import validate from '@/utils/validation';
import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  next();
};

// export const registerValidator = (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }
//   next();
// };

export const registerValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage: 'Name is required',
      },
    },
    email: {
      trim: true,
      notEmpty: true,
      isEmail: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await usersService.checkEmailExist(value);
          if (isExistEmail) {
            throw new Error('Email already exists');
          }
          return true;
        },
        errorMessage: 'Email already exists',
      },
      errorMessage: 'Invalid email',
    },
    password: {
      trim: true,
      notEmpty: true,
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
        errorMessage:
          'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      },
    },
    confirm_password: {
      trim: true,
      notEmpty: true,
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
        errorMessage:
          'Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      },
      custom: {
        options: (value, { req }) => {
          return value === req.body.password;
        },
        errorMessage: 'Password not match',
      },
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true,
        },
        errorMessage: 'Invalid date of birth',
      },
    },
  })
);
