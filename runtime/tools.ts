import {Component} from "../class/component/component";
import {RenderJS} from "../index";
import {themeStyle} from "../core/utility/styleUtility";
import {renderHtml} from "./runtime";
import {changeApplicationTheme, changeSessionTheme, changeTagTheme} from "../func/Theme";

/**
 * This function is used to save the prototype component class in the window object.
 * So, you can hava a tip that we custom a property named 'tagLib' in the window object.
 * @param application
 * @param component
 */
export function registerTagLib(application:RenderJS, component:Component | Component[]):void{

    //if the input parameter is an instance of Component,do the code block.
    if (component instanceof Component) {

        if (!application.tagLib.has(component.getName().toUpperCase()))
        {
            application.tagLib.set(component.getName().toUpperCase(),component)
        }else {
            console.warn("The Tag:"+component.getName().toUpperCase()+"has been registered!")
        }
    }else {
        //if the input parameter is an array of Component,do the code block.
        component.forEach(component =>{
            if (!application.tagLib.has(component.getName().toUpperCase()))
            {
                application.tagLib.set(component.getName().toUpperCase(),component)
            }else {
                console.warn("The Tag:"+component.getName().toUpperCase()+"has been registered!")
            }
        })
    }
}

/**
 * The entrance of render
 * @param renderjs
 */
export function render(renderjs:RenderJS):void{

    //获取styleLib对象
    renderjs.tagLib.forEach(function (component:Component):void{

        themeStyle(component, renderjs.styleLib);
    })

    renderjs.configContext({});

    renderjs.configApp({});

    renderjs.registerElements("changeTagTheme",changeTagTheme)

    renderjs.registerElements("changeSessionTheme",changeSessionTheme)

    renderjs.registerElements("changeApplicationTheme",changeApplicationTheme)

    //开始渲染
    renderHtml(document.body.children,renderjs.page);
}