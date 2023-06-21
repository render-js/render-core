export function resolveProps(node:Element, keys:string[]):any{

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