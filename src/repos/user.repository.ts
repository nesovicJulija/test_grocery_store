import "reflect-metadata";
import { Container } from "inversify";

import { inject, injectable } from "inversify";
import type { User } from "../models/user.model";
import { MongoDBRepositoryImpl } from "./mongodb.repository";
import { MongoDBRepository } from "./mongodb.repository"
import  { MongoDBConnector } from "../mongodb.connector";
import { IOC_CONFIGURATION } from "../ioc.configuration";

export interface UserRepository extends MongoDBRepository<User>
{
    findByEmail(email : string) : Promise<User | null>;
    findByNode(nodeId : string) : Promise<User[]>
    findById(id : string)       : Promise<User | null>;
}

@injectable()
export class UserRepositoryImpl extends MongoDBRepositoryImpl<User> implements UserRepository{
    constructor(
        @inject(IOC_CONFIGURATION.MongoDBConnector) connector : MongoDBConnector
    )
    {
        super(connector, "user");
    }

    async findByEmail(email : string) : Promise<User | null>
    {
        return this.findOne({email});
    }

    async findByNode(nodeId: string): Promise<User[]> {
        return this.find({nodeId}).toArray()
    }

    async findById(id: string): Promise<User | null> {
        return await this.collection.findOne({_id : id});
    }

}