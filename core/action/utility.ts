import {Component} from "../../class/component";

export function addLabel(nodes:HTMLCollection,component:Component){

    for (let i:number=0;i<nodes.length;i++){

        nodes[i].setAttribute("cpn",component.getName());

        let kk:HTMLCollection = nodes[i].children

        addLabel(kk,component)
    }
}

export function addEvent(nodes:HTMLCollection,component:Component,data:{}){

    for (let i:number=0;i<nodes.length;i++){

        let attributes:string[] = nodes[i].getAttributeNames()

        for (let j:number=0;j<attributes.length;j++){

            let result:RegExpMatchArray = attributes[j].match(/^v-on:([a-z]+)$/g)

            if (result === null){

            }else {

                for (let k:number=0;k<result.length;k++){

                    let action:string = result[k].substring(5)

                    let method:string = nodes[i].getAttribute(result[k])

                    nodes[i].removeAttribute(result[k])

                    nodes[i].addEventListener(action,component.getMethods()[method].bind(data))
                }
            }
        }

        let kk:HTMLCollection = nodes[i].children

        addEvent(kk,component,data)
    }
}

export function addInnerText(nodes:HTMLCollection,data:{}):void{

    for (let i:number=0;i<nodes.length;i++){

        let result:boolean = nodes[i].hasAttribute("v-txt")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-txt")

            nodes[i].removeAttribute("v-txt")

            // @ts-ignore
            nodes[i].innerText = data[dataName]
        }

        let kk:HTMLCollection = nodes[i].children

        addInnerText(kk,data)
    }
}

export function addInnerHtml(nodes:HTMLCollection,data:{}):void{

    for (let i:number=0;i<nodes.length;i++){

        let result:boolean = nodes[i].hasAttribute("v-html")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-html")

            nodes[i].removeAttribute("v-html")

            // @ts-ignore
            nodes[i].innerHTML = data[dataName]
        }

        let kk:HTMLCollection = nodes[i].children

        addInnerHtml(kk,data)
    }
}

export function bindProps(nodes:HTMLCollection,data:{}){

    for (let i:number=0;i<nodes.length;i++){

        let attributes:string[] = nodes[i].getAttributeNames()

        for (let j:number=0;j<attributes.length;j++){

            let result:RegExpMatchArray = attributes[j].match(/^v-bind:([a-z]+)$/g)

            if (result === null){

            }else {

                for (let k:number=0;k<result.length;k++){

                    let property:string = result[k].substring(7)

                    let dataName:string = nodes[i].getAttribute(result[k])

                    nodes[i].removeAttribute(result[k])

                    try {
                        nodes[i].setAttribute(property,JSON.stringify(data[dataName]));
                    }catch (e) {
                        nodes[i].setAttribute(property,data[dataName]);
                    }
                }
            }
        }

        let kk:HTMLCollection = nodes[i].children

        bindProps(kk,data);
    }
}

export function bindModel(nodes:HTMLCollection,data:{}):void{

    for (let i:number=0;i<nodes.length;i++){

        let result:boolean = nodes[i].hasAttribute("v-model")

        if (result){

            let dataName:string = nodes[i].getAttribute("v-model")

            nodes[i].removeAttribute("v-model")

            let tagName:string = nodes[i].tagName

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
        let kk:HTMLCollection = nodes[i].children
        bindModel(kk,data)
    }
}

