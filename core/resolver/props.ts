/**
 * This function is used to resolve tag customed properties.
 * @param node
 * @param properties
 */
export function resolveProps(node:Element, properties:{} | []):any{

    if (properties instanceof Array){
        return getAllPropsByArray(node,properties);
    }

    if (properties instanceof Object){
        return getAllPropsByObject(node,properties);
    }
}

/**
 *
 * @param node
 * @param array
 *
 */
export function getAllPropsByArray(node:Element, array:Array<string>):Map<string, string>{

    let props:Map<string, string> = new Map<string,string>();

    array.forEach(function (value:string):void{

        if (node.getAttribute(value)){

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
export function getAllPropsByObject(node:Element, object:{}):Map<string, any>{

    let props:Map<string, any> = new Map<string,any>();

    for (let objectKey in object) {

        if (node.getAttribute(objectKey)){

            switch (object[objectKey]){

                case "int":props.set(objectKey,parseInt(node.getAttribute(objectKey)));break;

                case "float":props.set(objectKey,parseFloat(node.getAttribute(objectKey)));break;

                case "boole":props.set(objectKey,parseFloat(node.getAttribute(objectKey)));break;

                case "string":props.set(objectKey,node.getAttribute(objectKey));break;

                case "json":props.set(objectKey,JSON.parse(node.getAttribute(objectKey)));break;

                default :props.set(objectKey,node.getAttribute(objectKey));break;
            }
        }
    }
    return props;
}