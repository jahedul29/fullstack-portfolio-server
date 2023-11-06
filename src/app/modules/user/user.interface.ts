/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  phoneNumber: string;
  role: 'admin' | 'manager';
  password: string;
  address: string;
  profileUrl: string;
  status: 'active' | 'blocked';
};

export type IUserMethods = object;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserModel extends Model<IUser, object, IUserMethods> {
  isUserExist(email: string): Promise<
    | (Pick<IUser, 'email' | 'role' | 'password'> & {
        _id: Types.ObjectId;
      })
    | null
  >;
  isPasswordMatch(
    givenPassword: string,
    currentPassword: string
  ): Promise<boolean>;
}

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
};
