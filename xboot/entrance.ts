import {Component} from "../index";
import {themeStyle} from "../system/utility/style/styleUtility";
import {renderHtml} from "./renderProcessor";
import {get_context_controller, get_style_library, get_tag_library} from "../system/recorder/table0/system_func_0";
import {router_listener_with_router, router_listener_without_router} from "../kernel/router/router";

/**
 * The entrance of weave
 * @param root
 */
export function render_for_weave(root?:string):void
{
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

/**
 * The entrance of listen
 */
export function render_for_listen():void
{
    get_tag_library().forEach(function (component:Component):void
        {
            themeStyle(component, get_style_library());
        }
    );
    router_listener_with_router(document.querySelector("webview"));
}

/**
 * The entrance of render
 * @param component
 * @param mounter
 */
export function render_for_render(component: Component, mounter: string):void
{
    get_tag_library().forEach(function (component:Component):void
        {
            themeStyle(component, get_style_library());
        }
    );
    router_listener_without_router(component, document.getElementById(mounter));
}