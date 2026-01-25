"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const ioc_container_1 = require("../ioc.container");
const ioc_configuration_1 = require("../ioc.configuration");
const chai_1 = require("chai");
describe('UserController - Unit Test', () => {
    let userController;
    let container;
    before(() => {
        container = (0, ioc_container_1.buildContainer)();
        userController = new user_controller_1.UserControllerImpl(container.get(ioc_configuration_1.IOC_CONFIGURATION.UserService));
    });
    describe('getUsers', () => {
        it('should return all users', async () => {
            const req = {};
            let jsonCalled = null;
            let jsonData = null;
            const res = {
                json: (data) => {
                    jsonCalled = true;
                    jsonData = data;
                }
            };
            await userController.getUsers(req, res);
            (0, chai_1.expect)(jsonCalled).to.equal(true);
            (0, chai_1.expect)(jsonData).to.exist;
            (0, chai_1.expect)(jsonData).to.be.an('array');
        });
    });
});
