import {ComponentController} from "../../lib/proto/controller/ComponentController";
import {PageController} from "../../lib/proto/controller/PageController";

/**
 * 该函数用于处理渲染后操作
 * @param controller
 * @param child
 * @param link
 */
export function afterMethodsTypeOne(controller:ComponentController, child:Element , link:ComponentController | PageController):void{
    //将本控制对象保存到父控制对象的发布数组中
    link.to.push(controller)

    //将执行空间保存到父控制对象
    link.link.set(child.getAttribute("name"),controller.raw_data);
}

/**
 * 该函数用于处理渲染后操作
 * @param controller
 * @param child
 * @param link
 */
export function afterMethodsTypeTwo(controller:ComponentController, child:Element , link:ComponentController | PageController):void{
    //将本控制对象保存到父控制对象的发布数组中
    link.to.push(controller)
}