import {renderComponent} from "../render/render";
import {Component} from "../../class/component";

export function alterNode(first:ChildNode,two:ChildNode):void{
    first.parentNode.replaceChild(two,first)
}

export function isUnKnown(element:string):boolean
{
    return false;
}