import {renderComponent} from "./librender.js";

export function findComponent(nodes: HTMLCollection, components: any[], page: any){
    for(let i=0;i<nodes.length;i++){
        for (let j=0;j<components.length;j++) {
            if (nodes[i].nodeName === components[j].toUpperCase()){
                renderComponent(page.components[components[j]],nodes[i].parentNode,nodes[i])
            }
        }
        findComponent(nodes[i].children, components, page)
    }
}
