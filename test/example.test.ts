import { UserControllerImpl } from "../src/controller/user.controller"
import { expect } from "chai";

describe('UserController - getUsers() - Unit Test', () => {
    let userController : UserControllerImpl;

    before(() => {
        const mockService = {
            getAllUsers : async () => {
                return [
                    { _id : "1", name : "Ana" },
                    { _id : "2", name : "Marko" }
                ]
            }
        }

        userController = new UserControllerImpl(mockService as any)
    })

    describe('getUsers', () => {
        it('should return all users', async () => {
            
                const req : any = {}
                let jsonCalled : boolean = false
                let jsonData: any = null;

                const res : any = {
                    json : (data : any) => {
                        jsonCalled = true
                        jsonData = data;
                    }
                }

                await userController.getUsers(req, res);

                expect(jsonCalled).to.equal(true);
                expect(jsonData).to.exist;
                expect(jsonData).to.be.an('array')
        
        })
    })
})

describe('UserController - getUserById() - Unit Test', () => {
    let userController : UserControllerImpl;

    before(() => {
        const mockService = {
            getUserById : async (id : string) => {
                return [
                    { _id : id, name : "Test User"}
                ]
            }
        }

        userController = new UserControllerImpl(mockService as any)
    })

    describe('getUsers', () => {
        it('should return user by id', async () => {
            
                const req : any = {
                    params: {id :"123"}
                }
                let jsonCalled : boolean = false
                let jsonData: any = null;

                const res : any = {
                    json : (data : any) => {
                        jsonCalled = true
                        jsonData = data;
                    }
                }

                await userController.getUserById(req, res);

                expect(jsonCalled).to.equal(true);
                expect(jsonData).to.deep.equal([{_id :"123", name : "Test User"}])
        })
    })
})