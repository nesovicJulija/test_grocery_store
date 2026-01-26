"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../src/controller/user.controller");
const chai_1 = require("chai");
describe('UserController - getUsers() - Unit Test', () => {
    let userController;
    before(() => {
        const mockService = {
            getAllUsers: async () => {
                return [
                    { _id: "1", name: "Ana" },
                    { _id: "2", name: "Marko" }
                ];
            }
        };
        userController = new user_controller_1.UserControllerImpl(mockService);
    });
    describe('getUsers', () => {
        it('should return all users', async () => {
            const req = {};
            let jsonCalled = false;
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
describe('UserController - getUserById() - Unit Test', () => {
    let userController;
    before(() => {
        const mockService = {
            getUserById: async (id) => {
                return [
                    { _id: id, name: "Test User" }
                ];
            }
        };
        userController = new user_controller_1.UserControllerImpl(mockService);
    });
    describe('getUsers', () => {
        it('should return user by id', async () => {
            const req = {
                params: { id: "123" }
            };
            let jsonCalled = false;
            let jsonData = null;
            const res = {
                json: (data) => {
                    jsonCalled = true;
                    jsonData = data;
                }
            };
            await userController.getUserById(req, res);
            (0, chai_1.expect)(jsonCalled).to.equal(true);
            (0, chai_1.expect)(jsonData).to.deep.equal([{ _id: "123", name: "Test User" }]);
        });
    });
});
describe('UserController - create() - Unit Test', () => {
    it('should create new user', async () => {
        let userController;
        before(() => {
            const mockService = {
                createUser: async (user) => {
                    return {
                        _id: "1",
                        ...user
                    };
                }
            };
            userController = new user_controller_1.UserControllerImpl(mockService);
        });
        it('should create user and return it', async () => {
            const req = {
                body: {
                    name: 'Ana',
                    email: 'ana@test.com'
                }
            };
            let jsonData = null;
            const res = {
                json: (data) => {
                    jsonData = data;
                }
            };
            await userController.create(req, res);
            (0, chai_1.expect)(jsonData).to.exist;
            (0, chai_1.expect)(jsonData.name).to.equal("Ana");
            (0, chai_1.expect)(jsonData._id).to.equal("1");
        });
    });
});
