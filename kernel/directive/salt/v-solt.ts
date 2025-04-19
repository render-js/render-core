import {ContextController} from "../../../system/define/ContextController";

/**
 * 此函数用于解析自定义元素salt
 * @param tagTemplate
 * @param controller
 */
export function parse_directive_salt_collect(tagTemplate:ChildNode, controller:ContextController):void
{

    if (tagTemplate.hasChildNodes())
    {
        // @ts-ignore
        let list:NodeListOf<Element> = tagTemplate.querySelectorAll("salt");

        if (list.length !== 0)
        {

            list.forEach(function (value)
            {
                if (value.hasAttribute("name"))
                    controller.salt.set(value.getAttribute("name"),value.innerHTML);
                else
                    controller.salt.set("default",value.innerHTML);
            })
        }
        else
        {
            // @ts-ignore
            controller.salt.set("default",tagTemplate.innerHTML);
        }
    }
}

/**
 * 此函数用于展开salt
 * @param elements
 * @param controller
 */
export function parse_directive_salt_extract(elements:HTMLCollection, controller:ContextController):void
{

    for (let i:number = 0; i < elements.length;i++){

        let result:boolean = elements[i].hasAttribute("@salt");

        if (result){

            let dataName:string = elements[i].getAttribute("@salt");

            elements[i].removeAttribute("@salt");

            if (!dataName){

                elements[i].innerHTML = controller.salt.get("default");
            }else {
                // @ts-ignore
                elements[i].innerHTML = controller.solt.get(dataName);
            }
        }

        //深度解析
        parse_directive_salt_extract(elements[i].children,controller);
    }
}