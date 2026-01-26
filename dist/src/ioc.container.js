"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContainer = buildContainer;
require("reflect-metadata");
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("./ioc.configuration");
const user_repository_1 = require("./repos/user.repository");
const node_repository_1 = require("./repos/node.repository");
const mongodb_connector_1 = require("./mongodb.connector");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controller/user.controller");
const internal_dispatcher_1 = require("./api/internal.dispatcher");
const node_service_1 = require("./services/node.service");
const node_controller_1 = require("./controller/node.controller");
// import { UserRepositoryImpl } from "./repos/user.repository.js";
let container;
function buildContainer() {
    if (!container) {
        container = new inversify_1.Container();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.collectionName).toConstantValue("user");
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.MongoUri).toConstantValue(process.env.MONGO_URI);
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.MongoDbName).toConstantValue(process.env.MONGO_DB_NAME);
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector).to(mongodb_connector_1.MongoDBConnectorImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.UserRepository).to(user_repository_1.UserRepositoryImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.NodeRepository).to(node_repository_1.NodeRepositoryImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.UserService).to(user_service_1.UserServiceImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.UserController).to(user_controller_1.UserControllerImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.InternalApiDispatcher).to(internal_dispatcher_1.InternalApiDispatcher).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.NodeService).to(node_service_1.NodeServiceImpl).inSingletonScope();
        container.bind(ioc_configuration_1.IOC_CONFIGURATION.NodeController).to(node_controller_1.NodeControllerImpl).inSingletonScope();
    }
    return container;
}
