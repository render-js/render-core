import {extractForMap} from "./v-map";

/**
 * 遍历根元素
 * @param element
 * @param index
 * @param data
 */
export function resolver_array_single(element:Element, index:number, data:any):void{
    //从根元素开始渲染

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

    //渲染信息
    if (element.hasAttribute("@for-message")){

        let data_index = element.getAttribute("@for-message");

        element.removeAttribute("@for-message");

        // @ts-ignore
        element.innerText = data[data_index];
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
    //渲染模板子元素
    for (let i:number = 0; i < elements.length; i++){

        //解析data
        if (elements[i].hasAttribute("@data")){

            elements[i].removeAttribute("@data");

            // @ts-ignore
            elements[i].innerText = data;
        }

        //解析index
        if (elements[i].hasAttribute("@index")){

            elements[i].removeAttribute("@index");

            // @ts-ignore
            elements[i].innerText = index;
        }

        //渲染文档
        if (elements[i].hasAttribute("for-document")){

            elements[i].removeAttribute("@for-document");

            if (data instanceof Array){

                data.forEach(function (value: any) {

                    //从数组中取出一条信息，然后开始渲染
                    extractForMap(elements[i].parentNode, elements[i], value);

                    i++;
                })

                //将模板节点删除
                elements[i].parentNode.removeChild(elements[i]);

                //重新回到原来的索引值
                i--;
            }else {

                console.log("Instruction @list need an array datatype to extract!");
            }
        }

        //渲染信息
        if (elements[i].hasAttribute("@for-message")){

            let data_index = elements[i].getAttribute("@for-message");

            elements[i].removeAttribute("@for-message");

            // @ts-ignore
            elements[i].innerText = data[data_index];
        }

        resolver_array_multi(elements[i].children, index, data);
    }
}