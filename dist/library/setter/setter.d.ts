import { Controller } from "../../class/controller";
import { ApiController } from "../../class/apiController";
export declare function getSetter(data: {}, updater: Controller): any;
export declare function getSetterForInject(data: {}): (obj: any, prop: any, value: any) => boolean;
export declare function getSetterForApi(data: {}, updater: ApiController): any;
