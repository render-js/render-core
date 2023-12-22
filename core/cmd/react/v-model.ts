import {compositionend, compositionstart, listener} from "../../utility/modelUtility";

/**
 * 绑定数据模型
 * @param nodes
 * @param data
 */
export function resolver_model(nodes:HTMLCollection, data:{}):void{

    for (let i:number=0;i<nodes.length;i++){

        if (nodes[i].hasAttribute("@model")){

            let dataName:string = nodes[i].getAttribute("@model")

            nodes[i].removeAttribute("@model")

            let tagName:string = nodes[i].tagName

            nodes[i].setAttribute("name",dataName)

            if (tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA"){

                nodes[i].addEventListener("compositionstart",compositionstart)
                nodes[i].addEventListener("input",listener.bind(data))
                nodes[i].addEventListener("compositionend",compositionend.bind(data))
            }
        }

        resolver_model(nodes[i].children,data)
    }
}