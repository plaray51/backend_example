"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const envPath = path_1.default.resolve(__dirname, '.env');
dotenv_1.default.config({ path: envPath });
const port = 3000;
app_1.default.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
