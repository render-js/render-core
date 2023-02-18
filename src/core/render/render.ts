import {Page} from "../../class/render";
import {loadStyle} from "../../utility/loader/loader";
import {addEvent, addInnerHtml, addInnerText, addLabel, bindModel, bindProps} from "../action/utility";
import {Partial} from "../../class/partial";
import {getProxyObject, getProxyObjectForComponent} from "../proxy/proxy";
import {VPage} from "../../class/page";
import {collectComponents, findComponent, findLiveComponent, fnDelete} from "../action/action";
import {resolveProps, resolvePropsByObject} from "../../utility/resolver/resolver";

export function RenderPage(page:Page):void{

    //创建游离对象
    let VP = new VPage();

    //元数据
    VP.owner = page;
    VP.data = Object.create(page.getData())

    //beforeRender
    let beforeRender = page.getBeforeRender().bind(VP.data);
    beforeRender();

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = page.getTemplate();
    let template:ChildNode = temp.childNodes[0];
    // @ts-ignore
    let content = template.content;
    let main = content.children[0];
    let style = content.children[1];

    //render actions
    loadStyle(style.childNodes[0].nodeValue)
    addLabel(main.children,page)
    addEvent(main.children,page,VP.data)
    addInnerHtml(main.children,VP.data)
    addInnerText(main.children,VP.data)
    bindModel(main.children,VP.data)
    bindProps(main.children,VP.data)

    //mount
    let root = document.getElementById("app");
    root.appendChild(main);

    //afterRender
    let afterRender = page.getAfterRender().bind(VP.data);
    afterRender();

    //数据双向绑定
    VP.root = main;
    VP["raw"] = VP.data;
    VP.data = getProxyObject(VP.data,VP)

    //深度渲染
    findComponent(root.children, Object.getOwnPropertyNames(page.getComponents()),page)

    //收集组件node
    collectComponents(document.getElementById("app"),page)
}

export function renderComponent(proto: Partial, parent: ParentNode, child: Element, attr: string):void{

    let VP = new VPage();
    VP.owner = proto;
    VP.data = Object.create(proto.getData());

    //resolve props
    VP.data['$props'] = resolveProps(child, proto.getProps());

    //beforeRender
    let beforeRender = proto.getBeforeRender().bind(VP.data);
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
    addEvent(main.children,proto,VP.data);
    addInnerHtml(main.children,VP.data);
    addInnerText(main.children,VP.data);
    bindModel(main.children,VP.data);
    bindProps(main.children,VP.data);

    //mount
    parent.replaceChild(main,child);

    //afterRender
    let afterRender = proto.getAfterRender().bind(VP.data);
    afterRender();

    //数据双向绑定
    VP.root = main;
    VP["raw"] = VP.data;
    VP.data = getProxyObject(VP.data, VP);

    //深度渲染
    findComponent(main.children,Object.getOwnPropertyNames(proto.getComponents()),proto)
}

export function liveRender(parent:ChildNode,attrs:NamedNodeMap,belong:Page | Partial){

    //获取proto对象
    let proto:Partial = belong.getComponents()[attrs.getNamedItem("define").value];

    //获取name
    let attr = proto.getName();

    //创建流对象
    let VP = new VPage();
    VP.owner = proto;
    VP.data = Object.create(proto.getData());

    VP.data['$props'] = resolvePropsByObject(attrs,proto.getProps());

    //Render
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = proto.getTemplate();
    let template:ChildNode = temp.childNodes[0];
    // @ts-ignore
    let content = template.content;
    let main = content.children[0];
    main.setAttribute("cpn",attr+"-live");
    let style = content.children[1];

    //render actions
    loadStyle(style.childNodes[0].nodeValue);
    addLabel(main.children,proto);
    addEvent(main.children,proto,VP.data);
    addInnerHtml(main.children,VP.data);
    addInnerText(main.children,VP.data);
    bindProps(main.children,VP.data);

    //mount
    fnDelete(parent);
    parent.appendChild(main);

    //afterRender
    let afterRender = proto.getAfterRender().bind(VP.data);
    afterRender();

    //数据双向绑定
    VP.root = main;
    VP["raw"] = VP.data;
    VP.data = getProxyObjectForComponent(VP.data, VP);

    //双向绑定
    bindModel(main.children,VP.data)

    //深度渲染
    findComponent(main.children,Object.getOwnPropertyNames(proto.getComponents()),proto)
}