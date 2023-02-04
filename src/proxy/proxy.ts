import {getSetter} from "../getter/get-setter";
import {Page} from "../render";
import {Partial} from "../partial";

export  function getProxyObject(obj:{},updater:Page | Partial):any{

    let handel = {}

    handel["set"] = getSetter(obj,updater)

    return new Proxy(obj, handel);
}

export function addLabelForUpdater(nodes,page){

    for (let i=0;i<nodes.length;i++){

        nodes[i].setAttribute("cpn",page.getName());

        let kk = nodes[i].children

        addLabelForUpdater(kk,page)
    }
}

export function addEventForUpdater(nodes:HTMLCollection,page:Page | Partial,data:{}){

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

                    nodes[i].addEventListener(action,page.getMethods()[method].bind(data))
                }
            }
        }
        let kk = nodes[i].children

        addEventForUpdater(kk,page,data)
    }
}

export function addInnerTextForUpdater(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-txt")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-txt")

            nodes[i].removeAttribute("v-txt")

            // @ts-ignore
            nodes[i].innerText = data[dataName]
        }

        let kk = nodes[i].children

        addInnerTextForUpdater(kk,page,data)
    }
}

export function addInnerHtmlForUpdater(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-html")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-html")

            nodes[i].removeAttribute("v-html")

            // @ts-ignore
            nodes[i].innerHTML = data[dataName]
        }
        let kk = nodes[i].children

        addInnerHtmlForUpdater(kk,page,data)
    }
}

export function renderValueForUpdater(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result:NodeList = nodes[i].childNodes

        for (let j=0;j<result.length;j++){

            if (result[j].nodeType === 3){

                let real = result[j].nodeValue.match(/^\{\{\w+\}\}$/g)

                if (real !== null){

                    let expression  = result[j].nodeValue

                    let expression_before = expression.replace(/\{/g,"")

                    let expression_after = expression_before.replace(/\}/g,"")

                    result[j].nodeValue = data[expression_after]
                }
            }
        }
        let kk = nodes[i].children

        renderValueForUpdater(kk,page,data)
    }
}

export function bindModelForUpdater(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-model")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-model")

            nodes[i].removeAttribute("v-model")

            let tagName = nodes[i].tagName

            nodes[i].setAttribute("name",dataName)

            // @ts-ignore
            nodes[i].setAttribute("value",data[dataName])

            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA"){

                nodes[i].setAttribute("name",dataName)

                // @ts-ignore
                nodes[i].setAttribute("value",data[dataName])
                //光标定位

                let listener = function (evt){
                    if (!evt.target.hasAttribute("flag")){
                        let element = evt.target
                        let dataName = element.name
                        this[dataName] = element.value
                    }
                }

                let compositionstart = function (evt){
                    evt.target.setAttribute("flag","false")
                }

                let compositionend = function (evt){
                    evt.target.setAttribute("flag","true")
                    let element = evt.target
                    let dataName = element.name
                    this[dataName] = element.value
                }

                nodes[i].addEventListener("input",listener.bind(data))
                nodes[i].addEventListener("compositionstart",compositionstart)
                nodes[i].addEventListener("compositionend",compositionend.bind(data))

                // @ts-ignore
                nodes[i].focus()
                // @ts-ignore
                nodes[i].setSelectionRange(data[dataName].length, data[dataName].length)
            }
        }

        let kk = nodes[i].children

        bindModelForUpdater(kk,page,data)
    }
}

export function collectComponentsForUpdater(main:Element,page:Partial | Page):void{
    //引用子组件
    let keys:string[] = Object.getOwnPropertyNames(page.getComponents())
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
}