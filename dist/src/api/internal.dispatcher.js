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
exports.InternalApiDispatcher = void 0;
const inversify_1 = require("inversify");
const ioc_configuration_1 = require("../ioc.configuration");
const user_controller_1 = require("../controller/user.controller");
const express_1 = require("express");
// import { authenticate } from "passport";
const authenticationMiddleware_1 = require("../auth/authenticationMiddleware");
const node_controller_1 = require("../controller/node.controller");
let InternalApiDispatcher = class InternalApiDispatcher {
    userController;
    nodeController;
    constructor(userController, nodeController) {
        this.userController = userController;
        this.nodeController = nodeController;
    }
    init(app) {
        const apiRouter = (0, express_1.Router)();
        apiRouter.use(authenticationMiddleware_1.authenticate);
        this.userController.init(apiRouter);
        this.nodeController.init(apiRouter);
        app.use("/api", apiRouter);
    }
};
exports.InternalApiDispatcher = InternalApiDispatcher;
exports.InternalApiDispatcher = InternalApiDispatcher = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.UserController)),
    __param(1, (0, inversify_1.inject)(ioc_configuration_1.IOC_CONFIGURATION.NodeController)),
    __metadata("design:paramtypes", [user_controller_1.UserControllerImpl,
        node_controller_1.NodeControllerImpl])
], InternalApiDispatcher);
