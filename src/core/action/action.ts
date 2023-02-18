import {Page} from "../../class/render";
import {Partial} from "../../class/partial";
import {liveRender, renderComponent} from "../render/render";

export function alterNode(first:ChildNode,two:ChildNode):void{
    first.parentNode.replaceChild(two,first)
}

export function findComponent(nodes:HTMLCollection,components:string[],belong:Page | Partial):void{

    for(let i=0;i<nodes.length;i++){

        if (nodes[i].nodeName === "COMPONENT"){

            liveRender(nodes[i],nodes[i].attributes,belong);

            for (let item=0; item < nodes[i].attributes.length;item++) {

                nodes[i].removeAttribute(nodes[i].attributes[item].name);
            }
        }else {
            for (let j=0;j<components.length;j++) {

                if (nodes[i].nodeName === components[j].toUpperCase()){
                    //生成渲染对象

                    renderComponent(belong.getComponents()[components[j]],nodes[i].parentNode,nodes[i],belong.getName())
                }
            }
            findComponent(nodes[i].children,components,belong)
        }
    }
}

export function findLiveComponent(nodes:HTMLCollection,components:string[],belong:Page | Partial){

    for(let i=0;i<nodes.length;i++){

        if (nodes[i].nodeName === "COMPONENT"){

            if (nodes[i].hasAttribute("define")){
                liveRender(nodes[i],nodes[i].attributes,belong);

                for (let nodesKey in nodes[i].attributes) {

                    nodes[i].removeAttribute(nodesKey);
                }
            }
        }
    }
}

export function collectComponents(main:Element,page:Partial | Page):void{
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


export function fnDelete(element:ChildNode):void {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}