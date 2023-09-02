import {checkStyleLabel} from "../../core/utility/styleUtility";

/**
 * 加载自定义标签样式
 * @param tag
 * @param theme
 * @param styleData
 */
export function loadStyle(tag:string,theme:string,styleData:string):void {

    if (!checkStyleLabel(tag)){

        let style:HTMLStyleElement = document.createElement('style')

        let text:Text = document.createTextNode(styleData)

        style.appendChild(text)

        style.setAttribute("tag",tag.toUpperCase());

        style.setAttribute("theme",theme);

        let head:HTMLHeadElement = document.getElementsByTagName('head')[0];

        head.appendChild(style)
    }
}