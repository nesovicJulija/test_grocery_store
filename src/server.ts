import "reflect-metadata";

import express from "express";
import passport, { initialize } from "passport";
import session from "express-session";
import { buildContainer } from "./ioc.container";
import { IOC_CONFIGURATION } from "./ioc.configuration";
import dotenv from "dotenv";

import authRoutes from "./auth/routes"
import { configurePassport } from "./auth/passport";
import { MongoDBConnector } from "./mongodb.connector";
import { InternalApiDispatcher } from "./api/internal.dispatcher";

dotenv.config();

async function start(){
    const app = express();

    app.use(express.json())
    app.use(session({
        secret : process.env.SESSION_SECRET || "secret",
        resave : false,
        saveUninitialized : false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    const container = buildContainer()

    const dbConnector = container.get<MongoDBConnector>(IOC_CONFIGURATION.MongoDBConnector)
    await dbConnector.connect()

    const userRepo = container.get(IOC_CONFIGURATION.UserRepository)

    configurePassport(userRepo)

    const apiDispatcher = container.get<InternalApiDispatcher>(IOC_CONFIGURATION.InternalApiDispatcher);
    apiDispatcher.init(app)

    app.use("/auth", authRoutes)

    const port = process.env.PORT || 7002

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

start().catch(err => {
    console.error("Server failed to start : ", err)
    process.exit(1)
})