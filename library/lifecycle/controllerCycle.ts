import {Controller} from "../../class/controller/controller";
import {Component} from "../../class/component/component";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";
import {inject, injectComputed, injectMethod, injectWatcher} from "../../core/inject/inject";
import {getProxyObject} from "../../core/proxy/getProxy";
import {
    getCodeSpaceForCommit, getCodeSpaceForProperty,
    getCodeSpaceForPublish,
    getCommitMethod,
    getPublishMethod, getSetterMethod
} from "../../core/utility/injectUtility";

export function controllerCycleTypeOne(controller:Controller, proto:Component, child:Element, link:Controller | ApiController | PageController, tagTemplate:Element):void{
    //保持控制器模板对象
    controller.proto = proto;

    //复制原始数据对象到控制对象
    controller.raw_data = link.link.get(child.getAttribute("name"));

    //向raw_data中注入元数据
    inject(controller,tagTemplate);

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
    getCodeSpaceForProperty(controller.raw_data,getSetterMethod(controller))
}

export function controllerCycleTypeTwo(controller:Controller, proto:Component, child:Element, link:Controller | ApiController | PageController, tagTemplate:Element):void{
    //保持控制器模板对象
    controller.proto = proto;

    //复制原始数据对象到控制对象
    controller.raw_data = Object.create(proto.getData());

    //向raw_data中注入元数据
    inject(controller,tagTemplate);

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
    getCodeSpaceForProperty(controller.raw_data,getSetterMethod(controller))
}