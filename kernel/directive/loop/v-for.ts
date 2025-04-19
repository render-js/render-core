import {resolver_array_single} from "./v-for-utility";

/**
 * 展开数据
 * @param elements
 * @param data
 */
export function parse_directive_for_of(elements:HTMLCollection,data:{}):void
{

    for (let i:number = 0; i < elements.length; i++){

        let result:boolean = elements[i].hasAttribute("@for");

        if (result){

            let dataName:string = elements[i].getAttribute("@for")

            elements[i].removeAttribute("@for")

            if (data[dataName] instanceof Array){

                data[dataName].forEach(function (value: any, index: number) {

                    //从数组中取出一条信息，然后开始渲染
                    extractForArray(elements[i].parentNode, elements[i], index, value);

                    i++;
                })

                //将模板节点删除
                elements[i].parentNode.removeChild(elements[i]);

                //重新回到原来的索引值
                i--;
            }else {

                console.log("Instruction @list need an array datatype to extract!");
            }
        }

        if (elements[i]){
            parse_directive_for_of(elements[i].children,data);
        }
    }
}

/**
 *
 * @param baseRoot
 * @param temp
 * @param index
 * @param data
 */
export function extractForArray(baseRoot:ParentNode, temp:Node, index:number, data:any):void
{
    //将渲染出来的数据模板插入到根元素下
    part_render_array(baseRoot,temp,index,data);
}

/**
 * 该函数用于处理数组类型数据的展开
 * @param baseRoot
 * @param temp
 * @param index
 * @param data
 */
export function part_render_array(baseRoot:ParentNode, temp:Node, index:number, data:any):void
{

    // @ts-ignore
    let clone:Element = temp.cloneNode(true);

    // @ts-ignore
    resolver_array_single(clone,index,data);

    //插入模板节点
    baseRoot.insertBefore(clone,temp);
}