import {getProxyForInject} from "../proxy/getProxy";

export function resolveQueries():Map<string, any>
{
    let query:Map<string, any> = new Map<string, any>();

    if (location.search !== undefined){
        let parameters:string = location.search.replace("?","")

        let listPara:string[] = parameters.split("&")

        listPara.forEach(function (value:string):void{

            let results:string[] = value.split("=")

            Reflect.set(query,results[0],results[1]);
        })
    }
    return getProxyForInject(query);
}