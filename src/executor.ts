import {addEvent, addInnerHtml, addInnerText, addLabel, renderValue} from "./utility/utility";
import {Page} from "./render";
import {loadStyle} from "./loader/style-loader";
import {Partial} from "./partial";



export function doRenderPage(page:Page):void{

    let temp:HTMLDivElement = document.createElement("div")

    temp.innerHTML = page.getTemplate()

    let template:ChildNode = temp.childNodes[0]

    // @ts-ignore
    let content = template.content

    let main = content.children[0]

    let style = content.children[1]

    let root = document.getElementById("app")

    //直接渲染raw到app元素下
    root.appendChild(main)

    loadStyle(style.childNodes[0].nodeValue)

    let nodes:HTMLCollection =root.children

    addLabel(nodes,page)

    addEvent(nodes,page)

    addInnerHtml(nodes,page)

    addInnerText(nodes,page)

    renderValue(nodes,page)

    let components:string[] = Object.keys(page.getComponents())

    findComponent(nodes,components,page)
}

function findComponent(nodes:HTMLCollection,components:string[],page:Page | Partial):void{

    for(let i=0;i<nodes.length;i++){

        for (let j=0;j<components.length;j++) {

            if (nodes[i].nodeName === components[j].toUpperCase()){

                renderComponent(page.getComponents()[components[j]],nodes[i].parentNode,nodes[i])
            }
        }

        findComponent(nodes[i].children,components,page)
    }
}


function renderComponent(component:Partial,parent,child):void{

    let temp:HTMLDivElement = document.createElement("div")

    temp.innerHTML = component.getTemplate()

    let template:ChildNode = temp.childNodes[0]

    // @ts-ignore
    let content = template.content

    let main = content.children[0]

    let style = content.children[1]

    parent.replaceChild(main,child)

    loadStyle(style.childNodes[0].nodeValue)

    let nodes =main.children

    addLabel(nodes,component)

    addEvent(nodes,component)

    addInnerHtml(nodes,component)

    addInnerText(nodes,component)

    renderValue(nodes,component)

    let components = Object.keys(component.getComponents())

    findComponent(nodes,components,component)
}