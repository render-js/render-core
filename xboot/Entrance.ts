import {Component} from "../index";
import {themeStyle} from "../system/utility/styleUtility";
import {renderHtml} from "./RenderProcessor";
import {get_context_controller, get_style_library, get_tag_library} from "../system/recorder/table0/system_func_0";
import {router_listener_with_router, router_listener_without_router} from "../system/router/router";

/**
 * The entrance of render
 * @param root
 */
export function render_for_mpa(root:string):void{

    //获取styleLib对象
    get_tag_library().forEach(function (component:Component):void{
        themeStyle(component, get_style_library());
    })

    if(root == null){
        //开始渲染
        get_context_controller().componentAttachedRootElement = document.body;
        renderHtml(document.children, get_context_controller());
    }else {

        let mountPoint:Element = document.getElementById(root);

        if (mountPoint == null){
            get_context_controller().componentAttachedRootElement = document.body;
            //开始渲染
            console.warn("Mount point not found");
            console.warn("Mount point was selected to body");
            renderHtml(document.body.children, get_context_controller());
        }else {
            //开始渲染
            get_context_controller().componentAttachedRootElement = mountPoint;
            renderHtml(mountPoint.children, get_context_controller());
        }
    }
}

export function render_for_spa(component?: Component):void{

    get_tag_library().forEach(function (component:Component):void
        {
            themeStyle(component, get_style_library());
        }
    )

    if (component == null)
        router_listener_with_router(document.querySelector("webview"));
    else
        router_listener_without_router(component, document.querySelector("webview"));
}