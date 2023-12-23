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
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const user_1 = require("../models/entity/user");
class UsersRepository {
    static getUsers(queryName) {
        return __awaiter(this, void 0, void 0, function* () {
            let listUser = [];
            if (queryName) {
                listUser = yield user_1.UserEntity.query().where((0, objection_1.raw)('lower("name")'), 'like', `%${queryName}%`);
            }
            else {
                listUser = yield user_1.UserEntity.query();
            }
            return listUser;
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield user_1.UserEntity.query().insert({
                email: user.email,
                name: user.name,
                profile_picture_url: user.profile_picture_url,
                password: user.password,
            });
            return createdUser;
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.UserEntity.query()
                .where((0, objection_1.raw)('lower("email")'), '=', email)
                .first();
            if (user === undefined) {
                return null;
            }
            return user;
        });
    }
    static deleteUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.UserEntity.query().deleteById(id);
        });
    }
}
exports.default = UsersRepository;
