import { NodeControllerImpl } from "../src/controller/node.controller";
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

describe('UserController - create() - Unit Test', () => {
    it('should create new user', async () =>{
        let userController : UserControllerImpl

        before(() => {
            const mockService = {
                createUser : async (user : any) => {
                    return {
                        _id : "1",
                        ...user
                    }
                }
            }

            userController = new UserControllerImpl(mockService as any);
        })

        it('should create user and return it', async() => {
            const req : any = {
                body : {
                    name : 'Ana',
                    email : 'ana@test.com'
                }
            }

            let jsonData : any = null

            const res : any = {
                json : (data : any) => {
                    jsonData = data;
                }
            }

            await userController.create(req, res);

            expect(jsonData).to.exist;
            expect(jsonData.name).to.equal("Ana")
            expect(jsonData._id).to.equal("1")
        })
    })
})

describe('UserController - delete() - Unit Test', () => {
    it('should delete user', async() => {
        let userController : UserControllerImpl

        before(() => {
            const mockService = {
                deleteUser : async (id : string) => {
                    return true;
                }
            }

            userController = new UserControllerImpl(mockService as any)
        })

        it('should delete user and return success if deleted', async () => {
            const req : any = {
                params : {id : "123"}
            }

            let jsonData : any = null 

            const res : any = {
                json : (data : any) => {
                    jsonData = data;
                }
            }

            await userController.delete(req, res)

            expect(jsonData).to.deep.equal({ success : true })
        })
    })
})

describe('UserController - update() - Unit Test', () => {
    let userController : UserControllerImpl

    before(() => {
        const mockService = {
            update : async(id : string, data : any) => {
                return true
            }
        }

        userController = new UserControllerImpl(mockService as any)
    })

    it('should update user and return success true', async () => {
        const req : any = {
            params : {id : 123},
            body : {name : "Updated User"}
        }

        let jsonData : any = null 

        const res : any = {
            json : (data : any) => {
                jsonData = data;
            }
        }

        await userController.update(req, res)

        expect(jsonData).to.deep.equal({ updatedUser : true })
    })
})
