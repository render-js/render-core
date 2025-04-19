import {PropertyType} from "../../index";

/**
 * This function is used to resolve tag properties.
 * @param tag
 * @param properties
 */
export function resolve_props(tag:ChildNode, properties:{} | []):Map<string, string>
{
    if (properties instanceof Array)
        return getAllPropsByArray(tag, properties);
    if (properties instanceof Object)
        return getAllPropsByObject(tag, properties);
}

/**
 *
 * @param node
 * @param array
 */
export function getAllPropsByArray(node:ChildNode, array:Array<string>):Map<string, string>
{

    let props:Map<string, string> = new Map<string,string>();

    array.forEach(function (value:string):void{

        // @ts-ignore
        if (node.getAttribute(value)){

            // @ts-ignore
            props.set(value,node.getAttribute(value));
        }
    })

    return props;
}

/**
 *
 * @param node
 * @param object
 */
export function getAllPropsByObject(node:ChildNode, object:{}):Map<string, any>
{

    let props:Map<string, any> = new Map<string,any>();

    for (let objectKey in object) {

        // @ts-ignore
        if (node.getAttribute(objectKey)){

            if (object[objectKey] === PropertyType.INT) {// @ts-ignore
                props.set(objectKey, parseInt(node.getAttribute(objectKey)));
            } else if (object[objectKey] === PropertyType.FLOAT) {// @ts-ignore
                props.set(objectKey, parseFloat(node.getAttribute(objectKey)));
            } else if (object[objectKey] === PropertyType.BOOLEAN) {
                // @ts-ignore
                props.set(objectKey, parseFloat(node.getAttribute(objectKey)));
            } else if (object[objectKey] === PropertyType.STRING) {
                // @ts-ignore
                props.set(objectKey, node.getAttribute(objectKey));
            } else if (object[objectKey] === PropertyType.JSON) {
                // @ts-ignore
                props.set(objectKey, JSON.parse(node.getAttribute(objectKey)));
            } else {
                // @ts-ignore
                props.set(objectKey, node.getAttribute(objectKey));
            }
        }
    }
    return props;
}