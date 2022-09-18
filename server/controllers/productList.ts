import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers/';
import { productListService } from '../services';

export const getProductList = async (_, res: Response) => {
  const result: responseObject = await productListService.getProductList();
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
