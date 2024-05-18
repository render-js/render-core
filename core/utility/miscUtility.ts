/**
 * 给组件元素添加cpn标签
 * @param nodes
 * @param component
 */
export function addLabel(nodes:HTMLCollection,component:string):void
{
    for (let i:number=0;i<nodes.length;i++){

        nodes[i].setAttribute("cpn",component);

        let kk:HTMLCollection = nodes[i].children

        addLabel(kk,component)
    }
}







