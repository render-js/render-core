import {Component} from "./component";

export class Controller{

    root:ParentNode;

    owner:Component;

    references:Map<string, Element>;

    raw_data:{};

    proxyForMethods:{};

    proxyForExecutor:{};
}