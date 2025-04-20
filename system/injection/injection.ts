import {ContextController} from "../prototype/ContextController";

/**
 *
 * @param controller
 */
export function get_commit_method(controller:ContextController):any
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
export function get_publish_method(controller:ContextController):any
{
    let publisher = function (method:string,...args:any[]):void{
        for (let i:number = 0; i < this.to.length; i++){
            this.to[i].receiver(method,args);
        }
    }
    return publisher.bind(controller);
}

/**
 *
 * @param controller
 */
export function get_getter_method(controller:ContextController):any
{
    let getter = function (property:string):any{
        return this[property];
    }
    return getter.bind(controller.componentConfig);
}

/**
 *
 * @param controller
 */
export function get_setter_method(controller:ContextController):any
{
    let setter = function (property:string,value:any):any{
        Reflect.set(this,property,value);
    }
    return setter.bind(controller.componentConfig);
}