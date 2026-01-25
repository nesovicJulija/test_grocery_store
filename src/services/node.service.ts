import { inject, injectable } from "inversify";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { MongoDBConnector } from "../mongodb.connector";
import { NodeRepository } from "../repos/node.repository";
import { Node } from "../models/node.model";
import { UpdateResult } from "mongoose";

export interface NodeService{
        getAllNodes() : Promise<Node[]>;
        getNodeById(id : string) : Promise<Node | null>;
        create(node : Node) : Promise<Node>;
        update(id : string, node : Partial<Node>) : Promise<Node | null>;
        delete(id : string) : Promise<boolean>;       

        getNodeAndItsDescendants(nodeId : string) : Promise<string[]>;
}

@injectable()
export class NodeServiceImpl implements NodeService{
    constructor(
        @inject(IOC_CONFIGURATION.MongoDBConnector) private dbConnector : MongoDBConnector,
        @inject(IOC_CONFIGURATION.NodeRepository) private nodeRepo : NodeRepository
    )
    {

    }
    
    async create(node: Node): Promise<Node> {
        return this.nodeRepo.insert(node);
    }

    async delete(id: string): Promise<boolean> {
        const nodeToDelete = await this.nodeRepo.deleteOne({ _id : id });
        return nodeToDelete.deletedCount === 1;
    }

    async update(id: string, node: Partial<Node>): Promise<Node | null> {
        const res = await this.nodeRepo.update(
            { _id : id },
            { $set : node }
        )

        if(res.matchedCount === 0)
        {
            return null
        }

        return this.getNodeById(id);
    }

    getAllNodes(): Promise<Node[]> {
        return this.nodeRepo.find({}).toArray();
    }

    getNodeById(id: string): Promise<Node | null> {
        return this.nodeRepo.findById(id);
    }

    getNodeAndItsDescendants(nodeId: string): Promise<string[]> {
        return this.nodeRepo.findOne({ _id : nodeId })
                   .then(node => {
                        if(!node){
                            return []
                        }

                        return [nodeId, ...node.descendants]
                   })
    }
}