import {checkStyleLabel} from "../../core/utility/styleUtility";

export function loadStyle(data:string,tag:string):void {

    if (!checkStyleLabel(tag)){

        let style:HTMLStyleElement = document.createElement('style')

        let text:Text = document.createTextNode(data)

        style.appendChild(text)

        style.setAttribute("tag",tag.toUpperCase());

        let head:HTMLHeadElement = document.getElementsByTagName('head')[0];

        head.appendChild(style)
    }
}