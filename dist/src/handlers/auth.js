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
const auth_1 = __importDefault(require("../services/auth"));
const checker_1 = require("../utils/checker");
class AuthHandler {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const loginResponse = yield auth_1.default.login(payload);
            if ((0, checker_1.isErrorType)(loginResponse)) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: loginResponse.message,
                    data: null,
                };
                res.status(loginResponse.httpCode).send(response);
            }
            else {
                const response = {
                    status: 'OK',
                    message: 'User logged in succesfully',
                    data: loginResponse,
                };
                res.status(200).send(response);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            // Payload validation
            if (!payload.email) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: 'Email cannot be empty',
                    data: {
                        registered_user: null,
                    },
                };
                res.status(400).send(response);
            }
            if (!payload.name) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: 'Name cannot be empty',
                    data: {
                        registered_user: null,
                    },
                };
                res.status(400).send(response);
            }
            if (!payload.password) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: 'Password cannot be empty',
                    data: {
                        created_user: null,
                    },
                };
                res.status(400).send(response);
            }
            const registeredUser = yield auth_1.default.register(payload);
            if ((0, checker_1.isErrorType)(registeredUser)) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: registeredUser.message,
                    data: null,
                };
                res.status(registeredUser.httpCode).send(response);
            }
            else {
                const response = {
                    status: 'CREATED',
                    message: 'User registered succesfully',
                    data: {
                        registered_user: registeredUser,
                    },
                };
                res.status(201).send(response);
            }
        });
    }
    getLoggedInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                status: 'OK',
                message: 'User logged in succesfully',
                data: {
                    user: req.user,
                },
            };
            res.status(200).send(response);
        });
    }
    loginGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const googleAccessToken = req.query.access_token;
            const loginGoogleResponse = yield auth_1.default.loginGoogle(googleAccessToken);
            if ((0, checker_1.isErrorType)(loginGoogleResponse)) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: loginGoogleResponse.message,
                    data: null,
                };
                res.status(loginGoogleResponse.httpCode).send(response);
            }
            else {
                const response = {
                    status: 'OK',
                    message: 'User logged in succesfully',
                    data: loginGoogleResponse,
                };
                res.status(200).send(response);
            }
        });
    }
}
exports.default = AuthHandler;
