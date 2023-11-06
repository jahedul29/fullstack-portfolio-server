import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { USER_ROLE, USER_STATUS } from '../../../shared/enum/common';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { IPaginationParams } from '../../../shared/interfaces';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import User from './user.model';

const create = async (user: IUser): Promise<IUser | null> => {
  user.status = USER_STATUS.ACTIVE;
  user.role = USER_ROLE.MANAGER;

  const savedUser = (await User.create(user)).toObject();
  return savedUser;
};

const update = async (
  user: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { name, ...userData } = user;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const savedUser = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });

  return savedUser;
};

const findAll = async (
  filters: IUserFilters,
  paginationParams: IPaginationParams
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFields(paginationParams);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }

  // working on filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  let filterCondition = {};
  const searchableFields: string[] = userSearchableFields;

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field: string) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });

    filterCondition = { $and: andConditions };
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });

    filterCondition = { $and: andConditions };
  }

  const result = await User.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const findOne = async (id: string): Promise<IUser | null> => {
  const savedUser = await User.findById(id);
  if (!savedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return savedUser;
};

const deleteOne = async (id: string): Promise<IUser | null> => {
  const savedUser = await User.findByIdAndDelete(id);
  return savedUser;
};

export const UserService = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
