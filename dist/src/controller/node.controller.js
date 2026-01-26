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
exports.NodeControllerImpl = void 0;
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("../ioc.configuration");
const authenticationMiddleware_1 = require("../auth/authenticationMiddleware");
let NodeControllerImpl = class NodeControllerImpl {
    nodeService;
    userService;
    constructor(nodeService, userService) {
        this.nodeService = nodeService;
        this.userService = userService;
    }
    init(router) {
        router.get("/nodes", authenticationMiddleware_1.authenticate, this.getNodes.bind(this));
        router.get("/node", authenticationMiddleware_1.authenticate, this.getNodeById.bind(this));
        router.post("/nodes", authenticationMiddleware_1.authenticate, this.create.bind(this));
        router.post("/node/:id", authenticationMiddleware_1.authenticate, this.update.bind(this));
        router.delete("/nodes", authenticationMiddleware_1.authenticate, this.delete.bind(this));
        router.get("/nodes/:id/employees", authenticationMiddleware_1.authenticate, this.getAllEmployeesForNode.bind(this));
        router.get("/nodes/:id/managers", authenticationMiddleware_1.authenticate, this.getAllManagersForNode.bind(this));
        router.get("/nodes/descendants/:id/employees", authenticationMiddleware_1.authenticate, this.getAllEmployeesAndDescendants.bind(this));
        router.get("/nodes/descendants/:id/managers", authenticationMiddleware_1.authenticate, this.getAllManagersAndDescendants.bind(this));
    }
    async create(req, res) {
        const node = await this.nodeService.create(req.body);
        res.json(node);
    }
    async update(req, res) {
        const updatedNode = await this.nodeService.update(req.params.id, req.body);
        res.json({ updatedNode });
    }
    async delete(req, res) {
        const deletedNode = await this.nodeService.delete(req.params.id);
        res.json({ deletedNode });
    }
    async getNodeById(req, res) {
        const node = await this.nodeService.getNodeById(req.params.id);
        res.json(node);
    }
    async getNodes(req, res) {
        const users = await this.nodeService.getAllNodes();
        res.json(users);
    }
    async getAllEmployeesForNode(req, res) {
        const node = req.params.id;
        const employees = await this.userService.getAllEmployeesForNode(node);
        res.json(employees);
    }
    async getAllManagersForNode(req, res) {
        const node = req.params.id;
        const managers = await this.userService.getAllManagersForNode(node);
        res.json(managers);
    }
    async getAllEmployeesAndDescendants(req, res) {
        const nodeId = req.params.id;
        const employees = await this.userService.getAllEmployeesAndDescendants(nodeId);
        res.json(employees);
    }
    async getAllManagersAndDescendants(req, res) {
        const nodeId = req.params.id;
        const managers = await this.userService.getAllManagersAndDescendants(nodeId);
        res.json(managers);
    }
};
exports.NodeControllerImpl = NodeControllerImpl;
exports.NodeControllerImpl = NodeControllerImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.NodeService)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.UserService)),
    __metadata("design:paramtypes", [Object, Object])
], NodeControllerImpl);
