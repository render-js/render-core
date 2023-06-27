import {loadStyle} from "../../utility/loader/loader";
import {addEvent, addInnerHtml, addInnerText, addLabel, bindModel, bindProps} from "../action/utility";
import {getProxyObject} from "../proxy/proxy";
import {Controller} from "../../class/controller";
import {isUnKnown} from "../action/action";
import {resolver} from "../../resolve/resolver";
import {Component} from "../../class/component";
import {getCodeSpace} from "../action/bind";
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
    let template:ChildNode = temp.childNodes[0];
    // @ts-ignore
    let content = template.content;
    let main = content.children[0];
    main.setAttribute("cpn",attr);
    let style = content.children[1];

    //render actions
    loadStyle(style.childNodes[0].nodeValue);
    addLabel(main.children,proto);
    addEvent(main.children,proto,controller.proxyForMethods);
    addInnerHtml(main.children,controller.proxyForMethods);
    addInnerText(main.children,controller.proxyForMethods);
    bindModel(main.children,controller.proxyForMethods);
    bindProps(main.children,controller.proxyForMethods);

    //mount
    parent.replaceChild(main,child);

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller.raw_data);
    afterRender();

    //切换根组件
    controller.root = main;

    //深度渲染
    findComponent(main.children,tagLib)
}

//继续渲染
export function findComponent(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    for (let i:number=0;i<collection.length;i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            renderComponent(tagLib.get(collection[i].nodeName.toUpperCase()),collection[i].parentNode,collection[i],tagLib.get(collection[i].nodeName.toUpperCase()).getName(),tagLib);
        }else {
            findComponent(collection[i].children,tagLib)
        }
    }
}