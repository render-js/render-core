import {loadStyle} from "../../utility/loader/loader";
import {addEvent, addInnerHtml, addInnerText, addLabel, bindModel, bindProps} from "../action/utility";
import {getProxyObject} from "../proxy/proxy";
import {Controller} from "../../class/controller";
import {isUnKnown} from "../action/action";
import {resolver} from "../../resolve/resolver";
import {Component} from "../../class/component";

//检查元素是否为基元素
export function renderHtml(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    for (let i:number=0;i<collection.length;i++)
    {
        if (isUnKnown(collection[i].nodeName))
        {
            resolver(collection[i],tagLib);
        }else {
            renderHtml(collection[i].children,tagLib);
        }
    }
}

//渲染自定义标签
export function renderComponent(proto: Component, parent: ParentNode,child:Element, attr: string,tagLib:Map<string, Component>):void{

    let controller:Controller = new Controller();
    controller.owner = proto;

    //数据双向绑定
    controller.data = Object.create(proto.getData());
    //数据写入对象
    controller["raw"] = controller.data;
    //数据更新对象
    controller.data = getProxyObject(controller.data, controller);

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller["raw"]);
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
    addEvent(main.children,proto,controller.data);
    addInnerHtml(main.children,controller.data);
    addInnerText(main.children,controller.data);
    bindModel(main.children,controller.data);
    bindProps(main.children,controller.data);

    //mount
    parent.replaceChild(main,child);

    //afterRender
    let afterRender = proto.getAfterRender().bind(controller["raw"]);
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