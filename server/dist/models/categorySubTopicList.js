"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategorySubTopicList = exports.categorySubTopicListSchema = exports.CategoryListProducts = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const categorySubTopicListSchema = new mongoose_1.Schema({
    categoryName: String,
    categorySubTopicList: [],
    products: [],
});
exports.categorySubTopicListSchema = categorySubTopicListSchema;
//& Model
const CategoryListProducts = (0, mongoose_1.model)('categorysubtopiclists', categorySubTopicListSchema);
exports.CategoryListProducts = CategoryListProducts;
//& Validation
const validateCategorySubTopicList = (categorySubTopicList) => {
    const schema = joi_1.default.object({
        categoryName: joi_1.default.string().required(),
        categorySubTopicList: joi_1.default.string().required(),
        products: joi_1.default.array(),
    });
    return schema.validate(categorySubTopicList);
};
exports.validateCategorySubTopicList = validateCategorySubTopicList;
//# sourceMappingURL=categorySubTopicList.js.map