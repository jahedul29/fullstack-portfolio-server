/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants/common';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { skillFilterableFields } from './skill.constant';
import { SkillService } from './skill.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const skill = req.body;

    const savedSkill = await SkillService.create(skill);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Skill saved successfully',
      data: savedSkill,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const skill = req.body;

    const savedSkill = await SkillService.update(skill, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Skill updated successfully',
      data: savedSkill,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, skillFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await SkillService.findAll(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Skills retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedSkill = await SkillService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Skill retrieved successfully',
      data: savedSkill,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedSkill = await SkillService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Skill deleted successfully',
      data: deletedSkill,
    });
  }
);

export const SkillController = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
