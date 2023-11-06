/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { paginationOptions } from '../../../shared/constants/common';
import { pickQueryParams } from '../../../shared/pagination/pickQueryParams';
import { sendResponse } from '../../../shared/sendResponse';
import { blogFilterableFields } from './blog.constant';
import { BlogService } from './blog.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = req.body;

    const savedBlog = await BlogService.create(blog);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog saved successfully',
      data: savedBlog,
    });
  }
);

const update: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const blog = req.body;

    const savedBlog = await BlogService.update(blog, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog updated successfully',
      data: savedBlog,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pickQueryParams(req.query, blogFilterableFields);
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const result = await BlogService.findAll(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blogs retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedBlog = await BlogService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog retrieved successfully',
      data: savedBlog,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedBlog = await BlogService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Blog deleted successfully',
      data: deletedBlog,
    });
  }
);

export const BlogController = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
};
