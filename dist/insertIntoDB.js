"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ioc_container_1 = require("./ioc.container");
const ioc_configuration_1 = require("./ioc.configuration");
const user_model_1 = require("./models/user.model");
const node_model_1 = require("./models/node.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function insertIntoDB() {
    const container = (0, ioc_container_1.buildContainer)();
    const dBConnector = container.get(ioc_configuration_1.IOC_CONFIGURATION.MongoDBConnector);
    await dBConnector.connect();
    const userRepo = container.get(ioc_configuration_1.IOC_CONFIGURATION.UserRepository);
    const nodeRepo = container.get(ioc_configuration_1.IOC_CONFIGURATION.NodeRepository);
    try {
        const rootNode = await nodeRepo.insert({
            _id: "1",
            nodeName: "Srbija",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: null,
            descendants: ["2", "3"]
        });
        const vojvodina = await nodeRepo.insert({
            _id: "2",
            nodeName: "Vojvodina",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: rootNode._id,
            descendants: ["4", "7"]
        });
        const gradBeograd = await nodeRepo.insert({
            _id: "3",
            nodeName: "Grad Beograd",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: rootNode._id,
            descendants: ["10", "13"]
        });
        const severnobacki = await nodeRepo.insert({
            _id: "4",
            nodeName: "Severnobački okrug",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: vojvodina._id,
            descendants: ["5"]
        });
        const subotica = await nodeRepo.insert({
            _id: "5",
            nodeName: "Subotica",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: severnobacki._id,
            descendants: ["6"]
        });
        const radnja1 = await nodeRepo.insert({
            _id: "6",
            nodeName: "Radnja 1",
            type: node_model_1.NodeType.STORE,
            parentNodeId: subotica._id,
            descendants: []
        });
        const juznobacki = await nodeRepo.insert({
            _id: "7",
            nodeName: "Južnobački okrug",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: vojvodina._id,
            descendants: ["8"]
        });
        const noviSad = await nodeRepo.insert({
            _id: "8",
            nodeName: "Novi Sad",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: juznobacki._id,
            descendants: ["9", "11", "12"]
        });
        const liman = await nodeRepo.insert({
            _id: "9",
            nodeName: "Liman",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: noviSad._id,
            descendants: ["14", "15"]
        });
        const radnja4 = await nodeRepo.insert({
            _id: "14",
            nodeName: "Radnja 4",
            type: node_model_1.NodeType.STORE,
            parentNodeId: liman._id,
            descendants: []
        });
        const radnja5 = await nodeRepo.insert({
            _id: "15",
            nodeName: "Radnja 5",
            type: node_model_1.NodeType.STORE,
            parentNodeId: liman._id,
            descendants: []
        });
        const detelinara = await nodeRepo.insert({
            _id: "11",
            nodeName: "Detelinara",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: noviSad._id,
            descendants: ["16", "17"]
        });
        const radnja2 = await nodeRepo.insert({
            _id: "16",
            nodeName: "Radnja 2",
            type: node_model_1.NodeType.STORE,
            parentNodeId: detelinara._id,
            descendants: []
        });
        const radnja3 = await nodeRepo.insert({
            _id: "17",
            nodeName: "Radnja 3",
            type: node_model_1.NodeType.STORE,
            parentNodeId: detelinara._id,
            descendants: []
        });
        const noviBeograd = await nodeRepo.insert({
            _id: "10",
            nodeName: "Novi Beograd",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: gradBeograd._id,
            descendants: ["18"]
        });
        const bezanija = await nodeRepo.insert({
            _id: "18",
            nodeName: "Bežanija",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: noviBeograd._id,
            descendants: ["19"]
        });
        const radnja6 = await nodeRepo.insert({
            _id: "19",
            nodeName: "Radnja 6",
            type: node_model_1.NodeType.STORE,
            parentNodeId: bezanija._id,
            descendants: []
        });
        const vracar = await nodeRepo.insert({
            _id: "13",
            nodeName: "Vračar",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: gradBeograd._id,
            descendants: ["20", "22"]
        });
        const neimar = await nodeRepo.insert({
            _id: "20",
            nodeName: "Neimar",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: vracar._id,
            descendants: ["21"]
        });
        const radnja7 = await nodeRepo.insert({
            _id: "21",
            nodeName: "Radnja 7",
            type: node_model_1.NodeType.STORE,
            parentNodeId: neimar._id,
            descendants: []
        });
        const crveniKrst = await nodeRepo.insert({
            _id: "22",
            nodeName: "Crveni krst",
            type: node_model_1.NodeType.OFFICE,
            parentNodeId: vracar._id,
            descendants: ["23", "24"]
        });
        const radnja8 = await nodeRepo.insert({
            _id: "23",
            nodeName: "Radnja 8",
            type: node_model_1.NodeType.STORE,
            parentNodeId: crveniKrst._id,
            descendants: []
        });
        const radnja9 = await nodeRepo.insert({
            _id: "24",
            nodeName: "Radnja 9",
            type: node_model_1.NodeType.STORE,
            parentNodeId: crveniKrst._id,
            descendants: []
        });
        // adding random users
        const allNodeIds = [
            rootNode._id, vojvodina._id, gradBeograd._id, severnobacki._id, subotica._id,
            radnja1._id, juznobacki._id, noviSad._id, liman._id, radnja4._id,
            radnja5._id, detelinara._id, radnja2._id, radnja3._id, noviBeograd._id,
            bezanija._id, radnja6._id, vracar._id, neimar._id, radnja7._id,
            crveniKrst._id, radnja8._id, radnja9._id
        ];
        const users = [
            { name: "Miloš Petrović", email: "milos.petrovic@test.com", type: user_model_1.UserType.MANAGER, password: "milos123" },
            { name: "Jelena Marković", email: "jelena.markovic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "jelena123" },
            { name: "Nikola Jovanović", email: "nikola.jovanovic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "nikola123" },
            { name: "Ana Kovačević", email: "ana.kovacevic@test.com", type: user_model_1.UserType.MANAGER, password: "ana123" },
            { name: "Marko Ilić", email: "marko.ilic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "marko123" },
            { name: "Sara Stojanović", email: "sara.stojanovic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "sara123" },
            { name: "Stefan Đorđević", email: "stefan.djordjevic@test.com", type: user_model_1.UserType.MANAGER, password: "stefan123" },
            { name: "Teodora Popović", email: "teodora.popovic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "teodora123" },
            { name: "Vuk Milošević", email: "vuk.milosevic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "vuk123" },
            { name: "Katarina Janković", email: "katarina.jankovic@test.com", type: user_model_1.UserType.MANAGER, password: "katarina123" },
            { name: "Luka Nikolić", email: "luka.nikolic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "luka123" },
            { name: "Ivana Savić", email: "ivana.savic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "ivana123" },
            { name: "Filip Ristić", email: "filip.ristic@test.com", type: user_model_1.UserType.MANAGER, password: "filip123" },
            { name: "Milica Pavlović", email: "milica.pavlovic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "milica123" },
            { name: "Đorđe Matić", email: "djordje.matic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "djordje123" },
            { name: "Jovana Stanković", email: "jovana.stankovic@test.com", type: user_model_1.UserType.MANAGER, password: "jovana123" },
            { name: "Bojan Nikolić", email: "bojan.nikolic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "bojan123" },
            { name: "Nina Božić", email: "nina.bozic@test.com", type: user_model_1.UserType.EMPLOYEE, password: "nina123" },
            { name: "Aleksandar Milić", email: "aleksandar.milic@test.com", type: user_model_1.UserType.MANAGER, password: "aleksandar123" },
            { name: "Marina Zarić", email: "marina.zaric@test.com", type: user_model_1.UserType.EMPLOYEE, password: "marina123" }
        ];
        for (let i = 0; i < users.length; i++) {
            const randomNodeId = allNodeIds[getRandomInt(0, allNodeIds.length - 1)];
            const hashed = await bcrypt_1.default.hash(users[i].password, 10);
            await userRepo.insert({
                _id: (i + 1).toString(),
                name: users[i].name,
                email: users[i].email,
                type: users[i].type,
                nodeId: randomNodeId,
                password: hashed
            });
        }
        console.log("Insert completed!");
    }
    catch (err) {
        console.error("Insert failed : ", err);
    }
    finally {
        await dBConnector.disconnect();
    }
}
insertIntoDB();
