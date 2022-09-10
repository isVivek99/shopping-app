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
exports.RefreshToken = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
//& Schema
const RefreshTokenSchema = new mongoose_1.Schema({
    token: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'freshnessUsers',
    },
    expiryDate: Date,
});
//& methods
RefreshTokenSchema.statics.createToken = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        let expireDate = new Date();
        expireDate.setSeconds(expireDate.getSeconds() + 86400);
        let _token = (0, uuid_1.v4)();
        let _object = new this({
            token: _token,
            user: user._id,
            expiryDate: expireDate.getTime(),
        });
        let refreshToken = yield _object.save();
        return refreshToken;
    });
};
RefreshTokenSchema.methods.verifyExpiration = (tokenData) => {
    return tokenData.expiryDate.getTime() < new Date().getTime();
};
//& Model
const RefreshToken = (0, mongoose_1.model)('RefreshToken', RefreshTokenSchema);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refreshtoken.js.map