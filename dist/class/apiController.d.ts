import ApiComponent from "./apiComponent";
import { Controller } from "./controller";
export declare class ApiController {
    root: ParentNode;
    proto: ApiComponent;
    preRender: boolean;
    link: Map<string, {}>;
    to: Controller[];
    raw_data: {};
    proxyForMethods: {};
    constructor();
    receiver(method: string, ...args: any[]): any;
}
