"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForgotPasswordUser = exports.validateLoginUser = exports.validateUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//& Schema
const userSchema = new mongoose_1.Schema({
    fName: { type: String, required: true, minlength: 3 },
    lName: { type: String, required: true, minlength: 3 },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25,
        match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true, minlength: 6 },
});
//& hashing
userSchema.methods.generateHash = function () {
    const salt = bcrypt_1.default.genSaltSync(8);
    return bcrypt_1.default.hashSync(this.password, salt);
};
userSchema.methods.validatePassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password); // req.body.password, hashed password
};
//& token
userSchema.methods.generateToken = function (time) {
    return jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET || '', { expiresIn: `${time}` });
};
userSchema.methods.generateLink = function () {
    const sign = jsonwebtoken_1.default.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET || '', { expiresIn: '900s' });
    return `http://localhost:3000/resetPassword/${this.email}/${sign}`;
};
//& Model
const User = (0, mongoose_1.model)('freshnessUsers', userSchema);
exports.User = User;
//& Validation
const validateUser = (user) => {
    const schema = joi_1.default.object({
        fName: joi_1.default.string().min(3).required(),
        lName: joi_1.default.string().min(3).required(),
        email: joi_1.default.string().email().min(3).max(25).required(),
        password: joi_1.default.string().min(3).max(25).required(),
    });
    return schema.validate(user);
};
exports.validateUser = validateUser;
const validateLoginUser = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().min(3).max(25).required(),
        password: joi_1.default.string().min(3).max(25).required(),
    });
    return schema.validate(user);
};
exports.validateLoginUser = validateLoginUser;
const validateForgotPasswordUser = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().min(3).max(25).required(),
    });
    return schema.validate(user);
};
exports.validateForgotPasswordUser = validateForgotPasswordUser;
//# sourceMappingURL=users.js.map