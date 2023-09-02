import {Controller} from "../../class/controller/controller";
import {Component} from "../../class/component/component";

export function mount(controller:Controller, proto:Component, parent:ParentNode, child:Element, tagTemplate:Element):void{
    //mount
    let renderSpace:Element = document.createElement("div");
    //给box添加样式
    renderSpace.setAttribute("style",proto.getBoxStyle());
    //指定渲染空间
    controller.root = renderSpace;
    //开始渲染
    parent.replaceChild(renderSpace,child);
    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }
}