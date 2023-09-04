import {Controller} from "../../class/controller/controller";
import {ApiController} from "../../class/controller/apiController";
import {PageController} from "../../class/controller/pageController";

/**
 * 此函数用于解析自定义元素solt
 * @param tagTemplate
 * @param controller
 */
export function resolver_solt(tagTemplate:Element, controller:Controller | ApiController | PageController):void{

    if (tagTemplate.hasChildNodes()){

        if (tagTemplate.children.length > 0){

            for (let i = 0; i < tagTemplate.children.length; i++) {

                if (tagTemplate.children[i].nodeName.toUpperCase() === "SOLT"){

                    if (tagTemplate.children[i].hasAttribute("name")){

                        controller.solt.set(tagTemplate.children[i].getAttribute("name"),tagTemplate.children[i].innerHTML);

                    }else {

                        controller.solt.set("default",tagTemplate.children[i].innerHTML);
                    }
                }
            }
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
export function extract_solt(elements:HTMLCollection, controller:Controller | ApiController | PageController):void{

    for (let i:number = 0; i < elements.length;i++){

        let result:boolean = elements[i].hasAttribute("v-solt");

        if (result){

            let dataName:string = elements[i].getAttribute("v-solt");

            elements[i].removeAttribute("v-solt");

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