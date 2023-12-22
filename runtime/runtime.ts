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
            let component:Component = Reflect.get(window,"tagLib").get(collection[i].nodeName.toUpperCase());

            if (component === undefined){

                console.error(collection[i].nodeName.toUpperCase()+" can't be found in renderJs, you should firstly register in renderJs");
            }else {
                //自定义标签
                Render(component,collection[i].parentNode,collection[i],link)
            }
        }else {
            //非自定义标签，深度解析
            renderHtml(collection[i].children,link);
        }
    }
}