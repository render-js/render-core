import {ContextController} from "../../../system/define/ContextController";
/**
 *
 * @param elements
 * @param data
 * @param controller
 */
export function parse_directive_txt(elements:HTMLCollection, data:{}, controller:ContextController):void
{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@txt")

        if (result){

            let dataName:string = elements[i].getAttribute("@txt")

            elements[i].removeAttribute("@txt")

            try {
                if (data[dataName] === undefined){

                    // @ts-ignore
                    elements[i].innerText = controller.computed[dataName]();
                }else {

                    // @ts-ignore
                    elements[i].innerText = data[dataName];
                }
            }catch (error){
                console.error("Can not find data:"+dataName+" in the component");
            }
        }

        parse_directive_txt(elements[i].children,data,controller);
    }
}