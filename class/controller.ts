import {Component} from "./component";

export class Controller{

    root:ParentNode;

    proto:Component;

    preRender:boolean;
    
    link:Map<string, HTMLDivElement>;

    to:Component[];

    raw_data:{};

    proxyForMethods:{};
}