import {
    addEventForUpdater,
    addInnerHtmlForUpdater,
    addInnerTextForUpdater,
    addLabelForUpdater,
    bindModelForUpdater,
    bindPropsForUpdate,
} from "../api/methods";

import {Controller} from "../../class/controller";

export function update(node:Element,updater:Controller):void{
    //获取raw对象
    let updateRawData:{} = updater.raw_data;

    //beforeRender
    let beforeRender = updater.owner.getBeforeRender().bind(updateRawData);
    beforeRender();

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = updater.owner.getTemplate();
    let template:ChildNode = temp.childNodes[0];
    // @ts-ignore
    let content = template.content;
    let main = content.children[0];

    //afterRender
    let afterRender = updater.owner.getAfterRender().bind(updateRawData);
    afterRender();

    //beforeUpdate
    let beforeUpdate = updater.owner.getBeforeUpdate().bind(updateRawData);
    beforeUpdate();

    //update actions
    addLabelForUpdater(main.children,updater.owner);
    addEventForUpdater(main.children,updater.owner,updater.proxyForMethods);
    addInnerHtmlForUpdater(main.children,updater.proxyForMethods);
    addInnerTextForUpdater(main.children,updater.proxyForMethods);
    bindPropsForUpdate(main.children,updater.proxyForMethods);

    //afterUpdate
    let afterUpdate =  updater.owner.getAfterUpdate().bind(updateRawData);
    afterUpdate();

    //beforeUnmount
    let beforeUnmount = updater.owner.getBeforeUnmount().bind(updateRawData);
    beforeUnmount();

    //mount
    while (node.hasChildNodes()){
        node.removeChild(node.firstChild);
    }
    while (main.hasChildNodes()){
        node.appendChild(main.firstChild);
    }

    //获取定位
    bindModelForUpdater(node.children,updater.proxyForMethods);
}