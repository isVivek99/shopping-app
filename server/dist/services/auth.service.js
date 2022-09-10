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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const signUp = ({ fName, lName, email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateUser)({
            email: email,
            password: password,
            fName: fName,
            lName: lName,
        });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ Check if user already exists
        const user = yield models_1.User.findOne({ email: email });
        if (user)
            throw { status: 400, message: 'User already exists.' };
        //~ Create a new user
        const newUser = new models_1.User({
            email: email,
            password: password,
            fName: fName,
            lName: lName,
        });
        newUser.password = newUser.generateHash();
        //~ Save the new user
        yield newUser.save();
        //~ create tokens
        const idToken = newUser.generateToken('900s');
        //~ create a new refresh token
        let refreshToken = yield models_1.RefreshToken.createToken(newUser);
        refreshToken = refreshToken.token;
        //~ send response
        const data = {
            user: lodash_1.default.pick(newUser, ['_id', 'email', 'fName']),
            idToken,
            refreshToken,
        };
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateLoginUser)({ email: email, password: password });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ Check if user exists
        const user = yield models_1.User.findOne({ email: email });
        if (!user)
            throw { status: 400, message: 'Invalid email or password.' };
        //~ Check if password is correct
        const validPassword = user.validatePassword(password);
        if (!validPassword)
            throw { status: 400, message: 'Invalid email or password.' };
        //~ Send response
        const idToken = user.generateToken('900s');
        //~ create a new refresh token
        let refreshToken = yield models_1.RefreshToken.createToken(user);
        refreshToken = refreshToken.token;
        const data = {
            user: lodash_1.default.pick(user, ['_id', 'email', 'fName']),
            idToken,
            refreshToken,
        };
        return {
            success: true,
            data,
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const forgotPassword = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Validate the request body
        const { error } = (0, models_1.validateForgotPasswordUser)({ email: email });
        if (error)
            throw { status: 400, message: error.details[0].message };
        //~ Check if user exists
        const user = yield models_1.User.findOne({ email: email });
        if (!user)
            throw { status: 400, message: 'Cannot find user.' };
        //user exist, create a one time link for 15 mins
        (0, helpers_1.sendForgotPasswordEmail)(email, user.generateLink());
        return {
            success: true,
            data: { message: 'reset password link is sent to your email.' },
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
const refreshToken = ({ refreshToken }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //~ Check if token exists
        const userRefreshToken = yield models_1.RefreshToken.findOne({
            token: refreshToken,
        });
        if (!userRefreshToken)
            throw { status: 401, message: 'Invalid token.' };
        if (userRefreshToken.verifyExpiration(userRefreshToken)) {
            models_1.RefreshToken.findByIdAndRemove(userRefreshToken._id, {
                useFindAndModify: false,
            });
            throw { status: 401, message: 'Invalid token.' };
        }
        const user = yield models_1.User.findOne({ user: userRefreshToken.user });
        // console.log( user, userRefreshToken);
        let idToken = user === null || user === void 0 ? void 0 : user.generateToken('900s');
        return {
            success: true,
            data: {
                refreshToken,
                idToken,
            },
        };
    }
    catch (err) {
        return {
            success: false,
            data: { message: err.message },
            status: err.status,
        };
    }
});
exports.default = {
    signUp,
    login,
    forgotPassword,
    refreshToken,
};
//# sourceMappingURL=auth.service.js.map