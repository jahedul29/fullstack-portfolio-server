/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants/common';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { experienceFilterableFields } from './experience.constant';
import { ExperienceService } from './experience.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const experience = req.body;

    const savedExperience = await ExperienceService.create(experience);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Experience saved successfully',
      data: savedExperience,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const experience = req.body;

    const savedExperience = await ExperienceService.update(experience, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Experience updated successfully',
      data: savedExperience,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, experienceFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await ExperienceService.findAll(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Experiences retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedExperience = await ExperienceService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Experience retrieved successfully',
      data: savedExperience,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedExperience = await ExperienceService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Experience deleted successfully',
      data: deletedExperience,
    });
  }
);

export const ExperienceController = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
