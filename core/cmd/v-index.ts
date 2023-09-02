import {part_render_map} from "../render/partRender";

export function resolver_array_single(element:Element, index:number, data:any):void{

    //解析data
    let result:boolean = element.hasAttribute("v-data");

    if (result){

        element.removeAttribute("v-data");

        // @ts-ignore
        element.innerText = data;
    }

    //解析index
    result = element.hasAttribute("v-index");

    if (result){

        element.removeAttribute("v-index");

        // @ts-ignore
        element.innerText = data;
    }

    //检查v-for-item
    result = element.hasAttribute("v-for-item")

    if (result){

        element.removeAttribute("v-for-item");

        for (const keyItem in data) {
            part_render_map(element.parentNode, element, keyItem, data[keyItem]);
        }

        //删除节点
        element.parentNode.removeChild(element);
    }

    //深度展开
    let subElements:HTMLCollection = element.children;

    resolver_array_multi(subElements, index, data);
}

export function resolver_array_multi(elements:HTMLCollection, index:number, data:any):void{

    for (let i:number = 0; i < elements.length; i++){

        //解析data
        let result:boolean = elements[i].hasAttribute("v-data")

        if (result){

            elements[i].removeAttribute("v-data")

            // @ts-ignore
            elements[i].innerText = data;
        }

        //解析index
        result = elements[i].hasAttribute("v-index")

        if (result){

            elements[i].removeAttribute("v-index");

            // @ts-ignore
            elements[i].innerText = index;
        }

        //检查v-for-item
        result = elements[i].hasAttribute("v-for-item")

        if (result){

            elements[i].removeAttribute("v-for-item");

            for (const keyItem in data) {
                part_render_map(elements[i].parentNode, elements[i], keyItem, data[keyItem]);
                i++;
            }

            //删除节点
            elements[i].parentNode.removeChild(elements[i]);
        }

        if (elements[i]){
            resolver_array_multi(elements[i].children, index, data);
        }
    }
}