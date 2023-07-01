import {getSetter, getSetterForApi, getSetterForInject} from "../../library/setter/setter";
import {Controller} from "../../class/controller";
import {ApiController} from "../../class/apiController";

export  function getProxyObject(obj:{},updater:Controller):any{
    //定义代理方法对象
    let handel:{} = {}

    //获取set代理方法
    handel["set"] = getSetter(obj,updater)

    //返回代理对象
    return new Proxy(obj, handel);
}

export  function getProxyObjectForApi(obj:{},updater:ApiController):any{

    let handel:{} = {}

    handel["set"] = getSetterForApi(obj,updater)

    return new Proxy(obj, handel);
}

export function getProxyForInject(obj:{}):any
{
    let handel:{} = {}

    handel["set"] = getSetterForInject(obj);

    return new Proxy(obj, handel);
}