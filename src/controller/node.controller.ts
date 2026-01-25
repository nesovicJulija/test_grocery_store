import { inject, injectable } from "inversify";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { UserService } from "../services/user.service";
import { Router } from "express";
import { ClientRequest, get, IncomingMessage, RequestOptions } from "node:http";
import { authenticate } from "../auth/authenticationMiddleware";
import { URL } from "node:url";
import { NodeService } from "../services/node.service";
import { UserType } from "../models/user.model";

@injectable()
export class NodeControllerImpl{
    constructor(
        @inject(IOC_CONFIGURATION.NodeService) private nodeService : NodeService,
        @inject(IOC_CONFIGURATION.UserService) private userService : UserService
    ){

    }

    init(router : Router)
    {
        router.get("/nodes", authenticate,this.getNodes.bind(this))
        router.get("/node", authenticate,this.getNodeById.bind(this))
        router.post("/nodes", authenticate,this.create.bind(this))
        router.post("/node/:id", authenticate, this.update.bind(this))
        router.delete("/nodes", authenticate, this.delete.bind(this))
        router.get("/nodes/:id/employees", authenticate, this.getAllEmployeesForNode.bind(this))
        router.get("/nodes/:id/managers", authenticate, this.getAllManagersForNode.bind(this))
        router.get("/nodes/descendants/:id/employees", authenticate, this.getAllEmployeesAndDescendants.bind(this))
        router.get("/nodes/descendants/:id/managers", authenticate, this.getAllManagersAndDescendants.bind(this))
    }

     async create(req : any, res : any){
        const node = await this.nodeService.create(req.body)
        res.json(node)
    }

    async update(req : any, res : any){
        const updatedNode = await this.nodeService.update(req.params.id, req.body)
        res.json({updatedNode})
    }

    async delete(req : any, res : any){
        const deletedNode = await this.nodeService.delete(req.params.id)
        res.json({ deletedNode })
    }

    async getNodeById(req : any, res : any){
        const node = await this.nodeService.getNodeById(req.params.id)
        res.json(node)
    }

    async getNodes(req: any, res : any){
        const users = await this.nodeService.getAllNodes();
        res.json(users);
    }

    async getAllEmployeesForNode(req : any, res : any){
        const node = req.params.id
        const employees = await this.userService.getAllEmployeesForNode(node)

        res.json(employees)
    }

    async getAllManagersForNode(req : any, res : any){
        const node = req.params.id
        const managers = await this.userService.getAllManagersForNode(node)

        res.json(managers)
    }

    async getAllEmployeesAndDescendants(req : any, res : any)
    {
        const nodeId = req.params.id

        const employees = await this.userService.getAllEmployeesAndDescendants(nodeId)

        res.json(employees)
    }

    async getAllManagersAndDescendants(req : any, res : any)
    {
        const nodeId = req.params.id

        const managers = await this.userService.getAllManagersAndDescendants(nodeId)

        res.json(managers)
    }
}

