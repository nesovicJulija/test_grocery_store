import "reflect-metadata";
import { buildContainer } from "./ioc.container.js";
import { IOC_CONFIGURATION } from "./ioc.configuration.js";
import { UserType } from "./models/user.model.js";
import { NodeType } from "./models/node.model.js";
async function insertIntoDB() {
    const container = buildContainer();
    const dBConnector = container.get(IOC_CONFIGURATION.MongoDBConnector);
    await dBConnector.connect();
    const userRepo = container.get(IOC_CONFIGURATION.UserRepository);
    const nodeRepo = container.get(IOC_CONFIGURATION.NodeRepository);
    try {
        const rootNode = await nodeRepo.insert({
            _id: "1",
            nodeName: "Srbija",
            type: NodeType.OFFICE,
            parentNodeId: null,
            descendants: ["2", "3"]
        });
        await nodeRepo.insert({
            _id: "2",
            nodeName: "Vojvodina",
            type: NodeType.OFFICE,
            parentNodeId: rootNode._id,
            descendants: []
        });
        await nodeRepo.insert({
            _id: "3",
            nodeName: "Grad Beograd",
            type: NodeType.OFFICE,
            parentNodeId: rootNode._id,
            descendants: []
        });
        await userRepo.insert({
            _id: "1",
            name: "Ana",
            email: "anatest@gmail.com",
            type: UserType.MANAGER,
            nodeId: rootNode._id
        });
        console.log("Insert completed!");
    }
    catch (err) {
        console.error("Insert failed : ", err);
    }
    finally {
        await dBConnector.getDb();
        await dBConnector.disconnect();
    }
}
insertIntoDB();
