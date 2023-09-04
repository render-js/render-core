import {addLabel} from "../../core/utility/miscUtility";
import {resolver_event} from "../../core/cmd/v-on";
import {resolver_html} from "../../core/cmd/v-html";
import {resolver_txt} from "../../core/cmd/v-txt";
import {resolver_model} from "../../core/cmd/v-model";
import {resolver_bind} from "../../core/cmd/v-bind";
import {Component} from "../../class/component/component";
import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import ApiComponent from "../../class/component/apiComponent";
import {resolver_show} from "../../core/cmd/v-show";
import {resolver_render} from "../../core/cmd/v-render";
import {resolver_if} from "../../core/cmd/v-if";
import {resolver_switch} from "../../core/cmd/v-switch";
import {resolver_for_each, resolver_for_of} from "../../core/cmd/v-for";
import {extract_solt} from "../../core/cmd/v-solt";
import {express_langulage} from "../../core/cmd/v-el";

export function cmd(tagTemplate:Element,proto:Component | ApiComponent,controller:Controller | ApiController):void{
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children,proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children,proto.getMethods(),controller.proxyForMethods);
    //渲染html
    resolver_html(tagTemplate.children,controller.proxyForMethods);
    //渲染text
    resolver_txt(tagTemplate.children,controller.proxyForMethods);
    //绑定数据
    resolver_model(tagTemplate.children,controller.proxyForMethods);
    //渲染属性
    resolver_bind(tagTemplate.children,controller.proxyForMethods);
    //solt
    extract_solt(tagTemplate.children,controller);
}

export function afterCmd(templateSpace:ParentNode, proto:Component | ApiComponent, controller:Controller | ApiController):void{
    //v-show
    resolver_show(templateSpace.children,controller.proxyForMethods);
    //v-render
    resolver_render(templateSpace.children,controller.proxyForMethods);
    //v-if
    resolver_if(templateSpace.children,controller.proxyForMethods);
    //v-switch
    resolver_switch(templateSpace.children,controller.proxyForMethods);
    //v-for-each
    resolver_for_each(templateSpace.children,controller.proxyForMethods);
    //v-for-of
    resolver_for_of(templateSpace.children,controller.proxyForMethods);
    //v-el
    express_langulage(controller.root,controller.proxyForMethods);
}

export function cmdForUpdate(tagTemplate:Element,proto:Component,controller:Controller | ApiController):void{
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children,proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children,proto.getMethods(),controller.proxyForMethods);
    //渲染html
    resolver_html(tagTemplate.children,controller.proxyForMethods);
    //渲染text
    resolver_txt(tagTemplate.children,controller.proxyForMethods);
    //绑定数据
    resolver_model(tagTemplate.children,controller.proxyForMethods);
    //v-show
    resolver_show(tagTemplate.children,controller.proxyForMethods);
    //v-render
    resolver_render(tagTemplate.children,controller.proxyForMethods);
}