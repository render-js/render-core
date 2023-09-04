import {Component} from "../../class/component/component";
import ApiComponent from "../../class/component/apiComponent";

export function getTemplate(proto:Component | ApiComponent):Element{
    //生成DOM
    let temp:HTMLDivElement = document.createElement("div");

    temp.innerHTML = proto.getTemplate();

    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];

    let content:DocumentFragment = template.content;

    //获得模板元素
    return content.querySelector("view");
}