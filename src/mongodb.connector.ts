import "reflect-metadata";
import { Container } from "inversify";
import { MongoClient, Db, ClientSession } from "mongodb";
import { injectable, inject } from "inversify";
import { IOC_CONFIGURATION } from "./ioc.configuration";

export interface MongoDBConnector{
    connect() : Promise<void>;
    getDb() : Db;
    startSession() : ClientSession;
    disconnect() : Promise<void>;
}

@injectable()
export class MongoDBConnectorImpl implements MongoDBConnector{
    protected client! : MongoClient;
    private db! : Db;

    constructor(
        @inject(IOC_CONFIGURATION.MongoUri) private uri : string,
        @inject(IOC_CONFIGURATION.MongoDbName) private dbName : string
    )
    {
        this.client = new MongoClient(uri)
    }

    async connect() : Promise<void>{
        await this.client.connect()
        this.db = this.client.db(this.dbName);
    }

    getDb() : Db
    {
        if(!this.db)
        {
            throw new Error("Mongo not connected!")
        }

        return this.db
    }

    startSession(): ClientSession
    {
        return this.client.startSession();
    }

    async disconnect(): Promise<void>
    {
        await this.client.close();
    }
}