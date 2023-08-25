import {Component} from "../../class/component";

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

export function themeStyle(component:Component,styleLib:Map<string, object>):void {
    let template = component.getTemplate();
    let dom = document.createElement("div");
    dom.innerHTML = template;

    let styles = dom.getElementsByTagName("template")[0].content.querySelectorAll("style");

    let kk = new Map<string,string>()
    for (let i=0; i<styles.length; i++) {
        kk.set(styles[i].getAttribute("theme"),styles[i].innerText);
    }
    styleLib.set(component.getName().toUpperCase(),kk);
}