import {Controller} from "../../class/controller";
import {resolver_event} from "../cmd/v-on";
import {resolver_html} from "../cmd/v-html";
import {resolver_txt} from "../cmd/v-txt";
import {resolver_bind} from "../cmd/v-bind";
import {addLabel, bindModelForUpdater} from "../utility/miscUtility";
import {depthFindComponent} from "./depthRender";

export function updateRender(updater:Controller):void{
    //生成DOM
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = updater.proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let tagTemplate:Element = template.content.children[0];

    let updateRawData:{} = updater.proxyForMethods;

    //beforeRender
    let beforeRender = updater.proto.getBeforeRender().bind(updateRawData);
    beforeRender();

    //beforeUpdate
    let beforeUpdate = updater.proto.getBeforeUpdate().bind(updateRawData);
    beforeUpdate();

    //updateRender actions
    addLabel(tagTemplate.children,updater.proto.getName());

    resolver_event(tagTemplate.children,updater.proto.getMethods(),updater.proxyForMethods);

    resolver_html(tagTemplate.children,updater.proxyForMethods);

    resolver_txt(tagTemplate.children,updater.proxyForMethods);

    resolver_bind(tagTemplate.children,updater.proxyForMethods);

    //afterUpdate
    let afterUpdate =  updater.proto.getAfterUpdate().bind(updateRawData);
    afterUpdate();

    //beforeUnmount
    let beforeUnmount = updater.proto.getBeforeUnmount().bind(updateRawData);
    beforeUnmount();

    //unmount
    while (updater.root.hasChildNodes()){
        updater.root.removeChild(updater.root.firstChild);
    }

    //beforeMount
    let beforeMount = updater.proto.getBeforeMount().bind(updateRawData);
    beforeMount();

    //mount
    while (tagTemplate.hasChildNodes()){
        updater.root.appendChild(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = updater.proto.getAfterRender().bind(updateRawData);
    afterRender();

    //获取定位
    bindModelForUpdater(updater.root.children,updater.proxyForMethods);

    //深度渲染
    depthFindComponent(updater.root.children,Reflect.get(window,"tagLib"),updater);
}