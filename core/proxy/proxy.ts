import {getSetter} from "../../utility/setter/setter";
import {Controller} from "../../class/controller";

export  function getProxyObject(obj:{},updater:Controller):any{

    let handel = {}

    handel["set"] = getSetter(obj,updater)

    return new Proxy(obj, handel);
}
