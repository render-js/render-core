import {isUnKnown} from "../core/utility/checkUtility";
import {PageController} from "../class/controller/pageController";
import {Render} from "../core/render/delivery";
import {Component} from "../class/component/component";

/**
 *
 * @param collection
 * @param link
 */
export function renderHtml(collection:HTMLCollection, link:PageController):void
{
    //遍历element节点，判断是否为自定义标签
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName.toUpperCase()))
        {
            //从tag库中获取该组件的定义
            let component:Component = Reflect.get(window,"tagLib").get(collection[i].nodeName.toUpperCase());

            if (component === undefined){

                //没有找到定义，向控制台输出警告
                console.error(collection[i].nodeName.toUpperCase()+" can't be found in renderJs, you should firstly register in renderJs");

            }else {
                //找到，渲染自定义标签
                Render(component,collection[i].parentNode,collection[i],link)
            }
        }else {
            //非自定义标签，深度解析
            renderHtml(collection[i].children,link);
        }
    }
}