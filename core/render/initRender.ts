import {loadStyle} from "../../library/loader/loader";
import { addLabel} from "../utility/miscUtility";
import {getProxyForInject, getProxyObject} from "../proxy/getProxy";
import {Controller} from "../../class/controller";
import {Component} from "../../class/component";
import {getCodeSpaceForProps, getCodeSpaceForQuery, getCodeSpaceForRef} from "../utility/injectUtility";
import {resolveProps} from "../resolver/props";
import {resolveQueries} from "../resolver/query";
import {resolver_event} from "../cmd/v-on";
import {resolver_html} from "../cmd/v-html";
import {resolver_txt} from "../cmd/v-txt";
import {resolver_model} from "../cmd/v-model";
import {resolver_Ref} from "../cmd/v-ref";
import {isUnKnown} from "../utility/checkUtility";
import {resolver_bind} from "../cmd/v-bind";


//渲染自定义标签
export function initRender(proto: Component, parent: ParentNode, child:Element, tagLib:Map<string, Component>,link:Controller):void{

    //获取控制对象
    let controller:Controller = new Controller();
    controller.proto = proto;

    //复制原始数据对象到控制对象
    controller.raw_data = Object.create(proto.getData());

    //数据渲染对象
    controller.proxyForMethods = getProxyObject(controller.raw_data, controller);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.raw_data);
    beforeRender();

    //生成DOM
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let content:DocumentFragment = template.content;

    //获得模板元素
    let tagTemplate:Element = content.firstElementChild;
    //解析元素上的静态属性
    let props = resolveProps(tagTemplate,proto);

    //注入props
    getCodeSpaceForProps(controller.raw_data,getProxyForInject(props));
    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolveQueries());
    //注入ref
    getCodeSpaceForRef(controller.raw_data,resolver_Ref(tagTemplate.children));

    //给所有元素添加上npm=tag标志
    addLabel(tagTemplate.children,proto.getName());
    //将元素事件绑定到元素上
    resolver_event(tagTemplate.children,proto.getMethods(),controller.proxyForMethods);
    //渲染html
    resolver_html(tagTemplate.children,controller.proxyForMethods);
    //渲染text
    resolver_txt(tagTemplate.children,controller.proxyForMethods);
    //绑定数据
    resolver_model(tagTemplate.children,controller.proxyForMethods);
    //渲染属性
    resolver_bind(tagTemplate.children,controller.proxyForMethods);

    //获得模板样式元素
    let tagStyle:Element = content.lastElementChild;
    //向head位置添加该组件的样式
    loadStyle(tagStyle.childNodes[0].nodeValue,proto.getName());

    //beforeMount
    let beforeMount = proto.getBeforeMount().bind(controller.raw_data);
    beforeMount();

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
    findComponent(tagTemplate.children,tagLib,controller);
}

//继续渲染
export function findComponent(collection:HTMLCollection,tagLib:Map<string, Component>,link:Controller):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            initRender(tagLib.get(collection[i].nodeName.toUpperCase()),collection[i].parentNode,collection[i],tagLib,link);
        }else {
            findComponent(collection[i].children,tagLib,link);
        }
    }
}