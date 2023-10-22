import {resolver_array_single} from "../cmd/loop/v-index";
import {resolver_map_single} from "../cmd/loop/v-key";

/**
 * 该函数用于处理数组类型数据的展开
 * @param baseRoot
 * @param temp
 * @param index
 * @param data
 */
export function part_render_array(baseRoot:ParentNode, temp:Node, index:number, data:any):void{

    // @ts-ignore
    let clone:Element = temp.cloneNode(true);

    // @ts-ignore
    resolver_array_single(clone,index,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);

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

    // @ts-ignore
    resolver_map_single(clone,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);
}