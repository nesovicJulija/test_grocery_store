import { inject, injectable } from "inversify";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { UserService } from "../services/user.service";
import { Router } from "express";
import { ClientRequest, get, IncomingMessage, RequestOptions } from "node:http";
import { authenticate } from "../auth/authenticationMiddleware";
import { URL } from "node:url";

@injectable()
export class UserControllerImpl{
    constructor(
        @inject(IOC_CONFIGURATION.UserService) private userService : UserService
    ){

    }

    init(router : Router)
    {
        router.get("/users", authenticate,this.getUsers.bind(this))
        router.get("/user", authenticate, this.getUserById.bind(this))
        router.post("/users", authenticate, this.create.bind(this))
        router.post("/user/:id", authenticate, this.update.bind(this))
        router.delete("/users", authenticate, this.delete.bind(this))
    }

    async getUsers(req: any, res : any){
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    async getUserById(req:any, res: any){
        const user = await this.userService.getUserById(req.params.id)
        res.json(user)
    }

    async create(req : any, res : any){
        const user = await this.userService.create(req.body)
        res.json(user)
    }

    async update(req : any, res : any){
        const updatedUser = await this.userService.update(req.params.id, req.body)
        res.json({updatedUser})
    }

    async delete(req : any, res : any){
        const deletedUser = await this.userService.delete(req.params.id)
        res.json({ deletedUser })
    }
}

