import {ContextController} from "../../../system/prototype/ContextController";

/**
 *
 * @param elements
 * @param data
 * @param controller
 */
export function parse_directive_html(elements:HTMLCollection,data:{},controller:ContextController):void
{

    for (let i:number = 0; i < elements.length;i++){

        if (elements[i].hasAttribute("@html")){

            let dataName:string = elements[i].getAttribute("@html")

            elements[i].removeAttribute("@html")

            try {
                if (data[dataName] === undefined){

                    elements[i].innerHTML = controller.computed[dataName]();
                }else {

                    elements[i].innerHTML = data[dataName];
                }
            }catch (error){
                console.error("Can not find data:"+dataName+" in the component");
            }

        }
        parse_directive_html(elements[i].children,data,controller);
    }
}