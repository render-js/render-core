import {Controller} from "../../class/controller/controller";
import {update_Render} from "../render/updateRender";

/**
 * 获取data对象的代理对象
 * @param obj
 * @param updater
 */
export  function getProxyObject(obj:{},updater:Controller):any{
    //定义代理方法对象
    let handel:{} = {}

    //获取set代理方法
    handel["set"] = getSetter(obj,updater)

    //返回代理对象
    return new Proxy(obj, handel);
}

/**
 * 获取setter代理函数
 * @param data
 * @param updater
 */
export function getSetter(data:{},updater:Controller){

    let setter = function (obj,prop,value):boolean{

        //更新值
        obj[prop] = value

        //检查是否有watcher
        try {
            obj[prop]();
        }catch (e) {
            console.log(e.message);
        }

        //更新前操作
        this.proto.getBeforeUpdate();

        //执行更新
        update_Render(this);

        //更新后操作
        this.proto.getAfterUpdate()

        return true;
    }
    return setter.bind(updater);
}