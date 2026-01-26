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
exports.UserServiceImpl = void 0;
const inversify_1 = require("inversify");
const user_model_1 = require("../models/user.model");
const ioc_configuration_1 = require("../ioc.configuration");
let UserServiceImpl = class UserServiceImpl {
    dbConnector;
    userRepo;
    nodeService;
    constructor(dbConnector, userRepo, nodeService) {
        this.dbConnector = dbConnector;
        this.userRepo = userRepo;
        this.nodeService = nodeService;
    }
    async create(user) {
        const newUser = await this.userRepo.insert(user);
        return newUser;
    }
    async update(id, user) {
        const res = await this.userRepo.update({ _id: id }, { $set: user });
        if (res.matchedCount === 0) {
            return null;
        }
        return this.getUserById(id);
    }
    async delete(id) {
        const user = await this.userRepo.deleteOne({ _id: id });
        return user.deletedCount === 1;
    }
    getUserById(id) {
        return this.userRepo.findOne({ _id: id });
    }
    getAllUsers() {
        return this.userRepo.find({}).toArray();
    }
    getAllEmployeesForNode(nodeId) {
        return this.userRepo.find({
            nodeId,
            type: user_model_1.UserType.EMPLOYEE
        }).toArray();
    }
    getAllManagersForNode(nodeId) {
        return this.userRepo.find({
            nodeId,
            type: user_model_1.UserType.MANAGER
        }).toArray();
    }
    async getAllEmployeesAndDescendants(nodeId) {
        const nodeIds = await this.nodeService.getNodeAndItsDescendants(nodeId);
        const employees = nodeIds.map(id => this.getAllEmployeesForNode(id));
        const res = await Promise.all(employees);
        return res.flat();
    }
    async getAllManagersAndDescendants(nodeId) {
        const nodeIds = await this.nodeService.getNodeAndItsDescendants(nodeId);
        const managers = nodeIds.map(id => this.getAllManagersForNode(id));
        const res = await Promise.all(managers);
        return res.flat();
    }
};
exports.UserServiceImpl = UserServiceImpl;
exports.UserServiceImpl = UserServiceImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.UserRepository)),
    __param(2, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.NodeService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserServiceImpl);
