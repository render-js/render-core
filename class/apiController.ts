import ApiComponent from "./apiComponent";
import {Component} from "./component";

export class ApiController{

    root:ParentNode;

    proto:ApiComponent;

    preRender:boolean;

    link:Map<string,{}>;

    constructor() {
        this.link = new Map<string, {}>();
    }

    to:Component[];

    raw_data:{};

    proxyForMethods:{};
}