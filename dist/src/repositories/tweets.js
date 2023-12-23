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
const tweet_1 = require("../models/entity/tweet");
class TweetsRepository {
    constructor() { }
    getTweets() {
        return __awaiter(this, void 0, void 0, function* () {
            const listTweet = yield tweet_1.TweetEntity.query().withGraphFetched('user');
            return listTweet;
        });
    }
    createTweet(tweet) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTweet = yield tweet_1.TweetEntity.query().insert({
                content: tweet.content,
                user_id: tweet.user_id,
            });
            return createdTweet;
        });
    }
    getTweetByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweet = yield tweet_1.TweetEntity.query()
                .findById(id)
                .withGraphFetched('user');
            return tweet || null;
        });
    }
    deleteTweetByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tweet_1.TweetEntity.query().deleteById(id).withGraphFetched('user');
        });
    }
}
exports.default = TweetsRepository;
