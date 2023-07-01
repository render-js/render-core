import {Controller} from "../../class/controller";
import {resolver_event} from "../cmd/v-on";
import {resolver_html} from "../cmd/v-html";
import {resolver_txt} from "../cmd/v-txt";
import {resolver_bind} from "../cmd/v-bind";
import {renderHtml} from "../../runtime/runtime";
import {addLabel, bindModelForUpdater} from "../utility/miscUtility";

export function updateRender(updater:Controller):void{
    //获取raw对象
    let updateRawData:{} = updater.raw_data;

    //beforeRender
    let beforeRender = updater.proto.getBeforeRender().bind(updateRawData);
    beforeRender();

    //生成DOM
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = updater.proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let main:Element = template.content.children[0];

    //beforeUpdate
    let beforeUpdate = updater.proto.getBeforeUpdate().bind(updateRawData);
    beforeUpdate();

    //updateRender actions
    addLabel(main.children,updater.proto.getName());

    resolver_event(main.children,updater.proto.getMethods(),updater.proxyForMethods);

    resolver_html(main.children,updater.proxyForMethods);

    resolver_txt(main.children,updater.proxyForMethods);

    resolver_bind(main.children,updater.proxyForMethods);

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
    while (main.hasChildNodes()){
        updater.root.appendChild(main.firstChild);
    }

    //afterRender
    let afterRender = updater.proto.getAfterRender().bind(updateRawData);
    afterRender();

    //获取定位
    bindModelForUpdater(updater.root.children,updater.proxyForMethods);

    //深度渲染
    renderHtml(updater.root.children,Reflect.get(window,"tagLib"));
}