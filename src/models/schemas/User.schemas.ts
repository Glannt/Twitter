import { ObjectId } from 'mongodb';
import { UserVerifyStatus } from '@/constants/enums';

interface UserType {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  verify?: UserVerifyStatus;
  date_of_birth: Date;
  createdAt?: Date;
  updatedAt?: Date;
  email_verify_token?: string;
  forgot_password_token?: string;
  verify_email_token?: string;
  // verify_email_token_expires_at: Date;
  // verify_email_token_used: boolean;
  // verify_email_token_used_at: Date;
  bio?: string;
  location?: string;
  website?: string;
  username?: string;
  avatar?: string;
  cover_photo?: string;
}

class User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  verify: UserVerifyStatus;
  date_of_birth: Date;
  createdAt: Date;
  updatedAt: Date;
  email_verify_token: string;
  forgot_password_token: string;
  verify_email_token: string;
  // verify_email_token_expires_at: Date;
  // verify_email_token_used: boolean;
  // verify_email_token_used_at: Date;
  bio: string;
  location: string;
  website: string;
  username: string;
  avatar: string;
  cover_photo: string;

  constructor(user: UserType) {
    this._id = user._id || new ObjectId();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.verify = user.verify || UserVerifyStatus.Unverified;
    this.date_of_birth = user.date_of_birth;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
    this.email_verify_token = user.email_verify_token || '';
    this.forgot_password_token = user.forgot_password_token || '';
    this.verify_email_token = user.verify_email_token || '';
    this.bio = user.bio || '';
    this.location = user.location || '';
    this.website = user.website || '';
    this.username = user.username || '';
    this.avatar = user.avatar || '';
    this.cover_photo = user.cover_photo || '';
  }
}

export default User;
