import {updateRender} from "../../core/render/updateRender";
import {Controller} from "../../class/controller";
import {ApiController} from "../../class/apiController";

export function getSetter(data:{},updater:Controller){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        updateRender(this)
        return true
    }
    return setter.bind(updater)
}

export function getSetterForInject(data:{}){

    return function (obj, prop, value): boolean {
        console.error("Meta filed can't be set value!")
        return false
    };
}

export function getSetterForApi(data:{},updater:ApiController){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        updateRender(this)
        return true
    }
    return setter.bind(updater)
}