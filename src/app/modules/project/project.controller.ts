/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants/common';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { projectFilterableFields } from './project.constant';
import { ProjectService } from './project.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = req.body;

    const savedProject = await ProjectService.create(project);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project saved successfully',
      data: savedProject,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = req.body;

    const savedProject = await ProjectService.update(project, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project updated successfully',
      data: savedProject,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, projectFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await ProjectService.findAll(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Projects retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedProject = await ProjectService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project retrieved successfully',
      data: savedProject,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedProject = await ProjectService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Project deleted successfully',
      data: deletedProject,
    });
  }
);

export const ProjectController = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
