import { part_render_map} from "../../render/partRender";
import {extractForArray} from "../../utility/vForUtility";

/**
 * 展开数据
 * @param element
 * @param data
 */
export function resolver_map_single(element:Element, data:any):void{

    //检查v-data
    if (element.hasAttribute("@section")){

        let property:string = element.getAttribute("@section");

        element.removeAttribute("@section");

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
        if (elements[i].hasAttribute("@section")){

            let property = elements[i].getAttribute("@section");

            elements[i].removeAttribute("@section");

            // @ts-ignore
            elements[i].innerText = data[property];
        }

        if (elements[i]){
            //检查v-for-item
            if (elements[i].hasAttribute("@document-document")){

                let  property:string = elements[i].getAttribute("@document-document");

                elements[i].removeAttribute("@document-document");

                part_render_map(elements[i].parentNode, elements[i], data[property]);
                i++;

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
                i--;
            }
        }

        if (elements[i]){
            //检查v-for-array
            if (elements[i].hasAttribute("@document-list")){

                let property:string = elements[i].getAttribute("@document-list");

                elements[i].removeAttribute("@document-list");

                data[property].forEach(function (value: any, index: number) {
                    extractForArray(elements[i].parentNode, elements[i], index, value);
                    i++;
                })

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
                i--;
            }
        }

        //深度展开
        if (elements[i]){
            resolver_map_multi(elements[i].children, data);
        }
    }
}