import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers/';
import { categorySubTopicListService } from '../services';

export const getAllCategorySubTopicListLists = async (_, res: Response) => {
  const result: responseObject =
    await categorySubTopicListService.getCategorySubTopicList();
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
