import {ContextController} from "../define/ContextController";

/**
 *
 * @param controller
 */
export function getCommitMethod(controller:ContextController):any
{
    let commit = function (method:string, ...args:any[]):any{
        return this.receiver(method,args);
    }
    return commit.bind(controller);
}

/**
 *
 * @param controller
 */
export function getSetterMethod(controller:ContextController):any
{
    let setter = function (property:string,value:any):any{
        this["$plugins"].set(property,value);
    }
    return setter.bind(controller.componentConfig);
}

/**
 *
 * @param controller
 */
export function getGetterMethod(controller:ContextController):any
{
    let getter = function (property:string):any{
        return this["$plugins"].get(property);
    }
    return getter.bind(controller.componentConfig);
}

/**
 *
 * @param controller
 */
export function getPublishMethod(controller:ContextController):any
{
    let publisher = function (method:string,...args:any[]):void{
        for (let i:number = 0; i < this.to.length; i++){
            this.to[i].receiver(method,args);
        }
    }

    return publisher.bind(controller);
}