import { Schema, Model, model } from 'mongoose';
import Joi from 'joi';

//& interfaces

interface IListingPageProductListSchema {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  rating: number;
  id: number;
  discount: string;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
}

type IListingPageProductListModel = Model<
  IListingPageProductListSchema,
  Record<string, never>
>;

//& schema
const listingPageProductListSchema = new Schema<
  IListingPageProductListSchema,
  IListingPageProductListModel
>({
  pName: { type: String, required: true },
  pDesc: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  addedToCart: { type: Boolean, required: true },
  addedToWishlist: { type: Boolean, required: true },
});

//& Model
const ListingPageProductList = model<
  IListingPageProductListSchema,
  IListingPageProductListModel
>('listingPageProductList', listingPageProductListSchema);

//& Validation
const validateListingPageProductList = (
  ListingPageProductList: Array<IListingPageProductListSchema>,
) => {
  const schema = Joi.object({
    pName: Joi.string().required(),
    pDesc: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
    rating: Joi.number().required(),
    id: Joi.number().required(),
    quantity: Joi.number().required(),
    addedToCart: Joi.bool(),
    addedToWishlist: Joi.bool(),
  });
  return schema.validate(ListingPageProductList);
};

export {
  ListingPageProductList,
  listingPageProductListSchema,
  validateListingPageProductList,
};
