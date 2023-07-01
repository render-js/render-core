import {loadStyle} from "../../utility/loader/loader";
import {addEvent, addInnerHtml, addInnerText, addLabel, bindModel, bindProps} from "../action/utility";
import {getProxyObject} from "../proxy/proxy";
import {Controller} from "../../class/controller";
import {addRef, isUnKnown} from "../action/action";
import {resolver} from "../../resolve/resolver";
import {Component} from "../../class/component";
import {getCodeSpace, getCodeSpaceForRef} from "../action/bind";
import {resolveProps, resolveQueries} from "../../utility/resolver/resolver";

//检查元素是否为基元素
export function renderHtml(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    for (let i:number=0;i<collection.length;i++)
    {
        if (isUnKnown(collection[i].nodeName.toUpperCase()))
        {
            resolver(collection[i],tagLib);
        }else {
            renderHtml(collection[i].children,tagLib);
        }
    }
}

//渲染自定义标签
export function renderComponent(proto: Component, parent: ParentNode, child:Element, attr: string, tagLib:Map<string, Component>):void{

    //获取控制对象
    let controller:Controller = new Controller();
    controller.owner = proto;

    //复制原始数据对象到控制对象
    controller.raw_data = Object.create(proto.getData());
    //向控制对象中注入数据以及域方法
    getCodeSpace(controller.raw_data,{$props:resolveProps(child,proto.getProps()), $query:resolveQueries()});

    //数据渲染对象
    controller.proxyForMethods = getProxyObject(controller.raw_data, controller);

    //数据更新对象
    controller.proxyForExecutor = getProxyObject(controller.raw_data, controller);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let content:DocumentFragment = template.content;
    let tagTemplate:Element = content.firstElementChild;
    let tagStyle:Element = content.lastElementChild;

    /**
     * 模板处理方法群
     */
    //向head位置添加该组件的样式
    loadStyle(tagStyle.nodeValue,proto.getName());
    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children,proto);
    //将元素事件绑定到元素上
    addEvent(tagTemplate.children,proto,controller.proxyForMethods);
    //渲染html
    addInnerHtml(tagTemplate.children,controller.proxyForMethods);
    //渲染text
    addInnerText(tagTemplate.children,controller.proxyForMethods);
    //绑定数据
    bindModel(tagTemplate.children,controller.proxyForMethods);
    //渲染属性
    bindProps(tagTemplate.children,controller.proxyForMethods);

    //注入ref
    getCodeSpaceForRef(controller.raw_data,{$ref:addRef(tagTemplate.children)});

    //mount
    let renderSpace:Element = document.createElement("div");
    parent.replaceChild(renderSpace,child);
    while (tagTemplate.hasChildNodes()){
        renderSpace.append(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    //指定渲染空间
    controller.root = renderSpace;

    //深度渲染
    findComponent(tagTemplate.children,tagLib)
}

//继续渲染
export function findComponent(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            renderComponent(tagLib.get(collection[i].nodeName.toUpperCase()),collection[i].parentNode,collection[i],tagLib.get(collection[i].nodeName.toUpperCase()).getName(),tagLib);
        }else {
            findComponent(collection[i].children,tagLib)
        }
    }
}