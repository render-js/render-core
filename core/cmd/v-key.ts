import { part_render_map} from "../render/partRender";
import {extractForArray} from "../utility/vForUtility";

export function resolver_map_single(element:Element, key:string, data:any):void{

    //检查v-data
    let result:boolean = element.hasAttribute("v-data");

    if (result){

        element.removeAttribute("v-data");

        // @ts-ignore
        element.innerText = data;
    }

    //检查v-key
    result = element.hasAttribute("v-key");

    if (result){

        element.removeAttribute("v-key");

        // @ts-ignore
        element.innerText = data;
    }

    //检查v-for-item
    result = element.hasAttribute("v-for-item")

    if (result){

        element.removeAttribute("v-for-item");

        for (const keyItem in data[key]) {
            part_render_map(element.parentNode, element, keyItem, data[keyItem]);
        }

        element.parentNode.removeChild(element);

    }

    //检查v-for-index
    result = element.hasAttribute("v-for-index")

    if (result){

        element.removeAttribute("v-for-index");

        data.forEach(function (value,index) {
            extractForArray(element.parentNode, element, index, value);
        })

        //删除节点
        element.parentNode.removeChild(element);
    }

    //深度展开
    let subElements:HTMLCollection = element.children;

    resolver_map_multi(subElements, key, data);
}

export function resolver_map_multi(elements:HTMLCollection, key:string, data:any):void{

    for (let i:number = 0; i < elements.length; i++){

        //检查v-data
        let result:boolean = elements[i].hasAttribute("v-data")

        if (result){

            elements[i].removeAttribute("v-data")

            // @ts-ignore
            elements[i].innerText = JSON.stringify(data);
        }

        //检查v-key
        result = elements[i].hasAttribute("v-key")

        if (result){

            elements[i].removeAttribute("v-key");

            // @ts-ignore
            elements[i].innerText = index;
        }

        //检查v-for-item
        result = elements[i].hasAttribute("v-for-item")

        if (result){

            elements[i].removeAttribute("v-for-item");

            for (const keyItem in data[key]) {
                part_render_map(elements[i].parentNode, elements[i], keyItem, data[keyItem]);
            }

            //删除节点
            elements[i].parentNode.removeChild(elements[i]);
        }

        //检查v-for-array
        result = elements[i].hasAttribute("v-for-index")

        if (result){

            elements[i].removeAttribute("v-for-index");

            data.forEach(function (value,index) {
                extractForArray(elements[i].parentNode, elements[i], index, value);
                i++;
            })

            //删除节点
            elements[i].parentNode.removeChild(elements[i]);
        }

        //深度展开
        if (elements[i]){
            resolver_map_multi(elements[i].children, key, data);
        }
    }
}