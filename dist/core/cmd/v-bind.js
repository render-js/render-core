import { isUnKnown } from "../utility/checkUtility";
export function resolver_bind(nodes, data) {
    for (var i = 0; i < nodes.length; i++) {
        //对系统元素进行属性绑定
        if (isUnKnown(nodes[i].nodeName)) {
            var attributes = nodes[i].getAttributeNames();
            for (var j = 0; j < attributes.length; j++) {
                var result = attributes[j].match(/^v-bind:([a-z]+)$/g);
                if (result === null) {
                }
                else {
                    for (var k = 0; k < result.length; k++) {
                        var property = result[k].substring(7);
                        var dataName = nodes[i].getAttribute(result[k]);
                        nodes[i].removeAttribute(result[k]);
                        try {
                            nodes[i].setAttribute(property, JSON.stringify(data[dataName]));
                        }
                        catch (e) {
                            nodes[i].setAttribute(property, data[dataName]);
                        }
                    }
                }
            }
            var subElements = nodes[i].children;
            resolver_bind(subElements, data);
        }
    }
}
