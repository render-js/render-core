import {ComponentController} from "../../proto/controller/ComponentController";
import {update_Render} from "../render/updateRender";
import {locateInputAddress} from "../utility/sectionUtility";

/**
 * 获取data对象的代理对象
 * @param obj
 * @param updater
 */
export  function getProxyObject(obj:{},updater:ComponentController):any{
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
export function getSetter(data:{}, updater:ComponentController){

    let setter = function (obj: { [x: string]: any; }, prop: string | number, value: any):boolean{

        if (this.mode !== "box"){
            console.log("Not box element can not to update data!");
            return false;
        }

        //检查是否有watcher
        try {

            this.watcher[prop](obj[prop],value);

        }catch (error) {

        }

        //更新值
        obj[prop] = value

        //执行更新
        update_Render(this);

        locateInputAddress(this);

        Reflect.deleteProperty(this,"origin");

        return true;
    }

    return setter.bind(updater);
}