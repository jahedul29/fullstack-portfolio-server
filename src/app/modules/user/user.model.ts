import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import config from '../../../config';
import { userRoles, userStatus } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[\w-]+(\.[w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: userRoles,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: userStatus,
      default: 'active',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (email: string): Promise<
  | (Pick<IUser, 'email' | 'role' | 'password'> & {
      _id: Types.ObjectId;
    })
  | null
> {
  return await User.findOne(
    { email },
    {
      _id: 1,
      phoneNumber: 1,
      password: 1,
      role: 1,
    }
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  currentPassword: string
) {
  return await bcrypt.compare(givenPassword, currentPassword);
};

//* You can use this if you want to do some operation before saving it in databse.
//* Below it's hashing the password before saving.
userSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

//* You can use this if you want to do some operation before updating it in databse.
//* Below it's hashing the password before updating.
userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update: any = this.getUpdate();
    if (update.password) {
      update.password = await bcrypt.hash(
        update.password,
        Number(config.bcrypt_salt_rounds)
      );
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
