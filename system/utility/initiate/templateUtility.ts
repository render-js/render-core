import {Component} from "../../../index";

/**
 * This func used to get the view tag from the template
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