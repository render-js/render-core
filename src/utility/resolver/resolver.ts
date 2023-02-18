import {Router} from "../../class/router";

export function resolveRoute(router:Router,routeName:string) {

    if (router.resolveRender(routeName) !== null){

        return router.resolveRender(routeName);
    }
    return "404"
}

export function resolveProps(node:Element,keys:string[]):any{

    let attrs = node.attributes;

    let props = {};

    for (let key of keys) {

        props[key] = attrs.getNamedItem(key).value;
    }

    return props;
}

export function resolvePropsByObject(list:NamedNodeMap,keys:string[]):any{

    let props = {};

    for (let key of keys) {

        props[key] = list.getNamedItem(key).value;
    }

    return props;
}