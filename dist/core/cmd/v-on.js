export function resolver_event(elements, methods, data) {
    //遍历所有的元素节点
    for (var i = 0; i < elements.length; i++) {
        //获取元素节点所有属性
        var attributes = elements[i].getAttributeNames();
        //解析元素的所有属性
        for (var j = 0; j < attributes.length; j++) {
            //检查属性名称以及匹配绑定方法
            var result = attributes[j].match(/^v-on:([a-z]+)$/g);
            //如何属性匹配
            if (result !== null) {
                for (var k = 0; k < result.length; k++) {
                    var action = result[k].substring(5);
                    var method = elements[i].getAttribute(result[k]);
                    elements[i].removeAttribute(result[k]);
                    elements[i].addEventListener(action, methods[method].bind(data));
                }
            }
        }
        //获取该组件的
        var subElements = elements[i].children;
        //深度解析属性
        resolver_event(subElements, methods, data);
    }
}
