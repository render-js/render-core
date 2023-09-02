import {part_render_array, part_render_map} from "../render/partRender";

export function extractForArray(baseRoot:ParentNode, temp:Node, index:number, data:any):void{
    part_render_array(baseRoot,temp,index,data);
}

export function extractForMap(baseRoot:ParentNode, temp:Node, key:string, data:any):void{
    part_render_map(baseRoot,temp,key,data);
}