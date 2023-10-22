import {ComponentController} from "../../../class/controller/componentController";

/**
 *
 * @param elements
 * @param data
 * @param controller
 */
export function resolver_html(elements:HTMLCollection,data:{},controller:ComponentController):void{

    for (let i:number = 0; i < elements.length;i++){

        if (elements[i].hasAttribute("v-html")){

            let dataName:string = elements[i].getAttribute("v-html")

            elements[i].removeAttribute("v-html")

            if (data[dataName] === undefined){

                elements[i].innerHTML = controller.computed[dataName]();
            }else {

                elements[i].innerHTML = data[dataName];
            }

        }

        resolver_html(elements[i].children,data,controller);
    }
}