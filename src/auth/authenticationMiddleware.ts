// adding role checking (if it's employee or manager)
import { User, UserType } from "../models/user.model";


export function authenticate(req : any, res : any, next : any){
    if(req.isAuthenticated()){
        return next();
    }

    res.status(401).json({message : "Not authenticated!"})
}

export function checkUserRole(user : UserType){
    return function (req : any, res : any, next : any){
        if(!req.isAuthenticated()){
            return res.status(401).json({message : "Not authenticated!"})
        }

        if(req.user.type !== user){
            return res.status(403).json({message : "Access denied!"})
        }

        next();
    }
}