import {Controller} from "../../class/controller";
import {getCodeSpaceForCommit, getCodeSpaceForPublish, getCommitMethod, getPublishMethod
} from "../../core/utility/injectUtility";
import {getProxyObject} from "../../core/proxy/getProxy";
import {Component} from "../../class/component";
import {ApiController} from "../../class/apiController";
import {PageController} from "../../class/pageController";
import {findComponent} from "../../core/render/initRender";
import {inject, injectComputed, injectMethod, injectProps, injectWatcher} from "../inject/inject";
import {cmd} from "../cmd/cmd";

export function init_render(proto:Component,parent:ParentNode,child:Element,link:Controller | ApiController | PageController,tagTemplate:Element):void{
    //获取控制对象
    let controller:Controller = new Controller();

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

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //解析指令
    cmd(tagTemplate,proto,controller);

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    let renderSpace:Element = document.createElement("div");
    //给box添加样式
    renderSpace.setAttribute("style",proto.getBoxStyle());
    //指定渲染空间
    controller.root = renderSpace;
    //开始渲染
    parent.replaceChild(renderSpace,child);
    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    injectProps(controller,tagTemplate);

    //将本控制对象保存到父控制对象的发布数组中
    link.to.push(controller)

    //将执行空间保存到父控制对象
    link.link.set(child.getAttribute("name"),controller.raw_data);

    //深度渲染
    findComponent(tagTemplate.children,controller);
}

export function post_render(proto:Component,parent:ParentNode,child:Element,link:Controller | ApiController | PageController,tagTemplate:Element):void{
    //获取控制对象
    let controller:Controller = new Controller();

    //保持控制器模板对象
    controller.proto = proto;

    //复制原始数据对象到控制对象
    controller.raw_data = Object.create(proto.getData());

    //向raw_data中注入元数据
    inject(controller,tagTemplate);

    //保持数据代理对象
    controller.proxyForMethods = getProxyObject(controller.raw_data, controller);

    injectComputed(controller,proto);

    injectWatcher(controller,proto);

    injectMethod(controller,proto);

    //注入commit
    getCodeSpaceForCommit(controller.raw_data,getCommitMethod(link));
    //注入receiver
    getCodeSpaceForPublish(controller.raw_data,getPublishMethod(controller));

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //解析指令
    cmd(tagTemplate,proto,controller);

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    let renderSpace:Element = document.createElement("div");
    //给box添加样式
    renderSpace.setAttribute("style",proto.getBoxStyle());
    //指定渲染空间
    controller.root = renderSpace;
    //开始渲染
    parent.replaceChild(renderSpace,child);
    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    injectProps(controller,tagTemplate);

    link.to.push(controller);

    //将执行空间保存到父控制对象
    link.link.set(child.getAttribute("name"),controller.raw_data);

    //深度渲染
    findComponent(controller.root.children,controller);
}

export function raw_render(proto:Component,parent:ParentNode,child:Element,link:Controller | ApiController | PageController,tagTemplate:Element):void{
    //获取控制对象
    let controller:Controller = new Controller();

    //保持控制对象原型对象
    controller.proto = proto;

    //向raw_data中注入元数据
    inject(controller,tagTemplate);

    //复制原始数据对象到控制对象
    controller.raw_data = Object.create(proto.getData());

    //数据渲染对象
    controller.proxyForMethods = getProxyObject(controller.raw_data, controller);

    injectComputed(controller,proto);

    injectWatcher(controller,proto);

    injectMethod(controller,proto);

    //注入commit
    getCodeSpaceForCommit(controller.raw_data,getCommitMethod(link));
    //注入receiver
    getCodeSpaceForPublish(controller.raw_data,getPublishMethod(controller));

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //解析指令
    cmd(tagTemplate,proto,controller);

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

    //mount
    let renderSpace:Element = document.createElement("div");
    //给box添加样式
    renderSpace.setAttribute("style",proto.getBoxStyle());
    //指定渲染空间
    controller.root = renderSpace;
    //开始渲染
    parent.replaceChild(renderSpace,child);
    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    injectProps(controller,tagTemplate);

    link.to.push(controller)

    //深度渲染
    findComponent(controller.root.children,controller);
}