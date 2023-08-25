import { Component } from "./component";
export declare class Controller {
    root: ParentNode;
    proto: Component;
    link: Map<string, {}>;
    to: Controller[];
    raw_data: {};
    proxyForMethods: {};
    constructor();
    receiver(method: string, ...args: any[]): any;
}
