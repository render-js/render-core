import {getProxyForInject} from "../proxy/getProxy";

export function resolveProps(node:Element, properties:{} | []):any{

    if (properties instanceof Array){

    }

    if (properties instanceof Object){

    }
    let attrs:NamedNodeMap = node.attributes;

    let props:Map<string, string> = new Map<string, string>();

    // for (let key  in Object.getOwnPropertyNames(properties)) {
    //
    //     props[key] = attrs.getNamedItem(key).value;
    // }

    return getProxyForInject(props);
}