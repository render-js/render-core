import {loadStyle} from "../loader/loader";
import {Component} from "../../index";
import {get_theme_style, set_theme_style} from "../recorder/table1/system_func_1";
import {get_style_library} from "../recorder/table0/system_func_0";

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
 * Here is the function go get all styles associated with the tag component.
 * @param component
 * @param styleLib
 */
export function themeStyle(component:Component, styleLib:Map<string, object>):void {

    let template:string = component.getTemplate();

    let dom:HTMLDivElement = document.createElement("div");

    dom.innerHTML = template;

    let styles:NodeListOf<HTMLStyleElement> = dom.getElementsByTagName("template")[0].content.querySelectorAll("style");

    let componentStyleList:Map<string, string> = new Map<string,string>()

    for (let i:number=0; i<styles.length; i++) {

        componentStyleList.set(styles[i].getAttribute("theme"),styles[i].innerText);
    }

    styleLib.set(component.getName().toUpperCase(),componentStyleList);
}

/**
 * Here is the function to resolve
 * @param tag
 * @param styleLib
 */
export function loader_tag_style(tag:string, styleLib:Map<string, Map<string, string>>):void{

    //获取到启动样式
    let theme:string = get_theme_style();

    if (styleLib.get(tag.toUpperCase())){
        if (styleLib.get(tag.toUpperCase()).get(theme) === undefined){

            console.log("tag:"+tag+" has no theme "+theme);

            if (styleLib.get(tag.toUpperCase()).get("default") === undefined){

                console.log("tag:"+tag+" has no theme "+"default");
            }else {

                loadStyle(tag,"default",styleLib.get(tag.toUpperCase()).get("default"));
            }

        }else {

            loadStyle(tag,theme,styleLib.get(tag.toUpperCase()).get(theme));
        }
    }
}


/**
 *
 * @param tag
 * @param theme
 */
export function changeStyle(tag:string, theme:string):void{

    let styleTxt = get_style_library().get(tag.toUpperCase()).get(theme);

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

    get_style_library().forEach((value: { get: (arg0: string) => string; }, key: string) => {

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

    set_theme_style(theme);
}