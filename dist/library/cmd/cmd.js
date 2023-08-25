import { addLabel } from "../../core/utility/miscUtility";
import { resolver_event } from "../../core/cmd/v-on";
import { resolver_html } from "../../core/cmd/v-html";
import { resolver_txt } from "../../core/cmd/v-txt";
import { resolver_model } from "../../core/cmd/v-model";
import { resolver_bind } from "../../core/cmd/v-bind";
export function cmd(tagTemplate, proto, controller) {
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children, proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children, proto.getMethods(), controller.proxyForMethods);
    //渲染html
    resolver_html(tagTemplate.children, controller.proxyForMethods);
    //渲染text
    resolver_txt(tagTemplate.children, controller.proxyForMethods);
    //绑定数据
    resolver_model(tagTemplate.children, controller.proxyForMethods);
    //渲染属性
    resolver_bind(tagTemplate.children, controller.proxyForMethods);
}
export function cmdForUpdate(tagTemplate, proto, controller) {
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children, proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children, proto.getMethods(), controller.proxyForMethods);
    //渲染html
    resolver_html(tagTemplate.children, controller.proxyForMethods);
    //渲染text
    resolver_txt(tagTemplate.children, controller.proxyForMethods);
    //绑定数据
    resolver_model(tagTemplate.children, controller.proxyForMethods);
}
