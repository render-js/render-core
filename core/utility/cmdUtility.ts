import {addLabel} from "./miscUtility";
import {resolver_event} from "../cmd/method/v-on";
import {resolver_html} from "../cmd/data/v-html";
import {resolver_txt} from "../cmd/data/v-txt";
import {resolver_model} from "../cmd/react/v-model";
import {resolver_bind} from "../cmd/property/v-bind";
import {Component} from "../../class/component/component";
import {ComponentController} from "../../class/component/componentController";
import {resolver_show} from "../cmd/justify/v-show";
import {resolver_render} from "../cmd/justify/v-render";
import {resolver_if} from "../cmd/justify/v-if";
import {resolver_switch} from "../cmd/justify/v-switch";
import {resolver_for_of} from "../cmd/loop/v-for";
import {extract_solt} from "../cmd/solt/v-solt";
import {resolver_expression} from "../cmd/data/v-el";
import {resolver_for_map} from "../cmd/loop/v-map";

/**
 * This function is used to resolver those commands which should be executed before mount.
 * @param tagTemplate
 * @param proto
 * @param controller
 */
export function cmdUtility(tagTemplate:Element, proto:Component, controller:ComponentController):void{
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children,proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children,proto.getMethods(),controller.proxyForMethods,controller.raw_data);
    //渲染html
    resolver_html(tagTemplate.children,controller.proxyForMethods,controller);
    //渲染text
    resolver_txt(tagTemplate.children,controller.proxyForMethods,controller);
    //绑定数据
    resolver_model(tagTemplate.children,controller.proxyForMethods);
    //渲染属性
    resolver_bind(tagTemplate.children,controller.proxyForMethods);
    //solt
    extract_solt(tagTemplate.children,controller);
}

/**
 * This function is used to resolver those commands which should be executed after mount.
 * @param templateSpace
 * @param proto
 * @param controller
 */
export function afterCmd(templateSpace:ParentNode, proto:Component, controller:ComponentController):void{
    //v-show
    resolver_show(templateSpace.children,controller.proxyForMethods);
    //v-render
    resolver_render(templateSpace.children,controller.proxyForMethods);
    //v-if
    resolver_if(templateSpace.children,controller.proxyForMethods);
    //v-switch
    resolver_switch(templateSpace.children,controller.proxyForMethods);
    //v-for-each
    resolver_for_map(templateSpace.children,controller.proxyForMethods);
    //v-for-of
    resolver_for_of(templateSpace.children,controller.proxyForMethods);
    //v-el
    resolver_expression(controller.root,controller.proxyForMethods,controller);
}