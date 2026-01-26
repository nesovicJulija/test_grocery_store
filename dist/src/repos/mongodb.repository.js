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
exports.MongoDBRepositoryImpl = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const ioc_configuration_1 = require("../ioc.configuration");
let MongoDBRepositoryImpl = class MongoDBRepositoryImpl {
    dbConnector;
    collectionName;
    collection;
    constructor(dbConnector, collectionName) {
        this.dbConnector = dbConnector;
        this.collectionName = collectionName;
        this.collection = this.dbConnector.getDb().collection(collectionName);
    }
    async findOne(query, options) {
        return this.collection.findOne(query, options);
    }
    find(query, options) {
        return this.collection.find(query, options);
        ;
    }
    async insert(object, opstions) {
        const result = await this.collection.insertOne(object, opstions);
        return {
            _id: result.insertedId,
            ...object
        };
    }
    async update(query, update, opstions) {
        return await this.collection.updateOne(query, update, opstions);
    }
    async deleteMany(query, options) {
        return this.collection.deleteMany(query, options);
    }
    async deleteOne(query, options) {
        return this.collection.deleteOne(query, options);
    }
};
exports.MongoDBRepositoryImpl = MongoDBRepositoryImpl;
exports.MongoDBRepositoryImpl = MongoDBRepositoryImpl = __decorate([
    (0, inversify_2.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.collectionName)),
    __metadata("design:paramtypes", [Object, String])
], MongoDBRepositoryImpl);
