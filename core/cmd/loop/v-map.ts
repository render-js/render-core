import {resolver_map_single} from "./v-map-utility";

/**
 * 展开数据
 * @param elements
 * @param data
 */
export function resolver_for_map(elements:HTMLCollection,data:{}):void{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@map")

        if (result){

            let dataName:string = elements[i].getAttribute("@map")

            elements[i].removeAttribute("@map")

            if (data[dataName] instanceof Object){

                extractForMap(elements[i].parentNode, elements[i], data[dataName]);

                i++;

            }else {
                console.log("Instruction @document need an object datatype to extract!");
            }

            //将模板节点删除
            elements[i].parentNode.removeChild(elements[i]);

            i--;
        }

        if (elements[i]){
            resolver_for_map(elements[i].children,data);
        }
    }
}

/**
 *
 * @param baseRoot
 * @param temp
 * @param data
 */
export function extractForMap(baseRoot:ParentNode, temp:Node, data:any):void{
    part_render_map(baseRoot,temp,data);
}

/**
 * 该函数用于处理字典数据类型的展开
 * @param baseRoot
 * @param temp
 * @param data
 */
export function part_render_map(baseRoot:ParentNode, temp:Node, data:any):void{

    // @ts-ignore
    let clone:Element = temp.cloneNode(true);

    resolver_map_single(clone,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);
}