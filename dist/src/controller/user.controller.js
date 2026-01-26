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
exports.UserControllerImpl = void 0;
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("../ioc.configuration");
const authenticationMiddleware_1 = require("../auth/authenticationMiddleware");
let UserControllerImpl = class UserControllerImpl {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    init(router) {
        router.get("/users", authenticationMiddleware_1.authenticate, this.getUsers.bind(this));
        router.get("/user", authenticationMiddleware_1.authenticate, this.getUserById.bind(this));
        router.post("/users", authenticationMiddleware_1.authenticate, this.create.bind(this));
        router.post("/user/:id", authenticationMiddleware_1.authenticate, this.update.bind(this));
        router.delete("/users", authenticationMiddleware_1.authenticate, this.delete.bind(this));
    }
    async getUsers(req, res) {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }
    async getUserById(req, res) {
        const user = await this.userService.getUserById(req.params.id);
        res.json(user);
    }
    async create(req, res) {
        const user = await this.userService.create(req.body);
        res.json(user);
    }
    async update(req, res) {
        const updatedUser = await this.userService.update(req.params.id, req.body);
        res.json({ updatedUser });
    }
    async delete(req, res) {
        const deletedUser = await this.userService.delete(req.params.id);
        res.json({ deletedUser });
    }
};
exports.UserControllerImpl = UserControllerImpl;
exports.UserControllerImpl = UserControllerImpl = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.UserService)),
    __metadata("design:paramtypes", [Object])
], UserControllerImpl);
