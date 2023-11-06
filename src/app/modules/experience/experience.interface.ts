import { Types } from 'mongoose';

type IMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

/* eslint-disable no-unused-vars */
export type IExperience = {
  companyName: string;
  position: string;
  startMonth: IMonth;
  startYear: string;
  endMonth?: IMonth;
  endYear?: string;
  isWorkingCurrently?: boolean;
  show: boolean;
  technologies: Types.ObjectId[];
};

export type IExperienceMethods = object;

export type IExperienceFilters = {
  searchTerm?: string;
  isFeatured?: boolean;
};
