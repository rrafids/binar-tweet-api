"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Upload local
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storages'); // Set the destination path for file uploads
    },
    filename: (req, file, cb) => {
        const [prefix] = file.mimetype.split('/');
        const filename = file.originalname.split('.');
        const extension = filename.pop();
        const fileName = `${prefix}-${Date.now()}.${extension}`;
        // Do not call cb() before the logic for setting properties in the request object
        req[`uploaded_${file.fieldname}`] = fileName;
        console.log(req[`uploaded_${file.fieldname}`]);
        cb(null, fileName); // Call cb() after your logic
    },
});
exports.default = (0, multer_1.default)({ storage });
