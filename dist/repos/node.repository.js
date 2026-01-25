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
exports.NodeRepositoryImpl = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const mongodb_repository_1 = require("./mongodb.repository");
const ioc_configuration_1 = require("../ioc.configuration");
let NodeRepositoryImpl = class NodeRepositoryImpl extends mongodb_repository_1.MongoDBRepositoryImpl {
    constructor(connector) {
        super(connector, "nodes");
    }
    async findByParent(parentNodeId) {
        return this.find({ parentNodeId: parentNodeId }).toArray();
    }
    async findByDescendant(nodeId) {
        return this.find({ descendants: nodeId }).toArray();
    }
    findById(id) {
        return this.collection.findOne({ _id: id });
    }
};
exports.NodeRepositoryImpl = NodeRepositoryImpl;
exports.NodeRepositoryImpl = NodeRepositoryImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector)),
    __metadata("design:paramtypes", [Object])
], NodeRepositoryImpl);
