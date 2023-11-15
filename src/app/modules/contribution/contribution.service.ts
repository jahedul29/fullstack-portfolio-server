import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { IPaginationParams } from '../../../shared/interfaces';
import { contributionSearchableFields } from './contribution.constant';
import { IContribution, IContributionFilters } from './contribution.interface';
import Contribution from './contribution.model';

const create = async (
  contribution: IContribution
): Promise<IContribution | null> => {
  const savedContribution = (
    await Contribution.create(contribution)
  ).toObject();
  return savedContribution;
};

const update = async (
  contribution: Partial<IContribution>,
  id: string
): Promise<IContribution | null> => {
  const isExist = await Contribution.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contribution not found');
  }

  const updatedContributionData: Partial<IContribution> = { ...contribution };

  const savedContribution = await Contribution.findOneAndUpdate(
    { _id: id },
    updatedContributionData,
    {
      new: true,
    }
  ).populate('technologies');

  return savedContribution;
};

const findAll = async (
  filters: IContributionFilters,
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
  const searchableFields: string[] = contributionSearchableFields;

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

  const result = await Contribution.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('technologies');

  const total = await Contribution.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const findOne = async (id: string): Promise<IContribution | null> => {
  const savedContribution = await Contribution.findById(id).populate(
    'technologies'
  );
  if (!savedContribution) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contribution not found');
  }
  return savedContribution;
};

const deleteOne = async (id: string): Promise<IContribution | null> => {
  const savedContribution = await Contribution.findByIdAndDelete(id).populate(
    'technologies'
  );
  return savedContribution;
};

export const ContributionService = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
