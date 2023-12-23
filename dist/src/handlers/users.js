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
const users_1 = __importDefault(require("../services/users"));
class UsersHandler {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryName = req.query.name;
            const userList = yield users_1.default.getUsers(queryName);
            const response = {
                status: 'OK',
                message: 'Success retrieving data',
                data: {
                    users: userList,
                },
            };
            res.status(200).send(response);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            // Multiple files
            // (req.files as Express.Multer.File[]).map((file) => {
            //   payload.profile_picture_file = file;
            // });
            // Single file
            payload.profile_picture_file = req.file;
            // Payload validation
            if (!payload.name) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: 'Name cannot be empty',
                    data: {
                        created_user: null,
                    },
                };
                res.status(400).send(response);
            }
            const createdUser = yield users_1.default.createUser(payload);
            const response = {
                status: 'CREATED',
                message: 'User succesfully created',
                data: {
                    created_user: createdUser,
                },
            };
            res.status(201).send(response);
        });
    }
}
exports.default = UsersHandler;
