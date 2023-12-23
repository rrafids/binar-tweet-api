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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../repositories/users"));
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Decode token & validate token
            // Get token from authorization header
            const authHeader = req.get('Authorization');
            let accessToken;
            if (authHeader && authHeader.startsWith('Bearer'))
                accessToken = authHeader.split(' ')[1];
            else
                return res.status(401).send({
                    status: 'UNATHORIZED',
                    message: 'You need to login to access this resource',
                    data: null,
                });
            // Validate jwt token
            try {
                const jwtSecret = 'SECRET';
                const payload = jsonwebtoken_1.default.verify(accessToken, jwtSecret);
                const user = yield users_1.default.getUserByEmail(payload.email);
                if (!user)
                    return res.status(401).send({
                        status: 'UNATHORIZED',
                        message: "User doesn't exist",
                        data: null,
                    });
                req.user = user;
                next();
            }
            catch (error) {
                return res.status(401).send({
                    status: 'UNAUTHORIZED',
                    message: 'Session expired, please login again',
                    data: null,
                });
            }
        });
    }
}
exports.default = AuthMiddleware;
