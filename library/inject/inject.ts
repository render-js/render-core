import {
    getCodeSpaceForProps,
    getCodeSpaceForQuery,
    getCodeSpaceForRef,
} from "../../core/utility/injectUtility";
import {resolveProps} from "../../core/resolver/props";
import {resolve_Queries} from "../../core/resolver/query";
import {resolver_Refs} from "../../core/cmd/v-ref";
import {Controller} from "../../class/controller";

export function inject(controller:Controller,tagTemplate:Element):void{
    //注入props
    getCodeSpaceForProps(controller.raw_data,resolveProps(Reflect.get(window,"context").crtTag,controller.proto.getProps()));
    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolve_Queries());
    //注入ref
    let refs = new Map<string,Element>();
    resolver_Refs(tagTemplate.children, refs);
    getCodeSpaceForRef(controller.raw_data,refs);
}