import {ComponentController} from "../../../class/controller/componentController";

/**
 *
 * @param node
 * @param data
 * @param controller
 */
export function resolver_experssion(node:ParentNode, data:{}, controller:ComponentController):void{

    if (node.hasChildNodes()){

        for (let j:number=0; j< node.childNodes.length; j++){

            if (node.childNodes[j].nodeType === 3){

                let result:RegExpMatchArray = node.childNodes[j].nodeValue.match(/\{\{([a-zA-Z]+)}}/g);

                if (result){

                    let property:string = result[0].replace(/\{/g,"").replace(/}/g,"");

                    try {

                        node.childNodes[j].nodeValue = data[property];
                    }catch (e){

                        node.childNodes[j].nodeValue = controller.computed[property]();
                    }
                }
            }else if(node.childNodes[j].nodeType === 1){

                // @ts-ignore
                resolver_experssion(node.childNodes[j],data,controller);
            }
        }
    }
}