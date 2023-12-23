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
const tweets_1 = __importDefault(require("../../repositories/tweets"));
const tweets_2 = __importDefault(require("../tweets"));
describe('getTweetByID', () => {
    it('should return correct tweet data', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedTweetResponse = {
            id: 1,
            content: 'tweet content',
            user: {
                email: 'test@email.com',
                id: 1,
                name: 'test name',
                profile_picture_url: 'test_image.png',
            },
        };
        /** creating dependency of use case */
        const mockTweetsRepository = new tweets_1.default();
        /** mocking needed function */
        mockTweetsRepository.getTweetByID = jest
            .fn()
            .mockImplementation(() => Promise.resolve(expectedTweetResponse));
        const tweetsService = new tweets_2.default(mockTweetsRepository);
        const tweet = yield tweetsService.getTweetByID(1);
        expect(tweet).toEqual(expectedTweetResponse);
    }));
});
// TODO: Create unit test for createTweet usecase
