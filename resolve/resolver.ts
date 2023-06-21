import {Component} from "../class/component";
import {renderComponent} from "../core/render/render";

export function resolver(element:Element,tagLib:Map<string, Component>):void
{
    renderComponent(tagLib.get(element.nodeName.toUpperCase()),element.parentNode,element,tagLib.get(element.nodeName).getName(),tagLib)
}