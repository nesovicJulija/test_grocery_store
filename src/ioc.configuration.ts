
export const IOC_CONFIGURATION = {
    MongoDBConnector : Symbol('MongoDBConnector'),
    UserRepository : Symbol('UserRepository'),
    NodeRepository : Symbol('NodeRepository'),
    MongoUri : Symbol('MongoUri'),
    MongoDbName : Symbol('MongoDbName'),
    collectionName : Symbol('collectionName'),
    UserService : Symbol('UserService'),
    UserController : Symbol('UserController'),
    InternalApiDispatcher : Symbol('InternalApiDispatcher'),
    NodeController : Symbol('NodeController'), 
    NodeService : Symbol('NodeService')
}