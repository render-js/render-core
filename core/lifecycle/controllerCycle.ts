import {ComponentController} from "../../proto/controller/ComponentController";
import {PageController} from "../../proto/controller/PageController";
import {inject, injectComputed, injectMethod, injectWatcher} from "../inject/inject";
import {getProxyObject} from "../proxy/getProxy";
import {
    getCodeSpaceForCommit,
    getCodeSpaceForPublish,
    getCommitMethod, getGetCodeSpaceForProperty, getGetterMethod,
    getPublishMethod, getSetCodeSpaceForProperty, getSetterMethod
} from "../utility/injectUtility";
import {dataInject} from "../utility/dataUtility";
import {Component} from "render-refer";

/**
 * This function is used to initiate the component controller object.
 * @param controller
 * @param proto
 * @param child
 * @param link
 * @param tagTemplate
 */
export function controllerCycleTypeOne(controller:ComponentController, proto:Component, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{

    //复制原始数据对象到控制对象
    controller.raw_data = link.link.get(child.getAttribute("name"));

    cycleBridge(controller, proto, child, link, tagTemplate);
}

export function controllerCycleTypeTwo(controller:ComponentController, proto:Component, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{

    //复制原始数据对象到控制对象
    controller.raw_data = dataInject(proto.getData());

    cycleBridge(controller, proto, child, link, tagTemplate);

}

function cycleBridge(controller:ComponentController, proto:Component, child:Element, link:ComponentController | PageController, tagTemplate:Element):void{
    //保持控制器模板对象
    controller.proto = proto;

    controller.mode = proto.getMode();

    //向raw_data中注入元数据
    inject(controller);

    //数据渲染代理对象
    controller.proxyForMethods = getProxyObject(controller.raw_data, controller);

    injectComputed(controller,proto);

    injectWatcher(controller,proto);

    injectMethod(controller,proto);

    //注入commit
    getCodeSpaceForCommit(controller.raw_data,getCommitMethod(link));

    //注入receiver
    getCodeSpaceForPublish(controller.raw_data,getPublishMethod(controller));

    //注入setter
    getSetCodeSpaceForProperty(controller.raw_data,getSetterMethod(controller));

    //注入getter
    getGetCodeSpaceForProperty(controller.raw_data,getGetterMethod(controller));
}