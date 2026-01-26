"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnectorImpl = void 0;
require("reflect-metadata");
const mongodb_1 = require("mongodb");
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("./ioc.configuration");
let MongoDBConnectorImpl = class MongoDBConnectorImpl {
    uri;
    dbName;
    client;
    db;
    constructor(uri, dbName) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = new mongodb_1.MongoClient(uri);
    }
    async connect() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
    }
    getDb() {
        if (!this.db) {
            throw new Error("Mongo not connected!");
        }
        return this.db;
    }
    startSession() {
        return this.client.startSession();
    }
    async disconnect() {
        await this.client.close();
    }
};
exports.MongoDBConnectorImpl = MongoDBConnectorImpl;
exports.MongoDBConnectorImpl = MongoDBConnectorImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoUri)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoDbName)),
    __metadata("design:paramtypes", [String, String])
], MongoDBConnectorImpl);
