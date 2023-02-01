import {getSetter} from "../getter/get-setter";
import {loadStyle} from "../loader/style-loader";
import {Page} from "../render";

export function addLabel(nodes,page){
    for (let i=0;i<nodes.length;i++){
        nodes[i].setAttribute(page.name,"");
        let kk = nodes[i].children
        addLabel(kk,page)
    }
}

export function addEvents(nodes,page){
    for (let i=0;i<nodes.length;i++){

        let attributes = nodes[i].getAttributeNames()

        for (let j=0;j<attributes.length;j++){

            let result = attributes[j].match(/^v-on:([a-z]+)$/g)

            if (result === null){
            }else {
                for (let k=0;k<result.length;k++){

                    let action = result[k].substring(5)

                    let method = nodes[i].getAttribute(result[k])

                    nodes[i].removeAttribute(result[k])

                    nodes[i].addEventListener(action,page.methods[method].bind(beforePostProcessor(page.data())))
                }
            }
        }

        let kk = nodes[i].children

        addEvents(kk,page)
    }
}

function beforePostProcessor(data){
    data["$age"] = 23
    let setter = getSetter({})
    data.__defineSetter__("name",setter)
    return data
}

export function doRender(page:Page):void{

    let temp = document.createElement("div")

    temp.innerHTML = page.getTemplate()

    let template = temp.childNodes[0]

    // @ts-ignore
    let content = template.content

    let main = content.children[0]

    let style = content.children[1]

    let root = document.getElementById("app")

    root.appendChild(main)

    loadStyle(style.childNodes[0].nodeValue)

    let nodes =root.children

    addLabel(nodes,page)

    addEvents(nodes,page)

    let components = Object.keys(page.getComponents())

    findComponent(nodes,components,page)
}


function renderComponent(component,parent,child):void{
    let temp = document.createElement("div")

    temp.innerHTML = component.template

    let template = temp.childNodes[0]

    // @ts-ignore
    let content = template.content

    let main = content.children[0]

    let style = content.children[1]

    parent.replaceChild(main,child)

    loadStyle(style.childNodes[0].nodeValue)

    let nodes =main.children
    addLabel(nodes,component)
    addEvents(nodes,component)
    let components = Object.keys(component.components)
    findComponent(nodes,components,component)
}

function findComponent(nodes,components,page){
    for(let i=0;i<nodes.length;i++){
        for (let j=0;j<components.length;j++) {
            if (nodes[i].nodeName === components[j].toUpperCase()){
                renderComponent(page.components[components[j]],nodes[i].parentNode,nodes[i])
            }
        }
        findComponent(nodes[i].children,components,page)
    }
}