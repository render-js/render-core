import { getSetter } from "../../library/setter/setter";
export function getProxyObject(obj, updater) {
    //定义代理方法对象
    var handel = {};
    //获取set代理方法
    handel["set"] = getSetter(obj, updater);
    //返回代理对象
    return new Proxy(obj, handel);
}
