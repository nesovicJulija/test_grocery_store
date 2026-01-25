"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOC_CONFIGURATION = void 0;
exports.IOC_CONFIGURATION = {
    MongoDBConnector: Symbol('MongoDBConnector'),
    UserRepository: Symbol('UserRepository'),
    NodeRepository: Symbol('NodeRepository'),
    MongoUri: Symbol('MongoUri'),
    MongoDbName: Symbol('MongoDbName'),
    collectionName: Symbol('collectionName'),
    UserService: Symbol('UserService'),
    UserController: Symbol('UserController'),
    InternalApiDispatcher: Symbol('InternalApiDispatcher'),
    NodeController: Symbol('NodeController'),
    NodeService: Symbol('NodeService')
};
