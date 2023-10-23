import { part_render_map} from "../../render/partRender";
import {extractForArray} from "../../utility/vForUtility";

/**
 * 展开数据
 * @param element
 * @param data
 */
export function resolver_map_single(element:Element, data:any):void{

    //检查v-data
    if (element.hasAttribute("@key")){

        let property:string = element.getAttribute("@key");

        element.removeAttribute("@key");

        // @ts-ignore
        element.innerText = data[property];
    }

    //深度展开
    resolver_map_multi(element.children, data);
}

/**
 * 向根元素子元素展开数据
 * @param elements
 * @param data
 */
export function resolver_map_multi(elements:HTMLCollection, data:any):void{

    for (let i:number = 0; i < elements.length; i++){

        //检查v-key
        if (elements[i].hasAttribute("@key")){

            let property = elements[i].getAttribute("@key");

            elements[i].removeAttribute("@key");

            // @ts-ignore
            elements[i].innerText = data[property];
        }

        if (elements[i]){
            //检查v-for-item
            if (elements[i].hasAttribute("@for-item")){

                let  property = elements[i].getAttribute("@for-item");

                elements[i].removeAttribute("@for-item");

                part_render_map(elements[i].parentNode, elements[i], data[property]);
                i++;

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
            }
        }

        if (elements[i]){
            //检查v-for-array
            if (elements[i].hasAttribute("@for-index")){

                let property:string = elements[i].getAttribute("@for-index");

                elements[i].removeAttribute("@for-index");

                data[property].forEach(function (value,index) {
                    extractForArray(elements[i].parentNode, elements[i], index, value);
                    i++;
                })

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
            }
        }

        //深度展开
        if (elements[i]){
            resolver_map_multi(elements[i].children, data);
        }
    }
}