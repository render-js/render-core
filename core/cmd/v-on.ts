export function resolver_event(elements:HTMLCollection,methods:{},data:{}):void
{
    //遍历所有的元素节点
    for (let i:number = 0; i < elements.length; i++){

        //获取元素节点所有属性
        let attributes:string[] = elements[i].getAttributeNames()

        //解析元素的所有属性
        for (let j:number = 0; j < attributes.length; j++){

            //检查属性名称以及匹配绑定方法
            let result:RegExpMatchArray = attributes[j].match(/^v-on:([a-z]+)$/g)

            //如何属性匹配
            if (result !== null){

                for (let k:number = 0; k < result.length; k++){

                    let action:string = result[k].substring(5)

                    let method:string = elements[i].getAttribute(result[k])

                    elements[i].removeAttribute(result[k])

                    elements[i].addEventListener(action,methods[method].bind(data))
                }
            }
        }

        //获取该组件的
        let subElements:HTMLCollection = elements[i].children

        //深度解析属性
        resolver_event(subElements,methods,data)
    }
}