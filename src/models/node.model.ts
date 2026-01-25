export interface Node{
    _id : string;
    nodeName : string;
    type : string; // office or store

    parentNodeId : string | null;
    descendants : string[]; // path or array of all descendants for easier search
}

export enum NodeType{
    OFFICE = 'OFFICE',
    STORE  = 'STORE'
}
