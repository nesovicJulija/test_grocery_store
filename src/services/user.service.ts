import { inject, injectable } from "inversify";
import { User } from "../models/user.model";
import { UserType } from "../models/user.model";
import { UserRepository } from "../repos/user.repository";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { MongoDBConnector } from "../mongodb.connector";
import { NodeService } from "./node.service";

export interface UserService{
        getAllUsers(): Promise<User[]>;
        getUserById(id: string) : Promise<User | null>;
        create(user : User) : Promise<User>;
        delete(id : string) : Promise<boolean>;
        update(id : string, user : Partial<User>) : Promise<User | null>;

        getAllEmployeesForNode(nodeId : string) : Promise<User[]>;
        getAllManagersForNode(nodeId : string) : Promise<User[]>;
        getAllEmployeesAndDescendants(nodeId : string) : Promise<User[]>;
        getAllManagersAndDescendants(nodeId : string) : Promise<User[]>;
}

@injectable()
export class UserServiceImpl implements UserService{
    constructor(
        @inject(IOC_CONFIGURATION.MongoDBConnector) private dbConnector : MongoDBConnector,
        @inject(IOC_CONFIGURATION.UserRepository) private userRepo : UserRepository,
        @inject(IOC_CONFIGURATION.NodeService) private nodeService : NodeService
    )
    {

    }
    
    async create(user: User): Promise<User> {
        const newUser = await this.userRepo.insert(user);
        return newUser
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const res = await this.userRepo.update(
            { _id : id },
            { $set : user }
        )

        if(res.matchedCount === 0)
        {
            return null
        }

        return this.getUserById(id);
    }

    async delete(id: string): Promise<boolean> {
        const user = await this.userRepo.deleteOne({_id : id});
        return user.deletedCount === 1
    }

    getUserById(id: string) : Promise<User | null>
    {
        return this.userRepo.findOne({_id : id })
    }

    getAllUsers(): Promise<User[]>
    {
        return this.userRepo.find({}).toArray();
    }

    getAllEmployeesForNode(nodeId: string): Promise<User[]> {
        return this.userRepo.find({
            nodeId,
            type : UserType.EMPLOYEE
        }).toArray()
    }

    getAllManagersForNode(nodeId : string) : Promise<User[]>
    {
        return this.userRepo.find({
            nodeId,
            type : UserType.MANAGER
        }).toArray()
    }

    async getAllEmployeesAndDescendants(nodeId : string) : Promise<User[]>
    {
        const nodeIds = await this.nodeService.getNodeAndItsDescendants(nodeId);

        const employees = nodeIds.map(id => this.getAllEmployeesForNode(id))

        const res = await Promise.all(employees)

        return res.flat()
    }

    async getAllManagersAndDescendants(nodeId : string) : Promise<User[]>{
        const nodeIds = await this.nodeService.getNodeAndItsDescendants(nodeId);

        const managers = nodeIds.map(id => this.getAllManagersForNode(id))

        const res = await Promise.all(managers)

        return res.flat()
    }
}