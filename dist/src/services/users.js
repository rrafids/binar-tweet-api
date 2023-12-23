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
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const users_1 = __importDefault(require("../repositories/users"));
class UsersService {
    static getUsers(queryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUser = yield users_1.default.getUsers(queryName);
            return listUser;
        });
    }
    static createUser(user) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileBase64 = (_a = user.profile_picture_file) === null || _a === void 0 ? void 0 : _a.buffer.toString('base64');
                const file = `data:${(_b = user.profile_picture_file) === null || _b === void 0 ? void 0 : _b.mimetype};base64,${fileBase64}`;
                // Async await
                const uploadedFile = yield cloudinary_1.default.uploader.upload(file); // async
                const userToCreate = {
                    email: user.email,
                    name: user.name,
                    profile_picture_url: uploadedFile.url,
                };
                const createdUser = yield users_1.default.createUser(userToCreate);
                return createdUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UsersService;
