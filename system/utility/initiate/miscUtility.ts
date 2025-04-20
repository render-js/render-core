/**
 * This func used to add tag label to the content of the user tag
 * @param nodes
 * @param component
 */
export function add_label_to_element(nodes:HTMLCollection,component:string):void
{
    for (let i:number=0;i<nodes.length;i++){
        nodes[i].setAttribute("cpn",component);
        let kk:HTMLCollection = nodes[i].children
        add_label_to_element(kk,component)
    }
}







