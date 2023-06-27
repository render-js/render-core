import {getSetter, getSetterForApi} from "../../utility/setter/setter";
import {Controller} from "../../class/controller";
import {ApiController} from "../../class/apiController";

export  function getProxyObject(obj:{},updater:Controller):any{

    let handel:{} = {}

    handel["set"] = getSetter(obj,updater)

    return new Proxy(obj, handel);
}

export  function getProxyObjectForApi(obj:{},updater:ApiController):any{

    let handel:{} = {}

    handel["set"] = getSetterForApi(obj,updater)

    return new Proxy(obj, handel);
}