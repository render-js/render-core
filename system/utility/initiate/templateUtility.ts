import {Component} from "../../index";

/**
 * @param proto
 */
export function getTemplate(proto:Component):Element
{
    let temp:HTMLDivElement = document.createElement("div");
        temp.innerHTML = proto.getTemplate();

    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let content:DocumentFragment = template.content;

    return content.querySelector("view");
}