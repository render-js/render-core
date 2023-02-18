import {getSetter, getSetterForComponent} from "../../utility/setter/setter";
import {VPage} from "../../class/page";

export interface UpdaterBase{
    getRootNode():Element;
}

export  function getProxyObject(obj:{},updater:VPage):any{

    let handel = {}

    handel["set"] = getSetter(obj,updater)

    return new Proxy(obj, handel);
}

export  function getProxyObjectForComponent(obj:{},updater:VPage):any{

    let handel = {}

    handel["set"] = getSetterForComponent(obj,updater)

    return new Proxy(obj, handel);
}
