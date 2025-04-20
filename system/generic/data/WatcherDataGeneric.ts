import {HttpAction} from "../../prototype/HttpAction";

export interface WatcherDataGeneric{
    $name?:string;
    $props?:Map<string,any>,
    $params?:Map<string,any>,
    $refs?:Map<string,any>,
    $pathVariable?:Map<string,any>,
    $http?:HttpAction,
    $plugins?: (plugin:string) => any,
    $commit?:(method:string, ...args:[any])=>void;
    $publish?:(method:string, ...args:[any])=>void;
    $get?: (name:string) => any;
    $set?: (name:string,value:any) => void;
}