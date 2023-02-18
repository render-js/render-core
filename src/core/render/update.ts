import {alterNode, findComponent, findLiveComponent} from "../action/action";
import {
    addEventForUpdater,
    addInnerHtmlForUpdater,
    addInnerTextForUpdater,
    addLabelForUpdater,
    bindModelForUpdater,
    bindPropsForUpdate,
    collectComponentsForUpdater
} from "./methods";
import {VPage} from "../../class/page";
import {bindProps} from "../action/utility";

export function update(node:ChildNode,updater:VPage):void{
    //获取raw对象
    let updateRawData = updater["raw"];

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
    addEventForUpdater(main.children,updater.owner,updater.data);
    addInnerHtmlForUpdater(main.children,updater.data);
    addInnerTextForUpdater(main.children,updater.data);
    bindPropsForUpdate(main.children,updater.data);
    findLiveComponent(main.children,Object.getOwnPropertyNames(updater.owner.getComponents()),updater.owner);

    //afterUpdate
    let afterUpdate =  updater.owner.getAfterUpdate().bind(updateRawData);
    afterUpdate();

    //alter
    updater.owner.collection.forEach(function (value, key) {
        let ks = main.getElementsByTagName(key)
        for (let i=0;i<ks.length;i++){
            alterNode(ks[i],value[i])
        }
    })
    // @ts-ignore
    let cpn = node.parentNode.getAttribute("cpn")
    node.parentNode.replaceChild(main,node)
    main.setAttribute("cpn",cpn)

    //获取定位
    bindModelForUpdater(main.children,updater.data);

    //beforeUnmount
    let beforeUnmount = updater.owner.getBeforeUnmount().bind(updateRawData);
    beforeUnmount();

    //beforeMount
    let beforeMount = updater.owner.getBeforeMount().bind(updateRawData);
    beforeMount();

    //Mount
    updater.root = main

    //collector
    collectComponentsForUpdater(document.getElementById("app"),updater.owner)
}

export function updateForComponent(node:ChildNode,updater:VPage):void{
    //获取raw对象
    let updateRawData = updater["raw"];

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
    addEventForUpdater(main.children,updater.owner,updater.data);
    addInnerHtmlForUpdater(main.children,updater.data);
    addInnerTextForUpdater(main.children,updater.data);
    bindPropsForUpdate(main.children,updater.data);

    //afterUpdate
    let afterUpdate =  updater.owner.getAfterUpdate().bind(updateRawData);
    afterUpdate();

    // @ts-ignore
    let cpn = node.parentNode.getAttribute("cpn")
    node.parentNode.replaceChild(main,node)
    main.setAttribute("cpn",cpn)

    //获取定位
    bindModelForUpdater(main.children,updater.data);

    //beforeUnmount
    let beforeUnmount = updater.owner.getBeforeUnmount().bind(updateRawData);
    beforeUnmount();

    //beforeMount
    let beforeMount = updater.owner.getBeforeMount().bind(updateRawData);
    beforeMount();

    //Mount
    updater.root = main;

    findComponent(main.children,Object.getOwnPropertyNames(updater.owner.getComponents),updater.owner);
}