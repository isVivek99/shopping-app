"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newConfig = void 0;
const prod_1 = require("./prod");
const dev_1 = require("./dev");
let config;
if (process.env.NODE_ENV == 'production') {
    config = prod_1.prod.prodConfig;
}
else {
    config = dev_1.dev.devConfig;
}
exports.newConfig = config;
//# sourceMappingURL=keys.js.map