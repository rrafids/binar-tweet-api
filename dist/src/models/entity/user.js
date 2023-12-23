"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const objection_1 = require("objection");
const postgresql_1 = __importDefault(require("../../config/postgresql"));
class UserEntity extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
}
exports.UserEntity = UserEntity;
objection_1.Model.knex(postgresql_1.default);
