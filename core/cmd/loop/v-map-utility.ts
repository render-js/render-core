import {extractForArray} from "./v-for";

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
            if (elements[i].hasAttribute("@map-document")){

                let  property:string = elements[i].getAttribute("@map-document");

                elements[i].removeAttribute("@map-document");

                resolver_map_single(elements[i],data[property])
            }
        }

        if (elements[i]){
            //检查v-for-array
            if (elements[i].hasAttribute("@map-list")){

                let property:string = elements[i].getAttribute("@map-list");

                elements[i].removeAttribute("@map-list");

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