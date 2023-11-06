/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { OwnerService } from './owner.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const ownerData = req.body;

    const savedUser = await OwnerService.create(ownerData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Owner saved successfully',
      data: savedUser,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.body;

    const savedUser = await OwnerService.update(user, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Owner updated successfully',
      data: savedUser,
    });
  }
);

const getOwner: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await OwnerService.getOwner();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Owner retrieved successfully',
      data: result,
    });
  }
);

export const OwnerController = {
  create,
  update,
  getOwner,
};
