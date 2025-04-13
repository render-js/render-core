import {loadStyle} from "../loader/loader";
import {Component} from "render-refer";

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
export function themeStyle(component:Component, styleLib:Map<string, object>):void {

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

    let theme = sessionStorage.getItem("theme_style");

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

// /**
//  * 从url中获取主题参数
//  * @param name
//  */
// function getUrlParam(name:string):string {
//     //构造一个含有目标参数的正则表达式对象
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     //匹配目标参数
//     var r = window.location.search.substr(1).match(reg);
//     //返回参数值
//     if(r != null) {
//         return decodeURI(r[2]);
//     }
//     return undefined;
// }


/**
 *
 * @param tag
 * @param theme
 */
export function changeStyle(tag:string, theme:string):void{

    let styleTxt = Reflect.get(window,"styleLib").get(tag.toUpperCase()).get(theme);

    if (styleTxt === undefined){

        console.log("Dont`t find this style!");

    }else {
        let style:HTMLStyleElement = document.createElement('style')

        let text:Text = document.createTextNode(styleTxt);

        style.appendChild(text)

        style.setAttribute("tag",tag.toUpperCase());

        style.setAttribute("theme",theme);

        let head:HTMLHeadElement = document.getElementsByTagName('head')[0];

        let target:Element = head.querySelector("style"+"[tag="+tag.toUpperCase()+"]");

        head.replaceChild(style,target);
    }
}

/**
 *
 * @param theme
 */
export function changeTheme(theme:string):void{

    Reflect.get(window,"styleLib").forEach((value: { get: (arg0: string) => string; }, key: string) => {

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

    sessionStorage.setItem("theme_style",theme);
}