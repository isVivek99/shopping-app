import express from 'express';
const router = express.Router();
import { getAllCategorySubTopicListLists } from '../controllers';

router.get('/', getAllCategorySubTopicListLists);

export default router;
