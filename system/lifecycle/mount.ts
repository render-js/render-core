import {ContextController} from "../define/ContextController";
import {Component} from "../../index";

/**
 * This function is used to mount the dom to the html document.
 * @param controller
 * @param proto
 * @param parent
 * @param child
 * @param tagTemplate
 */
export function archive_mount(controller:ContextController, proto:Component, parent:ParentNode, child:ChildNode, tagTemplate:Element):void{

    //mount
    let renderSpace:Element = document.createElement("div");

    //给box添加样式
    renderSpace.setAttribute("style",proto.getBoxStyle());

    //指定渲染空间
    controller.componentAttachedRootElement = renderSpace;

    //开始渲染
    parent.replaceChild(renderSpace,child);

    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }
}

/**
 * Insert elements without div element
 * @param root
 */
export function extract_mount(root:ContextController):void{

    let begin:HTMLElement = document.createElement("div");
    begin.setAttribute("anchor","begin");
    begin.setAttribute("style","display:none");

    root.componentAttachedRootElement.parentNode.insertBefore(begin,root.componentAttachedRootElement);

    root.begin = begin;

    while (root.componentAttachedRootElement.hasChildNodes()){

        //插入元素到根之前
        root.componentAttachedRootElement.parentNode.insertBefore(root.componentAttachedRootElement.firstChild,root.componentAttachedRootElement);
    }

    let parent:ParentNode = root.componentAttachedRootElement.parentNode;

    // @ts-ignore
    root.anchor = root.componentAttachedRootElement;

    root.anchor.setAttribute("anchor","end");

    root.anchor.setAttribute("style","display:none");

    root.componentAttachedRootElement = parent;
}

export function mountForUpdate(tagTemplate:Element):Element{

    let renderSpace:Element = document.createElement("div");
    renderSpace.setAttribute("anchor","end");

    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }

    return renderSpace;
}