import { Request, Response } from 'express';
import { ResponseWrapper, responseObject } from '../helpers/';
import { listingPageProductListService } from '../services';

export const getListingPageProductList = async (_, res: Response) => {
  const result: responseObject =
    await listingPageProductListService.getListingPageProductList();
  const response: ResponseWrapper = new ResponseWrapper(res);
  return response.ok(result);
};
