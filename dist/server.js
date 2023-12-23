"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
app_1.default.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});