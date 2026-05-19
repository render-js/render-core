import {loadStyle} from "../../loader/loader";
import {Component} from "../../../index";
import {get_theme_style, set_theme_style} from "../../recorder/table1/system_func_1";
import {get_style_library} from "../../recorder/table0/system_func_0";

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

        componentStyleList.set(styles[i].getAttribute("theme"), style_slot_func(styles[i].innerText, hashName(component.getName())));
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

        console.log("Don`t find this style!");

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
export function changeTheme(theme:string):void
{
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


/**
 * 给 CSS 中所有选择器添加 V-data 属性选择器
 * @param {string} cssText - 原始 CSS 字符串
 * @param {string} salt - 盐值
 * @returns {string} 处理后的 CSS 字符串
 */
/**
 * Simple synchronous string hash (djb2) — used to produce a unique salt per component name.
 */
export function hashName(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) - hash) + name.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(16);
}

export function style_slot_func(cssText:string, salt:string):string{
    if (!cssText || !salt) return cssText;

    // 正则匹配：选择器部分 { 声明部分 }
    // 注意：这里不处理嵌套规则（如 @media 内部的选择器），如果需要可以调整
    return cssText.replace(
        /([^{]+)(\{)/g,
        (match, selectors, brace) => {
            // 如果是 @ 开头的规则，不处理
            if (selectors.trim().startsWith('@')) {
                return match;
            }

            // 将每个选择器（以逗号分隔）都加上 [V-data="salt"]
            const newSelectors = selectors
                .split(',')
                .map((sel: string) => {
                    const trimmed = sel.trim();
                    if (!trimmed) return '';
                    return `${trimmed}[v-data="${salt}"]`;
                })
                .filter(s => s)
                .join(', ');

            return newSelectors + brace;
        }
    );
}