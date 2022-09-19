import express from 'express';
const router = express.Router();
import { getListingPageProductList } from '../controllers';

router.get('/', getListingPageProductList);

export default router;
