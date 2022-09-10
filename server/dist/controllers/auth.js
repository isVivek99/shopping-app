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
exports.refreshToken = exports.forgotPassword = exports.logInUser = exports.signupUser = void 0;
const helpers_1 = require("../helpers");
const auth_service_1 = __importDefault(require("../services/auth.service"));
//signup-user
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fName, lName } = req.body;
    console.log(req.body);
    const result = yield auth_service_1.default.signUp({
        email,
        password,
        fName,
        lName,
    });
    const response = new helpers_1.ResponseWrapper(res);
    return response.created(result);
});
exports.signupUser = signupUser;
//login-user
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield auth_service_1.default.login({ email, password });
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.logInUser = logInUser;
//forgot-password
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield auth_service_1.default.forgotPassword({ email });
    const response = new helpers_1.ResponseWrapper(res);
    return response.ok(result);
});
exports.forgotPassword = forgotPassword;
//refreshtoken
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    console.log(refreshToken);
    const result = yield auth_service_1.default.refreshToken({
        refreshToken,
    });
    const response = new helpers_1.ResponseWrapper(res);
    return response.unauthorized(result);
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.js.map