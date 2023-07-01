import {loadStyle} from "../../library/loader/loader";
import {addLabel} from "../utility/miscUtility";
import {getProxyObjectForApi} from "../proxy/getProxy";
import {isUnKnown} from "../utility/checkUtility";
import {Component} from "../../class/component";
import ApiComponent from "../../class/apiComponent";
import {ApiController} from "../../class/apiController";
import {getApiCodeSpace, getCodeSpaceForRef} from "../utility/injectUtility";
import {initRender} from "./initRender";
import {resolver_Ref} from "../cmd/v-ref";
import {resolver_html} from "../cmd/v-html";
import {resolver_txt} from "../cmd/v-txt";
import {resolver_model} from "../cmd/v-model";
import {resolver_bind} from "../cmd/v-bind";
import {Controller} from "../../class/controller";
import {resolver_event} from "../cmd/v-on";


//渲染自定义标签
export function apiRender(proto: ApiComponent, parent: ParentNode, attr: string, tagLib:Map<string, Component>):any{

    //获取控制对象
    let apiController:ApiController = new ApiController();
    apiController.proto = proto;

    //复制原始数据对象到控制对象
    apiController.raw_data = Object.create(proto.getData());

    //数据渲染对象
    apiController.proxyForMethods = getProxyObjectForApi(apiController.raw_data, apiController);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(apiController.raw_data);
    beforeRender();

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let content:DocumentFragment = template.content;

    //获取到模板
    let tagTemplate:Element = content.firstElementChild;

    addLabel(tagTemplate.children,proto.getName());

    resolver_event(tagTemplate.children,proto.getMethods(),apiController.proxyForMethods);

    resolver_html(tagTemplate.children,apiController.proxyForMethods);

    resolver_txt(tagTemplate.children,apiController.proxyForMethods);

    resolver_model(tagTemplate.children,apiController.proxyForMethods);

    resolver_bind(tagTemplate.children,apiController.proxyForMethods);

    //获取到模板样式
    let tagStyle:Element = content.lastElementChild;
    loadStyle(tagStyle.childNodes[0].nodeValue,proto.getName());

    //注入ref
    getCodeSpaceForRef(apiController.raw_data,resolver_Ref(tagTemplate.children));

    //mount
    while(parent.hasChildNodes())
    {
        parent.removeChild(parent.firstChild);
    }
    while (tagTemplate.hasChildNodes()){
        parent.append(tagTemplate.firstChild);
    }

    //afterRender
    let afterRender = proto.getAfterRender().bind(apiController.raw_data);
    afterRender();

    //切换根组件
    apiController.root = parent;

    //深度渲染
    findComponent(tagTemplate.children,tagLib)

    //返回api对象
    getApiCodeSpace(apiController.raw_data,proto.getMethods());

    return apiController.raw_data;
}

//继续渲染
export function findComponent(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    for (let i:number=0;i<collection.length;i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            initRender(tagLib.get(collection[i].nodeName.toUpperCase()),collection[i].parentNode,collection[i],tagLib,new Controller());
        }else {
            findComponent(collection[i].children,tagLib)
        }
    }
}