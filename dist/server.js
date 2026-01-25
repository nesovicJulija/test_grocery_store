"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const ioc_container_1 = require("./ioc.container");
const ioc_configuration_1 = require("./ioc.configuration");
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./auth/routes"));
const passport_2 = require("./auth/passport");
dotenv_1.default.config();
async function start() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    const container = (0, ioc_container_1.buildContainer)();
    const dbConnector = container.get(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector);
    await dbConnector.connect();
    const userRepo = container.get(ioc_configuration_1.IOC_CONFIGURATION.UserRepository);
    (0, passport_2.configurePassport)(userRepo);
    const apiDispatcher = container.get(ioc_configuration_1.IOC_CONFIGURATION.InternalApiDispatcher);
    apiDispatcher.init(app);
    app.use("/auth", routes_1.default);
    const port = process.env.PORT || 7002;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
start().catch(err => {
    console.error("Server failed to start : ", err);
    process.exit(1);
});
