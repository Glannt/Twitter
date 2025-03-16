import User from '@/models/schemas/User.schemas';
import databaseService from './database.services';
import { RegisterReqBody } from '@/models/requests/User.requests';
import { hashPassword } from '@/utils/crypto';
import { signToken } from '@/utils/jwt';
import { TokenType } from '@/constants/enums';
import jwt from 'jsonwebtoken';
class UsersService {
  constructor() {}
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
      },
      options: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn'],
      },
    });
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
      },
      options: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions['expiresIn'],
      },
    });
  }
  async register(payLoad: RegisterReqBody) {
    try {
      const newUser = await databaseService.users.insertOne(
        new User({
          ...payLoad,
          date_of_birth: new Date(payLoad.date_of_birth),
          password: hashPassword(payLoad.password as string),
        })
      );
      const user_id = newUser.insertedId.toString();
      const [accessToken, refreshToken] = await Promise.all([
        this.signAccessToken(user_id),
        this.signRefreshToken(user_id),
      ]);
      return {
        user: newUser,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error('Register failed');
    }
  }

  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email });
    console.log('checkEmailExist: ', !!user);
    return !!user;
  }
}
const usersService = new UsersService();
export default usersService;
