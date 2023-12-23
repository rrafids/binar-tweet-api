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
const tweets_1 = __importDefault(require("../tweets"));
describe('getTweetByID', () => {
    it('should return a tweet data', () => __awaiter(void 0, void 0, void 0, function* () {
        const tweetsRepository = new tweets_1.default();
        const tweetToCreate = {
            content: 'test tweet',
            user_id: 1,
        };
        const createdTweet = yield tweetsRepository.createTweet(tweetToCreate);
        const getTweet = yield tweetsRepository.getTweetByID(createdTweet.id);
        yield tweetsRepository.deleteTweetByID(createdTweet.id);
        // Assertion
        expect(getTweet === null || getTweet === void 0 ? void 0 : getTweet.id).toEqual(createdTweet.id);
        expect(getTweet === null || getTweet === void 0 ? void 0 : getTweet.content).toEqual(tweetToCreate.content);
    }));
});
// TODO: Create unit test for createTweet repository
