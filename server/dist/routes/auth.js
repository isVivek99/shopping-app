"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post('/signup', controllers_1.signupUser);
router.post('/login', controllers_1.logInUser);
router.post('/forgotpassword', controllers_1.forgotPassword);
router.post('/refreshtoken', controllers_1.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.js.map