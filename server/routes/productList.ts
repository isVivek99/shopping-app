import express from 'express';
import { getProductList } from '../controllers';
const router = express.Router();

router.get('/', getProductList);

export default router;
