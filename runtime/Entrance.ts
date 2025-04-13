import {RenderJS} from "../index";
import {themeStyle} from "../core/utility/styleUtility";
import {renderHtml} from "./RenderProcessor";
import {Component} from "render-refer";

/**
 * The entrance of render
 * @param renderJs
 */
export function render(renderJs:RenderJS):void{

    //获取styleLib对象
    renderJs.tagLib.forEach(function (component:Component):void{

        themeStyle(component, renderJs.styleLib);
    })

    //开始渲染
    renderHtml(document.body.children, renderJs.page);
}