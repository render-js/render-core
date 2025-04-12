import {ComponentController} from "../../../lib/proto/controller/ComponentController";
import {PageController} from "../../../lib/proto/controller/PageController";

/**
 * 此函数用于解析自定义元素solt
 * @param tagTemplate
 * @param controller
 */
export function resolver_solt(tagTemplate:Element, controller:ComponentController | PageController):void{

    if (tagTemplate.hasChildNodes()){

        let list:NodeListOf<Element> = tagTemplate.querySelectorAll("solt");

        if (list.length !== 0){

            list.forEach(function (value) {

                if (value.hasAttribute("name")){

                    controller.solt.set(value.getAttribute("name"),value.innerHTML);

                }else {

                    controller.solt.set("default",value.innerHTML);
                }
            })
        }else {
            controller.solt.set("default",tagTemplate.innerHTML);
        }
    }
}

/**
 * 此函数用于展开solt
 * @param elements
 * @param controller
 */
export function extract_solt(elements:HTMLCollection, controller:ComponentController | PageController):void{

    for (let i:number = 0; i < elements.length;i++){

        let result:boolean = elements[i].hasAttribute("@solt");

        if (result){

            let dataName:string = elements[i].getAttribute("@solt");

            elements[i].removeAttribute("@solt");

            if (!dataName){

                elements[i].innerHTML = controller.solt.get("default");
            }else {
                // @ts-ignore
                elements[i].innerHTML = controller.solt.get(dataName);
            }
        }

        //深度解析
        extract_solt(elements[i].children,controller);
    }
}