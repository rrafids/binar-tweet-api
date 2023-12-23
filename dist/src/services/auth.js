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
const users_1 = __importDefault(require("../repositories/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const SALT_ROUND = 10;
class AuthService {
    static login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate fields existence
                if (!req.email)
                    throw new Error('email cannot be empty');
                if (!req.password)
                    throw new Error('password cannot be empty');
                if (req.password.length < 8)
                    throw new Error('password length should be more than 8');
                // Check if email is exist
                const user = yield users_1.default.getUserByEmail(req.email);
                if (!user) {
                    throw new Error("user doesn't exist");
                }
                console.log('payloadddd', req.password);
                console.log('payloadddd', user.password);
                // Check if password is correct
                const isPasswordCorrect = bcrypt_1.default.compareSync(req.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error('wrong password');
                }
                // Generate token JWT
                const jwtSecret = 'SECRET';
                const jwtExpireTime = '24h';
                const accessToken = jsonwebtoken_1.default.sign({
                    email: user.email,
                }, jwtSecret, {
                    expiresIn: jwtExpireTime,
                });
                const token = {
                    access_token: accessToken,
                };
                return token;
            }
            catch (error) {
                // If something is wrong, return the error
                const errorResponse = {
                    httpCode: 400,
                    message: error.message,
                };
                return errorResponse;
            }
        });
    }
    static register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if email is exist
                const user = yield users_1.default.getUserByEmail(req.email);
                if (user) {
                    throw new Error('user with the same email already exist');
                }
                // Encrypt password
                const encryptedPassword = bcrypt_1.default.hashSync(req.password, SALT_ROUND);
                // Store / create user to database
                const userToCreate = {
                    email: req.email,
                    name: req.name,
                    password: encryptedPassword,
                    profile_picture_url: req.profile_picture_url,
                };
                const createdUser = yield users_1.default.createUser(userToCreate);
                return createdUser;
            }
            catch (error) {
                // If something is wrong, return the error
                const errorResponse = {
                    httpCode: 400,
                    message: error.message,
                };
                return errorResponse;
            }
        });
    }
    static loginGoogle(googleAccessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get google user credential
                const client = new google_auth_library_1.OAuth2Client('52535015285-0i182g0q4ccnv9q3i4dgnh7hiah779u3.apps.googleusercontent.com');
                const userInfo = yield client.verifyIdToken({
                    idToken: googleAccessToken,
                    audience: '52535015285-0i182g0q4ccnv9q3i4dgnh7hiah779u3.apps.googleusercontent.com',
                });
                // contains: email, name, picture
                const { email } = userInfo.payload;
                // Check if email is exist
                const user = yield users_1.default.getUserByEmail(email);
                if (!user) {
                    // TODO: Create new user based on google login response
                    throw new Error("temporary error: user doesn't exist");
                }
                // Generate token JWT
                const jwtSecret = 'SECRET';
                const jwtExpireTime = '24h';
                const accessToken = jsonwebtoken_1.default.sign({
                    email: user.email,
                }, jwtSecret, {
                    expiresIn: jwtExpireTime,
                });
                const token = {
                    access_token: accessToken,
                };
                return token;
            }
            catch (error) {
                // If something is wrong, return the error
                const errorResponse = {
                    httpCode: 400,
                    message: error.message,
                };
                return errorResponse;
            }
        });
    }
}
exports.default = AuthService;
