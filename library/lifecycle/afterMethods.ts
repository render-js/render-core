import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";

/**
 * 该函数用于处理渲染后操作
 * @param controller
 * @param child
 * @param link
 */
export function afterMethodsTypeOne(controller:Controller, child:Element ,link:Controller | ApiController | PageController):void{
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
export function afterMethodsTypeTwo(controller:Controller, child:Element ,link:Controller | ApiController | PageController):void{
    //将本控制对象保存到父控制对象的发布数组中
    link.to.push(controller)

    //将执行空间保存到父控制对象
    link.link.set(child.getAttribute("name"),controller.raw_data);
}