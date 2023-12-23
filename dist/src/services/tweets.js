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
class TweetsService {
    constructor(tweetsRepository) {
        this._tweetsRepository = tweetsRepository;
    }
    getTweets() {
        return __awaiter(this, void 0, void 0, function* () {
            const listTweet = yield this._tweetsRepository.getTweets();
            const listTweetResponse = listTweet.map((tweet) => {
                var _a, _b, _c, _d;
                const tweetResponse = {
                    id: tweet.id,
                    content: tweet.content,
                    user: {
                        id: (_a = tweet.user) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = tweet.user) === null || _b === void 0 ? void 0 : _b.name,
                        email: (_c = tweet.user) === null || _c === void 0 ? void 0 : _c.email,
                        profile_picture_url: (_d = tweet.user) === null || _d === void 0 ? void 0 : _d.profile_picture_url,
                    },
                };
                return tweetResponse;
            });
            return listTweetResponse;
        });
    }
    getTweetByID(id) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const tweet = yield this._tweetsRepository.getTweetByID(id);
            let tweetResponse = {
                id: 0,
                content: '',
                user: {
                    id: 0,
                    name: '',
                    email: '',
                    profile_picture_url: '',
                },
            };
            if (tweet !== null) {
                tweetResponse = {
                    id: tweet.id,
                    content: tweet.content,
                    user: {
                        id: (_a = tweet.user) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = tweet.user) === null || _b === void 0 ? void 0 : _b.name,
                        email: (_c = tweet.user) === null || _c === void 0 ? void 0 : _c.email,
                        profile_picture_url: (_d = tweet.user) === null || _d === void 0 ? void 0 : _d.profile_picture_url,
                    },
                };
            }
            return tweetResponse;
        });
    }
    createTweet(tweet) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweetToCreate = {
                content: tweet.content,
                user_id: tweet.user_id,
            };
            const createdTweet = yield this._tweetsRepository.createTweet(tweetToCreate);
            return createdTweet;
        });
    }
}
exports.default = TweetsService;
