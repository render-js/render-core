import {Controller} from "../../class/controller";
import {Component} from "../../class/component";
import {isUnKnown} from "../utility/checkUtility";
import {ApiController} from "../../class/apiController";
import {getTemplate} from "../../library/template/template";
import {styleResolve} from "../../library/style/style";
import {PageController} from "../../class/pageController";
import {init_render, post_render, raw_render} from "../../library/render/render";

//渲染自定义标签
export function Render(proto: Component, parent: ParentNode, child:Element, link:Controller | ApiController | PageController):void{
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
export function findComponent(collection:HTMLCollection, link:Controller | ApiController | PageController):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            Render(Reflect.get(window,"tagLib").get(collection[i].nodeName.toUpperCase()), collection[i].parentNode, collection[i], link);
        }else {
            findComponent(collection[i].children,link);
        }
    }
}