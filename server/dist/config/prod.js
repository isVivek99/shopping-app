"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prod = void 0;
var prod;
(function (prod) {
    prod.prodConfig = {
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI,
    };
})(prod = exports.prod || (exports.prod = {}));
//# sourceMappingURL=prod.js.map