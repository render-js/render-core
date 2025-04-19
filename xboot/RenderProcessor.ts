import {isUnKnown} from "../system/utility/checkUtility";
import {ContextController} from "../system/define/ContextController";
import {get_tag_library} from "../system/recorder/table0/system_func_0";
import {Component} from "../index";
import {mpa_delivery} from "../kernel/delivery/delivery";

/**
 * This function is used to render element below the mount point.
 * @param collection
 * @param contextController
 */
export function renderHtml(collection:HTMLCollection, contextController:ContextController):void
{
    //遍历element节点，判断是否为自定义标签
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName.toUpperCase()))
        {
            //从tag库中获取该组件的定义
            let component:Component = get_tag_library().get(collection[i].nodeName.toUpperCase());

            if (typeof component === undefined){

                //没有找到定义，向控制台输出警告
                console.error(collection[i].nodeName.toUpperCase()+" can't be found in renderJs, you should firstly register in renderJs");

            }else {
                //找到，渲染自定义标签
                mpa_delivery(component, collection[i].parentNode, collection[i], contextController);
            }
        }else {
            //非自定义标签，深度解析
            renderHtml(collection[i].children,contextController);
        }
    }
}