"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategorySubTopicListLists = void 0;
const helpers_1 = require("../helpers");
const services_1 = require("../services");
const getAllCategorySubTopicListLists = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.categorySubTopicListService.getCategorySubTopicList();
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.getAllCategorySubTopicListLists = getAllCategorySubTopicListLists;
//# sourceMappingURL=categorySubTopicList.js.map