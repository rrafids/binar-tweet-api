"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetEntity = void 0;
const objection_1 = require("objection");
const postgresql_1 = __importDefault(require("../../config/postgresql"));
const user_1 = require("./user");
class TweetEntity extends objection_1.Model {
    static get tableName() {
        return 'tweets';
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: user_1.UserEntity,
                join: {
                    from: 'tweets.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}
exports.TweetEntity = TweetEntity;
objection_1.Model.knex(postgresql_1.default);
