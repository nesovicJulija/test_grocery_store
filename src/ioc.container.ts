import "reflect-metadata";
import { Container } from "inversify";
import { IOC_CONFIGURATION } from "./ioc.configuration";
import { UserRepositoryImpl, type UserRepository } from "./repos/user.repository";
import { NodeRepositoryImpl, type NodeRepository } from "./repos/node.repository";
import { MongoDBConnector, MongoDBConnectorImpl } from "./mongodb.connector";
import { MongoDBRepositoryImpl } from "./repos/mongodb.repository";
import { UserService, UserServiceImpl } from "./services/user.service";
import { UserControllerImpl } from "./controller/user.controller";
import { InternalApiDispatcher } from "./api/internal.dispatcher";
import { NodeService, NodeServiceImpl } from "./services/node.service";
import { NodeControllerImpl } from "./controller/node.controller";
// import { UserRepositoryImpl } from "./repos/user.repository.js";

let container : Container;

export function buildContainer() : Container{
    if(!container)
    {

        container = new Container()

        container.bind<string>(IOC_CONFIGURATION.collectionName).toConstantValue("user");
        container.bind<string>(IOC_CONFIGURATION.MongoUri).toConstantValue(process.env.MONGO_URI!);
        container.bind<string>(IOC_CONFIGURATION.MongoDbName).toConstantValue(process.env.MONGO_DB_NAME!);
        container.bind<MongoDBConnector>(IOC_CONFIGURATION.MongoDBConnector).to(MongoDBConnectorImpl).inSingletonScope();
        container.bind<UserRepository>(IOC_CONFIGURATION.UserRepository).to(UserRepositoryImpl).inSingletonScope();
        container.bind<NodeRepository>(IOC_CONFIGURATION.NodeRepository).to(NodeRepositoryImpl).inSingletonScope();
        container.bind<UserService>(IOC_CONFIGURATION.UserService).to(UserServiceImpl).inSingletonScope();
        container.bind<UserControllerImpl>(IOC_CONFIGURATION.UserController).to(UserControllerImpl).inSingletonScope();
        container.bind<InternalApiDispatcher>(IOC_CONFIGURATION.InternalApiDispatcher).to(InternalApiDispatcher).inSingletonScope();
        container.bind<NodeService>(IOC_CONFIGURATION.NodeService).to(NodeServiceImpl).inSingletonScope();
        container.bind<NodeControllerImpl>(IOC_CONFIGURATION.NodeController).to(NodeControllerImpl).inSingletonScope();
    }

    return container
}