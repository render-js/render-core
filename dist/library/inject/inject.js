import { getCodeSpaceForProps, getCodeSpaceForQuery, getCodeSpaceForRef, } from "../../core/utility/injectUtility";
import { resolveProps } from "../../core/resolver/props";
import { resolve_Queries } from "../../core/resolver/query";
import { resolver_Refs } from "../../core/cmd/v-ref";
export function inject(controller, tagTemplate) {
    //注入props
    getCodeSpaceForProps(controller.raw_data, resolveProps(Reflect.get(window, "context").crtTag, controller.proto.getProps()));
    //注入query
    getCodeSpaceForQuery(controller.raw_data, resolve_Queries());
    //注入ref
    var refs = new Map();
    resolver_Refs(tagTemplate.children, refs);
    getCodeSpaceForRef(controller.raw_data, refs);
}
