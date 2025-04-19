/**
 *
 * @param elements
 * @param data
 */
export function parse_directive_switch(elements:HTMLCollection, data:{}):void
{

    //在当前级别下寻找到v-if
    for (let i:number = 0; i < elements.length; i++){

        //获取元素节点所有属性
        let attributes:string[] = elements[i].getAttributeNames()

        //解析元素的所有属性
        for (let j:number = 0; j < attributes.length; j++){

            //检查属性名称以及匹配绑定方法
            let result:RegExpMatchArray = attributes[j].match(/^@switch:([a-z]+)$/g)

            //如何属性匹配
            if (result !== null){

                //属性
                let property:string = result[0].substring(9)

                //值
                let value:string = elements[i].getAttribute(result[0])

                //删除属性
                elements[i].removeAttribute(result[0])

                if (data[property] === value){
                    break;
                }else {
                    // @ts-ignore
                    elements[i].style.display = "none";
                    break;
                }
            }
        }

        parse_directive_switch(elements[i].children,data);
    }
}