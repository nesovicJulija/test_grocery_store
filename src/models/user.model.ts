export interface User{
    _id: string;
    name : string;
    email : string;
    type : UserType; // employee or manager
    nodeId : string;
    password : string;
 
}

export enum UserType{
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER'
}

