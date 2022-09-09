import { Schema, Model, model } from 'mongoose';
import Joi from 'joi';

//& interfaces
interface ICategorySubTopicList {
  pName: string;
  id: number;
}
interface ICategorySubTopicListSchema {
  categoryName: string;
  categorySubTopicList: Array<ICategorySubTopicList>;
  products: Array<object>;
}

interface ICategorySubTopicListMethods {}

type ICategorySubTopicListModel = Model<
  ICategorySubTopicListSchema,
  {},
  ICategorySubTopicListMethods
>;

const categorySubTopicListSchema = new Schema<
  ICategorySubTopicListSchema,
  ICategorySubTopicListMethods,
  ICategorySubTopicListModel
>({
  categoryName: String,
  categorySubTopicList: [],
  products: [],
});

//& Model
const CategoryListProducts = model<
  ICategorySubTopicListSchema,
  ICategorySubTopicListModel
>('categorysubtopiclists', categorySubTopicListSchema);

//& Validation
const validateCategorySubTopicList = (categorySubTopicList: any) => {
  const schema = Joi.object({
    categoryName: Joi.string().required(),
    categorySubTopicList: Joi.string().required(),
    products: Joi.array(),
  });
  return schema.validate(categorySubTopicList);
};

export {
  CategoryListProducts,
  categorySubTopicListSchema,
  validateCategorySubTopicList,
};
