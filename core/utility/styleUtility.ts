import {Component} from "../../class/component/component";
import {loadStyle} from "../loader/loader";
// @ts-ignore
import {sessionStorageEngin_read} from "render-status/read/read";

/**
 *
 * @param tag
 */
export function checkStyleLabel(tag:string):boolean
{
    //获取所有的style标签
    let styles:HTMLCollection = document.getElementsByTagName("style");

    //遍历标签，查看是否已经加载tag样式
    for (let i:number = 0; i < styles.length; i++)
    {
        if (styles[i].getAttribute("tag") === tag.toUpperCase())
            //样式已经加载
            return true;
    }
    //样式未加载
    return false;
}

/**
 *
 * @param component
 * @param styleLib
 */
export function themeStyle(component:Component,styleLib:Map<string, object>):void {

    let template:string = component.getTemplate();

    let dom:HTMLDivElement = document.createElement("div");

    dom.innerHTML = template;

    let styles:NodeListOf<HTMLStyleElement> = dom.getElementsByTagName("template")[0].content.querySelectorAll("style");

    let kk:Map<string, string> = new Map<string,string>()

    for (let i:number=0; i<styles.length; i++) {

        kk.set(styles[i].getAttribute("theme"),styles[i].innerText);
    }

    styleLib.set(component.getName().toUpperCase(),kk);
}

/**
 *
 * @param tag
 */
export function styleResolve(tag:string):void{

    // @ts-ignore
    let theme = window.context.getFiled("system_theme");

    if (Reflect.get(window,"styleLib").get(tag.toUpperCase()).get(theme) === undefined){

        console.log("tag:"+tag+" has no theme "+theme);

        if (Reflect.get(window,"styleLib").get(tag.toUpperCase()).get("default") === undefined){

            console.log("tag:"+tag+" has no theme "+"default");
        }else {

            loadStyle(tag,"default",Reflect.get(window,"styleLib").get(tag.toUpperCase()).get("default"));
        }

    }else {

        loadStyle(tag,theme,Reflect.get(window,"styleLib").get(tag.toUpperCase()).get(theme));

    }
}

/**
 *
 * @param theme
 */
export function reloadStyle(theme:string):void{

    Reflect.get(window,"styleLib").forEach(function (value,key){

        let styles:HTMLCollection = document.getElementsByTagName("style")

        for (let i:number = 0; i< styles.length; i++){

            if (styles[i].getAttribute("tag") === key){

                let style:HTMLStyleElement = document.createElement('style')

                if (value.get(theme)){
                    let text:Text = document.createTextNode(value.get(theme));

                    style.appendChild(text)

                    style.setAttribute("tag",key.toUpperCase());

                    style.setAttribute("theme",theme);

                    let head:HTMLHeadElement = document.getElementsByTagName('head')[0];

                    head.replaceChild(style,styles[i]);
                }
            }
        }
    })
}