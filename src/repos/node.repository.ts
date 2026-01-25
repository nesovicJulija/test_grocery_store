import "reflect-metadata";
import { Container } from "inversify";
import { inject, injectable } from "inversify";
import type { Node } from "../models/node.model";
import { MongoDBRepositoryImpl } from "./mongodb.repository";
import type { MongoDBRepository } from "./mongodb.repository"
import type { MongoDBConnector } from "../mongodb.connector";
import { IOC_CONFIGURATION } from "../ioc.configuration";

export interface NodeRepository extends MongoDBRepository<Node>
{
    findByParent(parentNodeId : string) : Promise<Node[]>;
    findByDescendant(nodeId : string) : Promise<Node[]>;
    findById(id : string) : Promise<Node | null>;
}

@injectable()
export class NodeRepositoryImpl extends MongoDBRepositoryImpl<Node> implements NodeRepository{
    constructor(
        @inject(IOC_CONFIGURATION.MongoDBConnector) connector : MongoDBConnector
    )
    {
        super(connector, "nodes");
    }

    async findByParent(parentNodeId : string) : Promise<Node[]>
    {
        return this.find({parentNodeId : parentNodeId}).toArray()
    }

    async findByDescendant(nodeId : string) : Promise<Node[]>{
        return this.find({descendants: nodeId}).toArray()
    }

    findById(id: string): Promise<Node | null> {
        return this.collection.findOne({ _id : id });
    }

}