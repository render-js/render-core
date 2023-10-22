import {part_render_array, part_render_map} from "../render/partRender";

/**
 *
 * @param baseRoot
 * @param temp
 * @param index
 * @param data
 */
export function extractForArray(baseRoot:ParentNode, temp:Node, index:number, data:any):void{
    part_render_array(baseRoot,temp,index,data);
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