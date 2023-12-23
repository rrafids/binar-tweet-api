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
class TweetsHandler {
    constructor(tweetsService) {
        this._tweetsService = tweetsService;
        // Bind methods, so they can access the properties
        this.getTweets = this.getTweets.bind(this);
        this.createTweet = this.createTweet.bind(this);
    }
    getTweets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tweetList = yield this._tweetsService.getTweets();
            const response = {
                status: 'OK',
                message: 'Success retrieving data',
                data: {
                    tweets: tweetList,
                },
            };
            res.status(200).send(response);
        });
    }
    createTweet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            // Payload validation
            if (!payload.content) {
                const response = {
                    status: 'BAD_REQUEST',
                    message: 'Content cannot be empty',
                    data: {
                        created_tweet: null,
                    },
                };
                res.status(400).send(response);
            }
            payload.user_id = req.user.id;
            const createdTweet = yield this._tweetsService.createTweet(payload);
            const response = {
                status: 'CREATED',
                message: 'Tweet succesfully created',
                data: {
                    created_tweet: createdTweet,
                },
            };
            res.status(201).send(response);
        });
    }
}
exports.default = TweetsHandler;
