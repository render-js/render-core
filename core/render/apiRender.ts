import {loadStyle} from "../../utility/loader/loader";
import {
    addEventForApi,
    addInnerHtml,
    addInnerText,
    addLabelForApi,
    bindModel,
    bindProps
} from "../action/utility";
import {getProxyObjectForApi} from "../proxy/proxy";
import {addRef, isUnKnown} from "../action/action";
import {Component} from "../../class/component";
import {renderComponent} from "./render";
import ApiComponent from "../../class/apiComponent";
import {ApiController} from "../../class/apiController";
import {getApiCodeSpace, getCodeSpaceForRef} from "../action/bind";


//渲染自定义标签
export function renderApiComponent(proto: ApiComponent, parent: ParentNode, attr: string, tagLib:Map<string, Component>):any{

    //获取控制对象
    let apiController:ApiController = new ApiController();
    apiController.owner = proto;

    //复制原始数据对象到控制对象
    apiController.raw_data = Object.create(proto.getData());

    //数据渲染对象
    apiController.proxyForMethods = getProxyObjectForApi(apiController.raw_data, apiController);

    //数据更新对象
    apiController.proxyForExecutor = getProxyObjectForApi(apiController.raw_data, apiController);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(apiController.raw_data);
    beforeRender();

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    let template:HTMLTemplateElement = temp.getElementsByTagName("template")[0];
    let content:DocumentFragment = template.content;
    let tagTemplate:Element = content.firstElementChild;
    let tagStyle = content.lastElementChild;

    //render actions
    loadStyle(tagStyle.nodeValue,proto.getName());
    addLabelForApi(tagTemplate.children,proto);
    addEventForApi(tagTemplate.children,proto,apiController.proxyForMethods);
    addInnerHtml(tagTemplate.children,apiController.proxyForMethods);
    addInnerText(tagTemplate.children,apiController.proxyForMethods);
    bindModel(tagTemplate.children,apiController.proxyForMethods);
    bindProps(tagTemplate.children,apiController.proxyForMethods);

    //注入ref
    getCodeSpaceForRef(apiController.raw_data,{$ref:addRef(tagTemplate.children)});

    //mount
    while(parent.hasChildNodes()) //当div下还存在子节点时 循环继续
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
            renderComponent(tagLib.get(collection[i].nodeName.toUpperCase()),collection[i].parentNode,collection[i],tagLib.get(collection[i].nodeName.toUpperCase()).getName(),tagLib);
        }else {
            findComponent(collection[i].children,tagLib)
        }
    }
}