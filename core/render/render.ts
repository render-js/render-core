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
    controller.data = Object.create(proto.getData());

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(controller.data);
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
    let afterRender = proto.getAfterRender().bind(controller.data);
    afterRender();

    //数据双向绑定
    controller.root = main;
    controller["raw"] = controller.data;
    controller.data = getProxyObject(controller.data, controller);

    //深度渲染
    findComponent(main.children,tagLib)
}

//继续渲染
export function findComponent(nodes:HTMLCollection,tagLib:Map<string, Component>):void
{
    for(let i:number=0;i<nodes.length;i++){
        if (tagLib.has(nodes[i].nodeName.toUpperCase())){
            //生成渲染对象
            renderComponent(tagLib.get(nodes[i].nodeName.toUpperCase()),nodes[i].parentNode,nodes[i],tagLib.get(nodes[i].nodeName).getName(),tagLib);
        }
        findComponent(nodes[i].children,tagLib)
    }
}