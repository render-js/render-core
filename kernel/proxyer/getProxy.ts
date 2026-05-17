import {ContextController} from "../../system/prototype/ContextController";
import {update_Render} from "../renderer/updateRender";
import {locateInputAddress} from "../../system/utility/react/sectionUtility";

/**
 * @param data
 * @param updater
 */
export  function get_proxy_for_method(data:{}, updater:ContextController):any{
    let handel:{} = {}
        handel["set"] = get_setter_for_method_proxy(updater);

    return new Proxy(data, handel);
}

/**
 * @param updater
 */
function get_setter_for_method_proxy(updater:ContextController){

    let setter = function (obj:{}, prop: string, value: any):boolean
        {
            Reflect.set(obj, prop, value);
            update_Render(this);

            try {
                this.watcher[prop](obj[prop],value);
            }catch (error) {

            }

            locateInputAddress(this);
            Reflect.deleteProperty(this,"origin");
            return true;
        }

    return setter.bind(updater);
}

/**
 * @param origin
 */
export function get_proxy_for_watcher(origin:object):object
{
    let handles:{} = {};
    return new Proxy(origin,handles);
}

/**
 * @param origin
 */
export function get_proxy_for_computed(origin:object):object
{
    let handles:{} = {};
    return new Proxy(origin,handles);
}