import {getSetter} from "../../library/setter/setter";
import {Controller} from "../../class/controller";

export  function getProxyObject(obj:{},updater:Controller):any{
    //定义代理方法对象
    let handel:{} = {}

    //获取set代理方法
    handel["set"] = getSetter(obj,updater)

    //返回代理对象
    return new Proxy(obj, handel);
}