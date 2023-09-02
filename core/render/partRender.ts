import {resolver_array_single} from "../cmd/v-index";
import {resolver_map_single} from "../cmd/v-key";


export function part_render_array(baseRoot:ParentNode, temp:Node, index:number, data:any):void{

    // @ts-ignore
    let clone:Element = temp.cloneNode(true);

    // @ts-ignore
    resolver_array_single(clone,index,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);

}

export function part_render_map(baseRoot:ParentNode, temp:Node, key:string, data:any):void{

    // @ts-ignore
    let clone:Element = temp.cloneNode(true);

    // @ts-ignore
    resolver_map_single(clone,key,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);
}