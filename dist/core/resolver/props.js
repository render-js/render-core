export function resolveProps(node, properties) {
    if (properties instanceof Array) {
        return getAllPropsByArray(node, properties);
    }
    if (properties instanceof Object) {
        return getAllPropsByObject(node, properties);
    }
}
export function getAllPropsByArray(node, array) {
    var props = new Map();
    array.forEach(function (value) {
        if (node.getAttribute(value)) {
            props.set(value, node.getAttribute(value));
        }
    });
    return props;
}
export function getAllPropsByObject(node, object) {
    var props = new Map();
    for (var objectKey in object) {
        if (node.getAttribute(objectKey)) {
            switch (node.getAttribute(objectKey)) {
                case "int":
                    props.set(objectKey, parseInt(node.getAttribute(objectKey)));
                    break;
                case "float":
                    props.set(objectKey, parseFloat(node.getAttribute(objectKey)));
                    break;
                case "object":
                    props.set(objectKey, JSON.parse(node.getAttribute(objectKey)));
                    break;
                case "array":
                    props.set(objectKey, JSON.parse(node.getAttribute(objectKey)));
                    break;
                default:
                    props.set(objectKey, node.getAttribute(objectKey));
                    break;
            }
        }
    }
    return props;
}
