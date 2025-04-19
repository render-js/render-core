import {resolver_map_single} from "./v-map-utility";

/**
 * 展开数据
 * @param elements
 * @param data
 */
export function parse_directive_for_map(elements:HTMLCollection,data:{}):void
{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@map")

        if (result){

            let dataName:string = elements[i].getAttribute("@map")

            elements[i].removeAttribute("@map")

            if (data[dataName] instanceof Object){

                resolver_map_single(elements[i], data[dataName]);

            }else {
                console.log("Instruction @document need an object datatype to extract!");
            }
        }

        if (elements[i]){
            parse_directive_for_map(elements[i].children,data);
        }
    }
}