import {part_render_map} from "../../render/partRender";
import {extractForArray} from "../../utility/vForUtility";

/**
 * 遍历根元素
 * @param element
 * @param index
 * @param data
 */
export function resolver_array_single(element:Element, index:number, data:any):void{

    //解析data
    if (element.hasAttribute("@data")){

        element.removeAttribute("@data");

        // @ts-ignore
        element.innerText = data;
    }

    //解析index
    if (element.hasAttribute("@index")){

        element.removeAttribute("@index");

        // @ts-ignore
        element.innerText = index;
    }

    resolver_array_multi(element.children, index, data);
}

/**
 * 遍历根元素的子元素
 * @param elements
 * @param index
 * @param data
 */
export function resolver_array_multi(elements:HTMLCollection, index:number, data:any):void{

    for (let i:number = 0; i < elements.length; i++){

        //解析data
        if (elements[i].hasAttribute("@data")){

            elements[i].removeAttribute("@data")

            // @ts-ignore
            elements[i].innerText = data;
        }

        //解析index
        if (elements[i].hasAttribute("@index")){

            elements[i].removeAttribute("@index");

            // @ts-ignore
            elements[i].innerText = index;
        }

        if (elements[i]){
            //检查v-for-item,该指令不可以用在根元素上
            if (elements[i].hasAttribute("@list-document")){

                elements[i].removeAttribute("@list-document");

                part_render_map(elements[i].parentNode, elements[i], data);
                i++;

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
            }
        }

        if (elements[i]){
            //检查v-for-array
            if (elements[i].hasAttribute("@list-list")){

                elements[i].removeAttribute("@list-list");

                data.forEach(function (value,index) {
                    extractForArray(elements[i].parentNode, elements[i], index, value);
                    i++;
                })

                //删除节点
                elements[i].parentNode.removeChild(elements[i]);
            }
        }

        if (elements[i]){
            resolver_array_multi(elements[i].children, index, data);
        }
    }
}