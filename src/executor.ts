import {addEvent, addInnerHtml, addInnerText, addLabel, bindModel, renderValue} from "./utility/utility";
import {Page} from "./class/render";
import {loadStyle} from "./utility/loader/style-loader";
import {Partial} from "./class/partial";
import {getProxyObject} from "./proxy/proxy";



export function doRenderPage(page:Page):void{
    //beforeRender
    let beforeRender = page.getBeforeRender().bind(page.getData());
    page.setBeforeRender(beforeRender)

    //开始渲染
    let temp:HTMLDivElement = document.createElement("div");
    temp.innerHTML = page.getTemplate();
    let template:ChildNode = temp.childNodes[0];
    // @ts-ignore
    let content = template.content;
    let main = content.children[0];
    let style = content.children[1];
    let root = document.getElementById("app");
    root.appendChild(main);

    //afterRender
    let props = page.getProps();
    let data = page.getData();
    data['props'] = props;
    let afterRender = page.getAfterRender().bind(data)
    page.setAfterRender(afterRender)

    //数据双向绑定
    page.root = main;
    let proxyObject = getProxyObject(page.getData(),page)
    page.setData(proxyObject)

    //组件内容处理
    let nodes:HTMLCollection =root.children
    loadStyle(style.childNodes[0].nodeValue)
    addLabel(nodes,page)
    addEvent(nodes,page,proxyObject)
    addInnerHtml(nodes,page,proxyObject)
    addInnerText(nodes,page,proxyObject)
    renderValue(nodes,page,proxyObject)
    bindModel(nodes,page,proxyObject)

    //深度渲染
    let components:string[] = Object.getOwnPropertyNames(page.getComponents())
    findComponent(nodes,components,page)

    collectComponents(document.getElementById("app"),page)

}

function findComponent(nodes:HTMLCollection,components:string[],page:Page | Partial):void{

    for(let i=0;i<nodes.length;i++){

        for (let j=0;j<components.length;j++) {

            if (nodes[i].nodeName === components[j].toUpperCase()){

                renderComponent(page.getComponents()[components[j]],nodes[i].parentNode,nodes[i],page.getName())
            }
        }

        findComponent(nodes[i].children,components,page)
    }
}


function renderComponent(component:Partial,parent,child,attr):void{
    //beforeRender
    let beforeRender = component.getBeforeRender().bind(component.getData());
    component.setBeforeRender(beforeRender)

    //渲染子组件
    let temp:HTMLDivElement = document.createElement("div")
    temp.innerHTML = component.getTemplate()
    let template:ChildNode = temp.childNodes[0]
    // @ts-ignore
    let content = template.content
    let main = content.children[0]
    main.setAttribute("cpn",attr)
    let style = content.children[1]
    parent.replaceChild(main,child)

    //afterRender
    let props = component.getProps();
    let data = component.getData();
    data['props'] = props;
    let afterRender = component.getAfterRender().bind(data)
    component.setAfterRender(afterRender)

    //数据双向绑定
    component.root = main;
    let proxyObject = getProxyObject(component.getData(),component)
    component.setData(proxyObject)

    //组件内容处理
    let nodes =main.children
    loadStyle(style.childNodes[0].nodeValue)
    addLabel(nodes,component)
    addEvent(nodes,component,proxyObject)
    addInnerHtml(nodes,component,proxyObject)
    addInnerText(nodes,component,proxyObject)
    renderValue(nodes,component,proxyObject)
    bindModel(nodes,component,proxyObject)

    //深度渲染
    let components = Object.getOwnPropertyNames(component.getComponents())
    findComponent(nodes,components,component)
}

function collectComponents(main:Element,page:Partial | Page):void{
    let components = page.getComponents()
    //引用子组件
    for (let pageKey in components) {
        let keys:string[] = Object.getOwnPropertyNames(components)
        let map = page.collection;

        for (let i=0;i<keys.length;i++){
            let gets = main.getElementsByTagName(keys[i]);

            let gos:ChildNode[] = [];

            for (let j=0;j<gets.length;j++){
                if (gets[j].getAttribute("cpn") === page.getName()){
                    gos.push(gets[j])
                }
            }
            map.set(keys[i],gos)
        }
        collectComponents(document.getElementById("app"),components[pageKey])
    }
}