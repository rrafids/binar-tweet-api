"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const storage = multer.memoryStorage();
exports.default = multer({ storage });
