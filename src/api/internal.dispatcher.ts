import { inject, injectable } from "inversify";
import { IOC_CONFIGURATION } from "../ioc.configuration";
import { UserControllerImpl } from "../controller/user.controller";
import { Application, Router } from "express";
// import { authenticate } from "passport";
import { authenticate } from "../auth/authenticationMiddleware";
import { NodeControllerImpl } from "../controller/node.controller";

@injectable()
export class InternalApiDispatcher {
    constructor(
        @inject(IOC_CONFIGURATION.UserController) private userController : UserControllerImpl,
        @inject(IOC_CONFIGURATION.NodeController) private nodeController : NodeControllerImpl
    ){

    }

    init(app : Application): void{
        const apiRouter = Router()
        apiRouter.use(authenticate)

        this.userController.init(apiRouter)
        this.nodeController.init(apiRouter)

        app.use("/api", apiRouter)
    }
}