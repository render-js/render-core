import {extractForArray, extractForMap} from "../../utility/vForUtility";

/**
 * 展开数据
 * @param elements
 * @param data
 */
export function resolver_for_of(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-for-of")

        if (result){

            let dataName:string = elements[i].getAttribute("v-for-of")

            elements[i].removeAttribute("v-for-of")

            if (data[dataName] instanceof Array){

                data[dataName].forEach(function (value,index) {
                    extractForArray(elements[i].parentNode, elements[i], index, value);
                    i++;
                })

                //将模板节点删除
                elements[i].parentNode.removeChild(elements[i]);
            }else {

                console.log("Instruction v-for-of need an array datatype to extract!");
            }
        }

        if (elements[i]){
            resolver_for_of(elements[i].children,data);
        }
    }
}

/**
 * 展开数据
 * @param elements
 * @param data
 */
export function resolver_for_each(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("v-for-each")

        if (result){

            let dataName:string = elements[i].getAttribute("v-for-each")

            elements[i].removeAttribute("v-for-each")

            if (data[dataName] instanceof Object){

                extractForMap(elements[i].parentNode, elements[i], data[dataName]);
                i++;

            }else {
                console.log("Instruction v-for-of need an object datatype to extract!");
            }

            //将模板节点删除
            elements[i].parentNode.removeChild(elements[i]);
        }

        if (elements[i]){
            resolver_for_each(elements[i].children,data);
        }
    }
}