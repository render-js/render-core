import {ComponentController} from "../../../class/controller/componentController";

/**
 *
 * @param elements
 * @param data
 * @param controller
 */
export function resolver_txt(elements:HTMLCollection, data:{}, controller:ComponentController):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-txt")

        if (result){

            let dataName:string = elements[i].getAttribute("v-txt")

            elements[i].removeAttribute("v-txt")

            if (data[dataName] === undefined){

                // @ts-ignore
                elements[i].innerText = controller.computed[dataName].call();
            }else {

                // @ts-ignore
                elements[i].innerText = data[dataName];
            }
        }

        resolver_txt(elements[i].children,data,controller);
    }
}