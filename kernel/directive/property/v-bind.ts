import {isUnKnown} from "../../../system/utility/checkUtility";

/**
 *
 * @param nodes
 * @param data
 */
export function parse_directive_bind(nodes:HTMLCollection,data:{}):void
{

    for (let i:number=0;i<nodes.length;i++){

        //对系统元素进行属性绑定
        if (!isUnKnown(nodes[i].nodeName)){

            let attributes:string[] = nodes[i].getAttributeNames()

            for (let j:number=0;j<attributes.length;j++){

                let result:RegExpMatchArray = attributes[j].match(/^@bind:([a-z]+)$/g)

                if (result === null){

                }else {

                    for (let k:number=0;k<result.length;k++){

                        let property:string = result[k].substring(6)

                        let dataName:string = nodes[i].getAttribute(result[k])

                        nodes[i].removeAttribute(result[k])

                        try {
                            nodes[i].setAttribute(property,data[dataName]);
                        }catch (e) {
                            console.error(e.message);
                        }
                    }
                }
            }

            parse_directive_bind(nodes[i].children,data);
        }
    }
}