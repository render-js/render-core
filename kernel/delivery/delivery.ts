import {ContextController} from "../../system/define/ContextController";
import {isUnKnown} from "../../system/utility/checkUtility";
import {get_tag_library} from "../../system/recorder/table0/system_func_0";
import {init_renderer} from "../renderer/initRender";
import {post_renderer} from "../renderer/postRender";
import {raw_renderer} from "../renderer/rawRender";
import {Component} from "../../index";
import {renderHtml} from "../../xboot/RenderProcessor";


export function spa_delivery(protoTypeComponent: Component, componentAttachedRootElement: ParentNode, child:Element, parentController:ContextController):void
{
    raw_renderer(protoTypeComponent,componentAttachedRootElement,child,parentController);
}

export function mpa_delivery(protoTypeComponent: Component, componentAttachedRootElement: ParentNode, child:Element, parentController:ContextController):void
{
    //两种渲染方式
    if (child.hasAttribute("name"))
    {
        //需要保持状态的渲染
        if (parentController.lazyComponent.has(child.getAttribute("name")))
        {
            //该元素存在旧数据，是更新渲染
            init_renderer(protoTypeComponent,componentAttachedRootElement,child,parentController);

        }else {

            //该元素不存在旧数据，是第一次渲染
            post_renderer(protoTypeComponent,componentAttachedRootElement,child,parentController);
        }
    }else {

        if (isUnKnown(child.nodeName.toUpperCase()))
        {
            //从tag库中获取该组件的定义
            let component:Component = get_tag_library().get(child.nodeName.toUpperCase());

            if (!component){

                //没有找到定义，向控制台输出警告
                console.error(child.nodeName.toUpperCase()+" can't be found in renderJs, you should firstly register in renderJs");

            }else {
                //找到，渲染自定义标签
                raw_renderer(protoTypeComponent,componentAttachedRootElement,child,parentController);
            }
        }else {
            //非自定义标签，深度解析
            renderHtml(child.children,parentController);
        }
    }

}

//拓展标签深度渲染
export function findComponent(collection:HTMLCollection, parentController:ContextController):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            mpa_delivery(get_tag_library().get(collection[i].nodeName.toUpperCase()), collection[i].parentNode, collection[i], parentController);
        }else {
            findComponent(collection[i].children,parentController);
        }
    }
}