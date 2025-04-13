import {ComponentController} from "../../proto/controller/ComponentController";
import {isUnKnown} from "../utility/checkUtility";
import {PageController} from "../../proto/controller/PageController";
import {init_render} from "./initRender";
import {post_render} from "./PostRender";
import {raw_render} from "./rawRender";
import {getTemplate} from "../utility/templateUtility";
import {styleResolve} from "../utility/styleUtility";
import {Component} from "render-refer";

//渲染自定义标签
export function delivery(proto: Component, parent: ParentNode, child:Element, link:ComponentController | PageController):void{

    //获得模板元素
    let tagTemplate:Element = getTemplate(proto);

    //注册当前解析元素
    Reflect.get(window,"context").crtTag = child;

    //解析样式
    styleResolve(proto.getName());

    //两种渲染方式
    if (child.hasAttribute("name"))
    {
        //需要保持状态的渲染
        if (link.link.has(child.getAttribute("name")))
        {
            //该name元素存在旧数据，是更新渲染
            init_render(proto,parent,child,link,tagTemplate);

        }else {
            //该name元素不存在旧数据，是第一次渲染
            post_render(proto,parent,child,link,tagTemplate);
        }
    }else {
        //不需要保持状态的渲染
        raw_render(proto,parent,child,link,tagTemplate);
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