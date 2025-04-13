import {ComponentController} from "../../proto/controller/ComponentController";
import {Component} from "render-refer";
/**
 * This function is used to mount the dom to the html document.
 * @param controller
 * @param proto
 * @param parent
 * @param child
 * @param tagTemplate
 */
export function mount(controller:ComponentController, proto:Component, parent:ParentNode, child:Element, tagTemplate:Element):void{
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

/**
 * insert elements without div elment
 * @param root
 */
export function unBox(root:ParentNode):void{
    while (root.hasChildNodes()){
        root.parentNode.insertBefore(root.firstChild,root);
    }
    root.parentNode.removeChild(root);
}