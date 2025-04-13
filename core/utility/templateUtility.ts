import {Component} from "render-refer";

/**
 * @param proto
 */
export function getTemplate(proto:Component):Element{
    //生成DOM
    let temp:HTMLDivElement = document.createElement("div");

    temp.innerHTML = proto.getTemplate();

    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];

    let content:DocumentFragment = template.content;

    //获得模板元素
    return content.querySelector("view");
}