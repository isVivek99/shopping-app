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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const keys_1 = require("./config/keys");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(keys_1.newConfig.MONGODB_URI || 'mongodb://localhost:27017/freshness', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to database');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
connectDatabase();
app.use('/api/auth', routes_1.auth);
app.use('/api/categorySubTopicList', routes_1.categorySubTopicList);
if (process.env.NODE_ENV == 'production') {
    app.get('/', (req, res) => {
        app.use(express_1.default.static(path_1.default.resolve(__dirname, 'client', 'build')));
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(keys_1.newConfig.PORT || 4011, () => {
    console.log(`app listening at http://localhost:${keys_1.newConfig.PORT || 4011}`);
});
//# sourceMappingURL=index.js.map