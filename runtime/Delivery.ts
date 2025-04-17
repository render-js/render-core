import {ComponentController} from "../../proto/controller/ComponentController";
import {isUnKnown} from "../../core/utility/checkUtility";
import {PageController} from "../../proto/controller/PageController";
import {init_render} from "./initRender";
import {post_render} from "./PostRender";
import {raw_render} from "./rawRender";
import {getTemplate} from "../../core/utility/templateUtility";
import {styleResolve} from "../../core/utility/styleUtility";
import {Component} from "../../../render-refer/dist";

//渲染自定义标签
export function delivery(protoTypeComponent: Component, componentAttachedRootElement: ParentNode, child:Element, controller:ComponentController | PageController):void{

    //获得模板元素
    let tagTemplate:Element = getTemplate(protoTypeComponent);

    //注册当前解析元素
    Reflect.get(window,"context").crtTag = child;

    //解析样式
    styleResolve(protoTypeComponent.getName());

    //两种渲染方式
    if (child.hasAttribute("name"))
    {
        //需要保持状态的渲染
        if (controller.lazyComponent.has(child.getAttribute("name")))
        {
            //该元素存在旧数据，是更新渲染
            init_render(protoTypeComponent,componentAttachedRootElement,child,controller,tagTemplate);

        }else {
            //该元素不存在旧数据，是第一次渲染
            post_render(protoTypeComponent,componentAttachedRootElement,child,controller,tagTemplate);
        }
    }else {
        //不需要保持状态的渲染
        raw_render(protoTypeComponent,componentAttachedRootElement,child,controller,tagTemplate);
    }

}

//拓展标签深度渲染
export function findComponent(collection:HTMLCollection, link:ComponentController | PageController):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            delivery(Reflect.get(window,"tagLib").get(collection[i].nodeName.toUpperCase()), collection[i].parentNode, collection[i], link);
        }else {
            findComponent(collection[i].children,link);
        }
    }
}