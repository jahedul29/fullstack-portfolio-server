import mongoose, { Types } from 'mongoose';
import { z } from 'zod';
import { monthList } from './experience.constant';

const create = z.object({
  body: z.object({
    companyName: z.string({
      required_error: 'Company name is required',
    }),
    position: z.string({
      required_error: 'Position is required',
    }),
    startMonth: z.enum(monthList as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    startYear: z.string({
      required_error: 'Start year is required',
    }),
    endMonth: z.enum(monthList as [string, ...string[]]).optional(),
    endYear: z.string().optional(),
    isWorkingCurrently: z.boolean().optional(),
    show: z.boolean({
      required_error: 'Show is required and must be a boolean',
    }),
    technologies: z.array(z.instanceof(Types.ObjectId), {
      required_error:
        'Technologies array is required and must contain valid MongoDB ObjectIds',
    }),
  }),
});

const update = z.object({
  body: z.object({
    companyName: z.string().optional(),
    position: z.string().optional(),
    startMonth: z.enum(monthList as [string, ...string[]]).optional(),
    startYear: z.string().optional(),
    endMonth: z.enum(monthList as [string, ...string[]]).optional(),
    endYear: z.string().optional(),
    isWorkingCurrently: z.boolean().optional(),
    show: z.boolean().optional(),
    technologies: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  }),
});

export const ExperienceValidationSchema = {
  create,
  update,
};
