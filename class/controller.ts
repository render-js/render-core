import {Component} from "./component";

export class Controller{

    root:ParentNode;

    proto:Component;

    preRender:boolean;
    
    link:Map<string,{}>;

    constructor() {
        this.link = new Map<string, {}>();
        this.preRender = false;
    }

    to:Component[];

    raw_data:{};

    proxyForMethods:{};
}