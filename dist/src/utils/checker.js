"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorType = void 0;
function isErrorType(object) {
    return 'httpCode' in object && 'message' in object;
}
exports.isErrorType = isErrorType;
