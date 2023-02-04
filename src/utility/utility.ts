import {Page} from "../render";
import {Partial} from "../partial";

export function addLabel(nodes,page){

    for (let i=0;i<nodes.length;i++){

        nodes[i].setAttribute("cpn",page.getName());

        let kk = nodes[i].children

        addLabel(kk,page)
    }
}

export function addEvent(nodes:HTMLCollection,page:Page | Partial,data:{}){

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

        addEvent(kk,page,data)
    }
}

export function addInnerText(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-txt")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-txt")

            nodes[i].removeAttribute("v-txt")

            // @ts-ignore
            nodes[i].innerText = data[dataName]
        }

        let kk = nodes[i].children

        addInnerText(kk,page,data)
    }
}

export function addInnerHtml(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-html")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-html")

            nodes[i].removeAttribute("v-html")

            // @ts-ignore
            nodes[i].innerHTML = data[dataName]
        }

        let kk = nodes[i].children

        addInnerHtml(kk,page,data)
    }
}

export function renderValue(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

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

                    let kk = nodes[i].children

                    renderValue(kk,page,data)
                }
            }
        }
    }
}

export function bindModel(nodes:HTMLCollection,page:Page | Partial,data:{}):void{

    for (let i=0;i<nodes.length;i++){

        let result = nodes[i].hasAttribute("v-model")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-model")

            nodes[i].removeAttribute("v-model")

            let tagName = nodes[i].tagName

            nodes[i].setAttribute("name",dataName)

            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA"){

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
            }
        }
        let kk = nodes[i].children
        bindModel(kk,page,data)
    }
}

