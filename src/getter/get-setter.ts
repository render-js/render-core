import {Page} from "../class/render";
import {Partial} from "../class/partial";
import {
    addEventForUpdater,
    addInnerHtmlForUpdater,
    addInnerTextForUpdater, addLabelForUpdater, bindModelForUpdater, collectComponentsForUpdater,
    renderValueForUpdater
} from "../proxy/proxy";

export function getSetter(data:{},updater:Page | Partial){

    let setter = function (obj,prop,value):boolean{
        obj[prop] = value
        update(this.getRootNode(),this)
        return true
    }

    return setter.bind(updater)
}

function update(node:ChildNode,updater:Page | Partial):void{

    let temp:HTMLDivElement = document.createElement("div")

    temp.innerHTML = updater.getTemplate()

    let template:ChildNode = temp.childNodes[0]
    // @ts-ignore
    let content = template.content
    let main = content.children[0]

    addLabelForUpdater(main.children,updater)
    addEventForUpdater(main.children,updater,updater.getData())
    addInnerHtmlForUpdater(main.children,updater,updater.getData())
    addInnerTextForUpdater(main.children,updater,updater.getData())
    renderValueForUpdater(main.children,updater,updater.getData())

    updater.collection.forEach(function (value, key) {
        let ks = main.getElementsByTagName(key)
        for (let i=0;i<ks.length;i++){
            alterNode(ks[i],value[i])
        }
    })
    // @ts-ignore
    let cpn = node.parentNode.getAttribute("cpn")
    node.parentNode.replaceChild(main,node)
    main.setAttribute("cpn",cpn)
    updater.root = main

    bindModelForUpdater(main.children,updater,updater.getData())
    collectComponentsForUpdater(document.getElementById("app"),updater)
}

function alterNode(first:ChildNode,two:ChildNode):void{
    first.parentNode.replaceChild(two,first)
}

function updateProperties(root:Element,cpn:string,obj:{}){
    for (let objKey in obj) {
        root.getElementsByTagName(objKey)
    }
}