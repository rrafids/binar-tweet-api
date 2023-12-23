"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./handlers/users"));
const uploadFileMemory_1 = __importDefault(require("./utils/uploadFileMemory"));
const auth_1 = __importDefault(require("./handlers/auth"));
const auth_2 = __importDefault(require("./middlewares/auth"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOption_1 = require("./utils/swaggerOption");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const tweets_1 = __importDefault(require("./handlers/tweets"));
const tweets_2 = __importDefault(require("./repositories/tweets"));
const tweets_3 = __importDefault(require("./services/tweets"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Init repo
const tweetsRepository = new tweets_2.default();
// Init services
const tweetsService = new tweets_3.default(tweetsRepository);
// Init handlers
const usersHandler = new users_1.default();
const authHandler = new auth_1.default();
const tweetsHandler = new tweets_1.default(tweetsService);
// Swagger
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOption_1.swaggerConfig);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/health', (req, res) => {
    res.send('server healthy');
});
// Define routes
// Users
app.get('/api/users', auth_2.default.authenticate, 
// TODO: add role checking middleware
usersHandler.getUsers);
app.post('/api/users', uploadFileMemory_1.default.single('profile_picture'), // single file
// uploadFileUtil.array('profile_pictures'), // multiple files
usersHandler.createUser);
// Auth
app.post('/api/auth/register', authHandler.register);
app.post('/api/auth/login', authHandler.login);
app.get('/api/auth/me', auth_2.default.authenticate, authHandler.getLoggedInUser);
// Google Auth
app.get('/api/auth/login/google', authHandler.loginGoogle);
// Tweets
app.get('/api/tweets', tweetsHandler.getTweets);
app.post('/api/tweets', auth_2.default.authenticate, tweetsHandler.createTweet);
// TODO:
// -- Users
// 1. Delete user by id endpoint
// 2. Get user by id endpoint
// -- Categories
// 1. Create category
// 2. Get all categories
// -- Tweets
// 1. Create tweet
//  -> Create tweet_categories
// 2. Get all tweets
//  -> response // opsional
// {
//   "id",
//   "content",
//   "user"
//    ->
//    {
//       "id",
//       "name"
//    }
//   "categories" -> ['category_name']
// }
// TODO: 17 November 2023
// 1. Create swagger docs for api get list users & create user
// 2. Please add 'role' field for each registration
// User data:
// id, role ('admin' | 'user'), name, email, password, profile_picture_url
// 3. Please add middleware for endpoint get list user for checking user role (please makesure he is an 'admin')
exports.default = app;
