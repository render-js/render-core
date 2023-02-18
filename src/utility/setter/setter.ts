import {update, updateForComponent} from "../../core/render/update";
import {VPage} from "../../class/page";

export function getSetter(data:{},updater:VPage){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        update(this.root,this)
        return true
    }

    return setter.bind(updater)
}

export function getSetterForComponent(data:{},updater:VPage){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        updateForComponent(this.root,this)
        return true
    }

    return setter.bind(updater)
}