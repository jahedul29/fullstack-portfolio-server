import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { IPaginationParams } from '../../../shared/interfaces';
import { experienceSearchableFields } from './experience.constant';
import { IExperience, IExperienceFilters } from './experience.interface';
import Experience from './experience.model';

const create = async (experience: IExperience): Promise<IExperience | null> => {
  const savedExperience = (await Experience.create(experience)).toObject();
  return savedExperience;
};

const update = async (
  experience: Partial<IExperience>,
  id: string
): Promise<IExperience | null> => {
  const isExist = await Experience.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  }

  const updatedExperienceData: Partial<IExperience> = { ...experience };

  const savedExperience = await Experience.findOneAndUpdate(
    { _id: id },
    updatedExperienceData,
    {
      new: true,
    }
  );

  return savedExperience;
};

const findAll = async (
  filters: IExperienceFilters,
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
  const searchableFields: string[] = experienceSearchableFields;

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

  const result = await Experience.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Experience.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const findOne = async (id: string): Promise<IExperience | null> => {
  const savedExperience = await Experience.findById(id);
  if (!savedExperience) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  }
  return savedExperience;
};

const deleteOne = async (id: string): Promise<IExperience | null> => {
  const savedExperience = await Experience.findByIdAndDelete(id);
  return savedExperience;
};

export const ExperienceService = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
