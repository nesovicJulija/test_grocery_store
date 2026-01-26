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
exports.NodeServiceImpl = void 0;
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("../ioc.configuration");
let NodeServiceImpl = class NodeServiceImpl {
    dbConnector;
    nodeRepo;
    constructor(dbConnector, nodeRepo) {
        this.dbConnector = dbConnector;
        this.nodeRepo = nodeRepo;
    }
    async create(node) {
        return this.nodeRepo.insert(node);
    }
    async delete(id) {
        const nodeToDelete = await this.nodeRepo.deleteOne({ _id: id });
        return nodeToDelete.deletedCount === 1;
    }
    async update(id, node) {
        const res = await this.nodeRepo.update({ _id: id }, { $set: node });
        if (res.matchedCount === 0) {
            return null;
        }
        return this.getNodeById(id);
    }
    getAllNodes() {
        return this.nodeRepo.find({}).toArray();
    }
    getNodeById(id) {
        return this.nodeRepo.findById(id);
    }
    getNodeAndItsDescendants(nodeId) {
        return this.nodeRepo.findOne({ _id: nodeId })
            .then(node => {
            if (!node) {
                return [];
            }
            return [nodeId, ...node.descendants];
        });
    }
};
exports.NodeServiceImpl = NodeServiceImpl;
exports.NodeServiceImpl = NodeServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.NodeRepository)),
    __metadata("design:paramtypes", [Object, Object])
], NodeServiceImpl);
