import {update} from "../../core/render/update";
import {Controller} from "../../class/controller";
import {ApiController} from "../../class/apiController";

export function getSetter(data:{},updater:Controller){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        update(this.root,this)
        return true
    }
    return setter.bind(updater)
}

export function getSetterForApi(data:{},updater:ApiController){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        update(this.root,this)
        return true
    }
    return setter.bind(updater)
}