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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('GET /tweets', () => {
    let server;
    beforeEach(() => {
        server = app_1.default.listen(process.env.APP_PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
        });
    });
    afterEach((done) => {
        server.close(done);
    });
    it('should response with 200 as status code and return list of tweet', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .get('/api/tweets')
            .set('Content-type', 'application/json')
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            expect(res.statusCode).toBe(200);
            expect(res.body.data.tweets).toBeInstanceOf(Array);
        }));
    }));
});
