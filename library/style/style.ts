// @ts-ignore
import {sessionStorageEngin_read} from "render-status/read/read";
import {loadStyle} from "../loader/loader";

export function styleResolve(tag:string):void{

    let theme = sessionStorageEngin_read("theme")

    if (Reflect.get(window,"styleLib").get(tag.toUpperCase()).get(theme) === undefined){

        console.log("tag:"+tag+"has no them"+theme);

    }else {

        loadStyle(tag,theme,Reflect.get(window,"styleLib").get(tag.toUpperCase()).get(theme));

    }
}

export function reloadStyle(theme:string):void{

    Reflect.get(window,"styleLib").forEach(function (value,key){

        let styles:HTMLCollection = document.getElementsByTagName("style")

        for (let i:number = 0; i< styles.length; i++){

            if (styles[i].getAttribute("tag") === key){

                let style:HTMLStyleElement = document.createElement('style')

                let text:Text = document.createTextNode(value.get(theme));

                style.appendChild(text)

                style.setAttribute("tag",key.toUpperCase());

                style.setAttribute("theme",theme);

                let head:HTMLHeadElement = document.getElementsByTagName('head')[0];

                head.replaceChild(style,styles[i]);
            }
        }
    })
}