import {getSetter, getSetterForComponent} from "../../utility/setter/setter";
import {Controller} from "../../class/controller";

export  function getProxyObject(obj:{},updater:Controller):any{

    let handel = {}

    handel["set"] = getSetter(obj,updater)

    return new Proxy(obj, handel);
}

export  function getProxyObjectForComponent(obj:{},updater:Controller):any{

    let handel = {}

    handel["set"] = getSetterForComponent(obj,updater)

    return new Proxy(obj, handel);
}
