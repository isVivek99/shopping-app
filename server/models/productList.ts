import { Schema, Model, model } from 'mongoose'
import Joi from 'joi'

//& interfaces

interface IProductListSchema {
  pName: string
  pDesc: string
  price: number
  img: string
  rating: number
  id: number
  pWeight: string
  weights: Array<string>
  carouselImages: Array<string>
  quantity: number
  category: string
  addedToCart: boolean
  addedToWishlist: boolean
}

type IProductListModel = Model<IProductListSchema, Record<string, never>>

//& schema
const productListSchema = new Schema<IProductListSchema, IProductListModel>({
  pName: { type: String, required: true },
  pDesc: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  rating: { type: Number, required: true },
  id: { type: Number, required: true },
  pWeight: { type: String, required: true },
  weights: [],
  carouselImages: [],
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  addedToCart: { type: Boolean, required: true },
  addedToWishlist: { type: Boolean, required: true },
})

//& Model
const ProductList = model<IProductListSchema, IProductListModel>(
  'productList',
  productListSchema,
)

//& Validation
const validateProductList = (productList: Array<IProductListSchema>) => {
  const schema = Joi.object({
    pName: Joi.string().required(),
    pDesc: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
    rating: Joi.number().required(),
    id: Joi.number().required(),
    pWeight: Joi.string().required(),
    weights: Joi.array().required(),
    carouselImages: Joi.array().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
    addedToCart: Joi.bool(),
    addedToWishlist: Joi.bool(),
    products: Joi.array(),
  })
  return schema.validate(productList)
}

export { ProductList, productListSchema, validateProductList }
