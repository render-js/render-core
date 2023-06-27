export function resolveProps(node:Element, properties:{}):any{

    let attrs:NamedNodeMap = node.attributes;

    let props:{} = {};

    for (let key in Object.getOwnPropertyNames(properties)) {

        props[key] = attrs.getNamedItem(key).value;
    }

    return props;
}

export function resolveQueries():any
{
    let query:{} = {};
    let parameters:string = location.search.replace("?","")
    let listPara:string[] = parameters.split("&")
    listPara.forEach(function (value:string):void{
        let results:string[] = value.split("=")
        Reflect.set(query,results[0],results[1]);
    })
    return query;
}