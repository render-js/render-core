//注入对象
import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";

export function getCodeSpaceForProps(data:{}, $props:Map<string, object>):void
{
    Reflect.set(data,"$props",$props);
}

export function getCodeSpaceForQuery(data:{},$query:Map<string, any>):void
{
    Reflect.set(data,"$queries",$query);
}

//注入对象
export function getCodeSpaceForRef(data:{},$ref:Map<string, Element>):void
{
    Reflect.set(data,"$refs",$ref);
}


export function getCommitMethod(controller:Controller | ApiController | PageController):any
{
    let commit = function (method:string, ...args:any[]):any{
        this.receiver(method,args);
    }
    return commit.bind(controller);
}

export function getSetterMethod(controller:Controller | ApiController | PageController):any
{
    let setter = function (property:string,value:any):any{
        this[property] = value;
    }
    return setter.bind(controller.raw_data);
}

//注入对象
export function getCodeSpaceForCommit(data:{},commit:any):void
{
    Reflect.set(data,"$commit",commit);
}


export function getPublishMethod(controller:Controller | ApiController | PageController):any
{
    let publisher = function (method:string,...args:any[]):void{
        for (let i=0; i< this.to.length; i++){
            this.to[i].receiver(method,args);
        }
    }

    return publisher.bind(controller);
}

//注入对象
export function getCodeSpaceForPublish(data:{},publisher:any):void
{
    Reflect.set(data,"$publish",publisher);
}

export function getCodeSpaceForProperty(data:{},setter:any):void
{
    Reflect.set(data,"$setter",setter);
}
