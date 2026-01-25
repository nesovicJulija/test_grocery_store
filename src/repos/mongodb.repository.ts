import "reflect-metadata";
import { Container, inject } from "inversify";
import { injectable, unmanaged } from "inversify";
import { MongoDBConnector } from "../mongodb.connector"
import { Collection, FindCursor, type DeleteOptions, type DeleteResult, type Filter, type FindOptions, type InsertOneOptions, type OptionalId, type OptionalUnlessRequiredId, type UpdateDescription, type UpdateFilter, type UpdateOptions, type WithId } from "mongodb";
import type { Document } from "mongodb";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { UpdateResult } from "mongoose";

export interface MongoDBRepository<T>{
    findOne(query : Filter<T>, options?: FindOptions) : Promise<T | null>
    find(query : Filter<T>, options?: FindOptions) : FindCursor<T>;
    insert(object : OptionalUnlessRequiredId<T>, options? : InsertOneOptions) : Promise<T>
    update(query: Filter<T>, update: UpdateFilter<T>, options? : UpdateOptions) : Promise<UpdateResult>;
    deleteMany(query : Filter<T>, options?: DeleteOptions) : Promise<DeleteResult>;
    deleteOne(query : Filter<T>, options?: DeleteOptions) : Promise<DeleteResult>;
}

@injectable()
export abstract class MongoDBRepositoryImpl<T extends Document> implements MongoDBRepository<T>
{
    protected collection: Collection<T>

    constructor(
        @inject(IOC_CONFIGURATION.MongoDBConnector) private dbConnector : MongoDBConnector,
        @inject(IOC_CONFIGURATION.collectionName) private collectionName : string
    )
    {
        this.collection = this.dbConnector.getDb().collection<T>(collectionName)
    }

    async findOne(query: Filter<T>, options?: FindOptions): Promise<T | null> {
        return this.collection.findOne<T>(query, options);
    }

    find(query : Filter<T>, options?: FindOptions) : FindCursor<T>
    {
        return this.collection.find(query, options) as FindCursor<T>;;
    }

    async insert(object: OptionalUnlessRequiredId<T>, opstions?: InsertOneOptions) : Promise<T>
    {
        const result = await this.collection.insertOne(object, opstions);

        return {
            _id : result.insertedId,
            ...(object as T)
        } as T
    }

    async update(query : Filter<T>, update : UpdateFilter<T>, opstions? : UpdateOptions) : Promise<UpdateResult>
    {
        return await this.collection.updateOne(query, update, opstions)
    }

    async deleteMany(query: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
        return this.collection.deleteMany(query, options);
    }

    async deleteOne(query: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
        return this.collection.deleteOne(query, options);
    }

}