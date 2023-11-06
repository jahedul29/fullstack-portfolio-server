/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants/common';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { contributionFilterableFields } from './contribution.constant';
import { ContributionService } from './contribution.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const contribution = req.body;

    const savedContribution = await ContributionService.create(contribution);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Contribution saved successfully',
      data: savedContribution,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const contribution = req.body;

    const savedContribution = await ContributionService.update(
      contribution,
      id
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Contribution updated successfully',
      data: savedContribution,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, contributionFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await ContributionService.findAll(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Contributions retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedContribution = await ContributionService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Contribution retrieved successfully',
      data: savedContribution,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedContribution = await ContributionService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Contribution deleted successfully',
      data: deletedContribution,
    });
  }
);

export const ContributionController = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
